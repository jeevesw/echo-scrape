import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import type { Block } from '@/components/blog/BlockRenderer';
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertTriangle,
  XCircle, ExternalLink,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Conversion utilities                                               */
/* ------------------------------------------------------------------ */

const decode = (str: string) => {
  const d = new DOMParser().parseFromString(str, 'text/html');
  return d.documentElement.textContent || str;
};

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const cleanInnerHTML = (el: Element): string => {
  const clone = el.cloneNode(true) as Element;
  clone.querySelectorAll('*').forEach(child => {
    child.removeAttribute('class');
    child.removeAttribute('style');
    Array.from(child.attributes)
      .filter(a => a.name.startsWith('data-'))
      .forEach(a => child.removeAttribute(a.name));
  });
  return clone.innerHTML.trim();
};

const getTopLevelNodes = (root: Element): Node[] => {
  const nodes: Node[] = [];
  root.childNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      if (el.tagName === 'DIV') {
        nodes.push(...getTopLevelNodes(el));
      } else {
        nodes.push(node);
      }
    }
  });
  return nodes;
};

const htmlToBlocks = (html: string): Block[] => {
  if (!html?.trim()) return [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const blocks: Block[] = [];
  const nodes = getTopLevelNodes(doc.body);

  let i = 0;
  while (i < nodes.length) {
    const node = nodes[i] as Element;
    if (node.nodeType !== Node.ELEMENT_NODE) { i++; continue; }

    const tag = node.tagName?.toLowerCase();
    const text = node.textContent?.trim() || '';
    const id = crypto.randomUUID();

    if (tag === 'h2' || tag === 'h3') {
      const level = tag === 'h2' ? 2 : 3;
      blocks.push({ id, type: 'heading', level, content: decode(text), anchor: slugify(text) });
    } else if (tag === 'img') {
      const src = node.getAttribute('src') || '';
      const alt = node.getAttribute('alt') || '';
      if (src) blocks.push({ id, type: 'image', src, alt, caption: '' });
    } else if (tag === 'blockquote') {
      blocks.push({ id, type: 'quote', content: decode(text), attribution: '' });
    } else if (tag === 'ul') {
      const items = Array.from(node.querySelectorAll('li'))
        .map(li => decode(li.textContent?.trim() || ''))
        .filter(Boolean);
      if (items.length) blocks.push({ id, type: 'list', style: 'bullet', items });
    } else if (tag === 'ol') {
      const items = Array.from(node.querySelectorAll('li'))
        .map(li => decode(li.textContent?.trim() || ''))
        .filter(Boolean);
      if (items.length) blocks.push({ id, type: 'list', style: 'numbered', items });
    } else if (tag === 'hr') {
      blocks.push({ id, type: 'divider' });
    } else if (tag === 'p') {
      const pNodes: Element[] = [];
      while (i < nodes.length && (nodes[i] as Element).tagName?.toLowerCase() === 'p') {
        pNodes.push(nodes[i] as Element);
        i++;
      }
      const combined = pNodes.map(p => `<p>${cleanInnerHTML(p)}</p>`).join('\n');
      if (combined.trim()) blocks.push({ id, type: 'text', content: combined });
      continue;
    } else if (tag === 'h1') {
      blocks.push({ id, type: 'heading', level: 2, content: decode(text), anchor: slugify(text) });
    } else if (text) {
      blocks.push({ id, type: 'text', content: `<p>${cleanInnerHTML(node)}</p>` });
    }
    i++;
  }

  return blocks.filter(b => {
    if (b.type === 'text') return b.content.replace(/<[^>]*>/g, '').trim().length > 0;
    return true;
  });
};

const excerptToClean = (excerpt: string): string => {
  if (!excerpt?.trim()) return '';
  const doc = new DOMParser().parseFromString(excerpt, 'text/html');
  return doc.body.textContent?.trim() || '';
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PostRow {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  blocks: unknown;
}

interface PreviewRow {
  post: PostRow;
  generatedBlocks: Block[];
  cleanExcerpt: string;
  excerptChanged: boolean;
  breakdown: string;
}

interface LogEntry {
  title: string;
  blockCount: number;
  success: boolean;
  error?: string;
}

type Stage = 'idle' | 'preview' | 'migrating' | 'done';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BlogMigrate() {
  const [stage, setStage] = useState<Stage>('idle');
  const [needsMigration, setNeedsMigration] = useState(0);
  const [alreadyMigrated, setAlreadyMigrated] = useState(0);
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch counts on mount
  useEffect(() => {
    (async () => {
      const { count: needsCount } = await supabase
        .from('blog_posts')
        .select('id', { count: 'exact', head: true })
        .or('blocks.is.null,blocks.eq.[]');
      const { count: doneCount } = await supabase
        .from('blog_posts')
        .select('id', { count: 'exact', head: true })
        .not('blocks', 'is', null);
      setNeedsMigration(needsCount ?? 0);
      setAlreadyMigrated(doneCount ?? 0);
    })();
  }, []);

  const handlePreview = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, content, excerpt, blocks')
      .or('blocks.is.null,blocks.eq.[]')
      .order('published_at', { ascending: false });

    if (!data) { setLoading(false); return; }

    const rows: PreviewRow[] = data.map(post => {
      const generatedBlocks = htmlToBlocks(post.content);
      const cleanExcerpt = excerptToClean(post.excerpt);
      const excerptChanged = cleanExcerpt !== post.excerpt;

      const counts: Record<string, number> = {};
      generatedBlocks.forEach(b => { counts[b.type] = (counts[b.type] || 0) + 1; });
      const breakdown = Object.entries(counts).map(([t, c]) => `${c}× ${t}`).join(', ');

      return { post: post as PostRow, generatedBlocks, cleanExcerpt, excerptChanged, breakdown };
    });

    setPreviewRows(rows);
    setStage('preview');
    setLoading(false);
  }, []);

  const handleMigrate = useCallback(async () => {
    setStage('migrating');
    setProgress(0);
    setLogs([]);

    for (let idx = 0; idx < previewRows.length; idx++) {
      const row = previewRows[idx];
      try {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            blocks: row.generatedBlocks as any,
            excerpt: row.cleanExcerpt || row.post.excerpt,
          })
          .eq('id', row.post.id);

        if (error) throw error;
        setLogs(prev => [...prev, { title: row.post.title, blockCount: row.generatedBlocks.length, success: true }]);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setLogs(prev => [...prev, { title: row.post.title, blockCount: 0, success: false, error: message }]);
      }
      setProgress(Math.round(((idx + 1) / previewRows.length) * 100));
      await new Promise(r => setTimeout(r, 150));
    }

    setStage('done');
  }, [previewRows]);

  const totalBlocksPreview = previewRows.reduce((s, r) => s + r.generatedBlocks.length, 0);
  const successCount = logs.filter(l => l.success).length;
  const errorCount = logs.filter(l => !l.success).length;
  const totalBlocksDone = logs.reduce((s, l) => s + l.blockCount, 0);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        {/* ── IDLE ── */}
        {stage === 'idle' && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h1 className="heading-display text-3xl mb-2">Blog Migration Tool</h1>
              <p className="text-muted-foreground mb-6">
                Converts all legacy Squarespace HTML posts into the new block format.
                Safe to preview before committing.
              </p>

              <div className="bg-accent/50 border border-accent rounded-xl p-4 mb-6 text-sm text-accent-foreground flex gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  This will convert the <strong>content</strong> HTML field into a <strong>blocks</strong> JSON
                  array for all posts where blocks is currently null. The original content field is preserved
                  and will continue to work as a fallback. We strongly recommend taking a backup before running.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-border rounded-xl p-6 text-center">
                  <span className="heading-display text-4xl text-primary block">{needsMigration}</span>
                  <span className="text-sm text-muted-foreground mt-1 block">Posts need migration</span>
                </div>
                <div className="border border-border rounded-xl p-6 text-center">
                  <span className="heading-display text-4xl text-primary block">{alreadyMigrated}</span>
                  <span className="text-sm text-muted-foreground mt-1 block">Already migrated</span>
                </div>
              </div>

              <Button onClick={handlePreview} disabled={loading || needsMigration === 0} className="w-full">
                {loading ? 'Loading…' : 'Preview Migration'} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── PREVIEW ── */}
        {stage === 'preview' && (
          <>
            <p className="text-muted-foreground text-sm mb-4">
              {previewRows.length} posts will be migrated, generating approximately {totalBlocksPreview} blocks.
            </p>

            <div className="border border-border rounded-xl overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post title</TableHead>
                    <TableHead>Blocks</TableHead>
                    <TableHead>Excerpt cleaned</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewRows.map(row => (
                    <TableRow key={row.post.id}>
                      <TableCell className="font-medium max-w-[240px] truncate">{row.post.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {row.generatedBlocks.length} — {row.breakdown}
                      </TableCell>
                      <TableCell>{row.excerptChanged ? 'Yes' : 'No'}</TableCell>
                      <TableCell><Badge variant="secondary">Ready</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStage('idle')}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Run Migration</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm migration</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will write blocks data to {previewRows.length} posts. Continue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleMigrate}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}

        {/* ── MIGRATING ── */}
        {stage === 'migrating' && (
          <>
            <h2 className="heading-display text-2xl mb-4">Migrating…</h2>
            <div className="flex items-center gap-4 mb-6">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm font-medium text-muted-foreground w-12 text-right">{progress}%</span>
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1">
                  {log.success
                    ? <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    : <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
                  <span className="truncate">{log.title}</span>
                  {log.success
                    ? <span className="text-muted-foreground ml-auto flex-shrink-0">— {log.blockCount} blocks</span>
                    : <span className="text-destructive ml-auto flex-shrink-0">— {log.error}</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── DONE ── */}
        {stage === 'done' && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="heading-display text-3xl mb-2">Migration Complete</h2>
              <p className="text-muted-foreground mb-6">
                {successCount} posts migrated · {totalBlocksDone} blocks created
                {errorCount > 0 && ` · ${errorCount} errors`}
              </p>
              <div className="flex justify-center gap-3">
                <Button asChild>
                  <Link to="/admin/blog">View Blog Posts <ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/blog" target="_blank" rel="noopener noreferrer">
                    View Site Blog <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
