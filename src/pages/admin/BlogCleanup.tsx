import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
import type { Block, TextBlock, HeadingBlock, ImageBlock } from '@/components/blog/BlockRenderer';
import {
  ArrowRight, CheckCircle, AlertTriangle,
  XCircle, Wrench,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Analysis helpers                                                    */
/* ------------------------------------------------------------------ */

const LEAKED_JSON_PATTERNS = [
  /\[\s*\{\s*"type"\s*:\s*"highlight"/,
  /underlineCurve/,
  /TextAttributes/,
];

function countLeakedJsonParagraphs(blocks: Block[]): number {
  let count = 0;
  for (const b of blocks) {
    if (b.type !== 'text') continue;
    const doc = new DOMParser().parseFromString((b as TextBlock).content, 'text/html');
    doc.querySelectorAll('p').forEach(p => {
      const txt = p.textContent || '';
      if (LEAKED_JSON_PATTERNS.some(rx => rx.test(txt))) count++;
    });
  }
  return count;
}

function hasLongIntroHeading(blocks: Block[]): boolean {
  if (!blocks.length) return false;
  const first = blocks[0];
  return first.type === 'heading' && (first as HeadingBlock).content.length > 80;
}

function countInternalLinks(blocks: Block[]): number {
  let count = 0;
  for (const b of blocks) {
    if (b.type !== 'text') continue;
    const html = (b as TextBlock).content;
    const matches = html.match(/href="https?:\/\/(www\.)?trapezemedia\.co\.uk\//g);
    if (matches) count += matches.length;
  }
  return count;
}

function countSquarespaceImages(blocks: Block[]): number {
  let count = 0;
  for (const b of blocks) {
    if (b.type === 'image' && (b as ImageBlock).src.includes('squarespace-cdn.com')) count++;
  }
  return count;
}

function countEmptyAltImages(blocks: Block[]): number {
  let count = 0;
  for (const b of blocks) {
    if (b.type === 'image' && !(b as ImageBlock).alt?.trim()) count++;
  }
  return count;
}

/* ------------------------------------------------------------------ */
/*  Fix functions (return mutated blocks)                               */
/* ------------------------------------------------------------------ */

function fixLeakedJson(blocks: Block[]): Block[] {
  return blocks.map(b => {
    if (b.type !== 'text') return b;
    const doc = new DOMParser().parseFromString((b as TextBlock).content, 'text/html');
    doc.querySelectorAll('p').forEach(p => {
      const txt = p.textContent || '';
      if (LEAKED_JSON_PATTERNS.some(rx => rx.test(txt))) p.remove();
    });
    const cleaned = doc.body.innerHTML.trim();
    if (!cleaned || !cleaned.replace(/<[^>]*>/g, '').trim()) return null;
    return { ...b, content: cleaned } as TextBlock;
  }).filter(Boolean) as Block[];
}

function fixLongIntroHeading(blocks: Block[]): Block[] {
  if (!blocks.length) return blocks;
  const first = blocks[0];
  if (first.type === 'heading' && (first as HeadingBlock).content.length > 80) {
    const newBlock: TextBlock = {
      id: first.id,
      type: 'text',
      content: `<p>${(first as HeadingBlock).content}</p>`,
    };
    return [newBlock, ...blocks.slice(1)];
  }
  return blocks;
}

function fixInternalLinks(blocks: Block[]): Block[] {
  return blocks.map(b => {
    if (b.type !== 'text') return b;
    let html = (b as TextBlock).content;
    html = html.replace(/href="https?:\/\/(www\.)?trapezemedia\.co\.uk\//g, 'href="/');
    return { ...b, content: html } as TextBlock;
  });
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PostData {
  id: string;
  title: string;
  slug: string;
  blocks: Block[];
}

interface PreviewRow {
  post: PostData;
  leakedJsonCount: number;
  hasLongIntro: boolean;
  internalLinkCount: number;
  sqImageCount: number;
  emptyAltCount: number;
}

interface LogEntry {
  title: string;
  success: boolean;
  detail: string;
  error?: string;
}

type Stage = 'idle' | 'preview' | 'running' | 'done';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BlogCleanup() {
  const [stage, setStage] = useState<Stage>('idle');
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Toggle states for each fix
  const [fixLeaked, setFixLeaked] = useState(true);
  const [fixIntro, setFixIntro] = useState(true);
  const [fixLinks, setFixLinks] = useState(true);
  const [fixImages, setFixImages] = useState(true);
  const [fixAlt, setFixAlt] = useState(true);

  const handlePreview = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, blocks')
      .not('blocks', 'is', null)
      .order('published_at', { ascending: false });

    if (error || !data) {
      toast.error('Failed to load posts: ' + (error?.message || 'Unknown'));
      setLoading(false);
      return;
    }

    const rows: PreviewRow[] = [];
    for (const post of data) {
      let blocks: Block[];
      try {
        blocks = (typeof post.blocks === 'string' ? JSON.parse(post.blocks) : post.blocks) as Block[];
        if (!Array.isArray(blocks)) continue;
      } catch { continue; }

      const row: PreviewRow = {
        post: { id: post.id, title: post.title, slug: post.slug, blocks },
        leakedJsonCount: countLeakedJsonParagraphs(blocks),
        hasLongIntro: hasLongIntroHeading(blocks),
        internalLinkCount: countInternalLinks(blocks),
        sqImageCount: countSquarespaceImages(blocks),
        emptyAltCount: countEmptyAltImages(blocks),
      };

      // Only include if at least one issue found
      if (row.leakedJsonCount || row.hasLongIntro || row.internalLinkCount || row.sqImageCount || row.emptyAltCount) {
        rows.push(row);
      }
    }

    setPreviewRows(rows);
    setStage('preview');
    setLoading(false);
  }, []);

  const handleRun = useCallback(async () => {
    setStage('running');
    setProgress(0);
    setLogs([]);

    for (let idx = 0; idx < previewRows.length; idx++) {
      const row = previewRows[idx];
      const details: string[] = [];

      try {
        let blocks = [...row.post.blocks];

        // Fix 1 — Leaked JSON
        if (fixLeaked && row.leakedJsonCount > 0) {
          blocks = fixLeakedJson(blocks);
          details.push(`Stripped ${row.leakedJsonCount} leaked JSON`);
        }

        // Fix 2 — Long intro heading
        if (fixIntro && row.hasLongIntro) {
          blocks = fixLongIntroHeading(blocks);
          details.push('Converted intro heading to text');
        }

        // Fix 3 — Internal links
        if (fixLinks && row.internalLinkCount > 0) {
          blocks = fixInternalLinks(blocks);
          details.push(`Fixed ${row.internalLinkCount} internal links`);
        }

        // Fix 4 — Image CDN migration
        if (fixImages && row.sqImageCount > 0) {
          let migratedCount = 0;
          for (let i = 0; i < blocks.length; i++) {
            const b = blocks[i];
            if (b.type !== 'image') continue;
            const img = b as ImageBlock;
            if (!img.src.includes('squarespace-cdn.com')) continue;

            try {
              const { data: fnData, error: fnError } = await supabase.functions.invoke(
                'migrate-image',
                {
                  body: { imageUrl: img.src, postSlug: row.post.slug },
                }
              );

              if (fnError) throw new Error(fnError.message);
              if (fnData?.publicUrl) {
                blocks[i] = { ...img, src: fnData.publicUrl };
                migratedCount++;
              }
            } catch (imgErr: any) {
              details.push(`⚠ Image failed: ${imgErr.message}`);
            }
          }
          if (migratedCount > 0) details.push(`Migrated ${migratedCount} images`);
        }

        // Determine if we need to update
        const needsUpdate = (fixLeaked && row.leakedJsonCount > 0) ||
          (fixIntro && row.hasLongIntro) ||
          (fixLinks && row.internalLinkCount > 0) ||
          (fixImages && row.sqImageCount > 0);

        if (needsUpdate) {
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({ blocks: blocks as any })
            .eq('id', row.post.id);
          if (updateError) throw updateError;
        }

        // Fix 5 — Flag empty alt (just reporting, no DB change needed beyond what's in blocks)
        if (fixAlt && row.emptyAltCount > 0) {
          details.push(`${row.emptyAltCount} images need alt text`);
        }

        if (!details.length) details.push('No changes needed');

        setLogs(prev => [...prev, { title: row.post.title, success: true, detail: details.join(' · ') }]);
      } catch (err: any) {
        setLogs(prev => [...prev, {
          title: row.post.title,
          success: false,
          detail: details.join(' · '),
          error: err.message,
        }]);
      }

      setProgress(Math.round(((idx + 1) / previewRows.length) * 100));
      await new Promise(r => setTimeout(r, 100));
    }

    setStage('done');
  }, [previewRows, fixLeaked, fixIntro, fixLinks, fixImages, fixAlt]);

  const successCount = logs.filter(l => l.success).length;
  const errorCount = logs.filter(l => !l.success).length;

  // Gather all empty-alt images across preview for the review table
  const emptyAltReview = previewRows.flatMap(row =>
    row.post.blocks
      .filter((b): b is ImageBlock => b.type === 'image' && !(b as ImageBlock).alt?.trim())
      .map(img => ({ postTitle: row.post.title, postId: row.post.id, src: img.src }))
  );

  const totalIssues = previewRows.reduce(
    (s, r) => s + r.leakedJsonCount + (r.hasLongIntro ? 1 : 0) + r.internalLinkCount + r.sqImageCount + r.emptyAltCount,
    0
  );

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        {/* ── IDLE ── */}
        {stage === 'idle' && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h1 className="heading-display text-3xl mb-2">Blog Cleanup Tool</h1>
              <p className="text-muted-foreground mb-6">
                Scans all migrated blog posts for common Squarespace artefacts and fixes them in bulk.
              </p>

              <div className="bg-accent/50 border border-accent rounded-xl p-4 mb-6 text-sm text-accent-foreground flex gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  This tool modifies <strong>blocks</strong> data directly. The original <strong>content</strong> HTML
                  field is preserved. We recommend exporting a backup first.
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <h2 className="text-sm font-semibold text-foreground">Fixes to apply:</h2>
                <ToggleRow checked={fixLeaked} onChange={setFixLeaked} label="Strip leaked TextAttributes JSON" desc="Remove Squarespace animation JSON blobs that leaked through as paragraph content." />
                <ToggleRow checked={fixIntro} onChange={setFixIntro} label="Convert long intro headings to text" desc="First-block headings over 80 characters become text paragraphs." />
                <ToggleRow checked={fixLinks} onChange={setFixLinks} label="Convert absolute internal links to relative" desc="Replace trapezemedia.co.uk absolute URLs with relative paths." />
                <ToggleRow checked={fixImages} onChange={setFixImages} label="Migrate Squarespace CDN images" desc="Download images from squarespace-cdn.com and re-host in your storage." />
                <ToggleRow checked={fixAlt} onChange={setFixAlt} label="Flag images missing alt text" desc="Surface image blocks with empty alt text for human review." />
              </div>

              <Button onClick={handlePreview} disabled={loading} className="w-full">
                {loading ? 'Scanning…' : 'Scan Posts'} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── PREVIEW ── */}
        {stage === 'preview' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">
                {previewRows.length} posts with issues found · {totalIssues} total issues
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStage('idle')}>Back</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={previewRows.length === 0}>
                      <Wrench className="h-4 w-4 mr-2" /> Run Cleanup
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm cleanup</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will apply the selected fixes to {previewRows.length} posts. Continue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRun}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Fix toggles inline */}
            <div className="flex flex-wrap gap-3 mb-4">
              <MiniToggle checked={fixLeaked} onChange={setFixLeaked} label="Leaked JSON" />
              <MiniToggle checked={fixIntro} onChange={setFixIntro} label="Long intros" />
              <MiniToggle checked={fixLinks} onChange={setFixLinks} label="Internal links" />
              <MiniToggle checked={fixImages} onChange={setFixImages} label="CDN images" />
              <MiniToggle checked={fixAlt} onChange={setFixAlt} label="Empty alt" />
            </div>

            <div className="border border-border rounded-xl overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post title</TableHead>
                    <TableHead className="text-center">Leaked JSON</TableHead>
                    <TableHead className="text-center">Long intro</TableHead>
                    <TableHead className="text-center">Internal links</TableHead>
                    <TableHead className="text-center">CDN images</TableHead>
                    <TableHead className="text-center">Empty alt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewRows.map(row => (
                    <TableRow key={row.post.id}>
                      <TableCell className="font-medium max-w-[240px] truncate">{row.post.title}</TableCell>
                      <TableCell className="text-center">
                        <CountBadge count={row.leakedJsonCount} enabled={fixLeaked} />
                      </TableCell>
                      <TableCell className="text-center">
                        {row.hasLongIntro
                          ? <Badge variant={fixIntro ? 'destructive' : 'secondary'}>Yes</Badge>
                          : <span className="text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell className="text-center">
                        <CountBadge count={row.internalLinkCount} enabled={fixLinks} />
                      </TableCell>
                      <TableCell className="text-center">
                        <CountBadge count={row.sqImageCount} enabled={fixImages} />
                      </TableCell>
                      <TableCell className="text-center">
                        <CountBadge count={row.emptyAltCount} enabled={fixAlt} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {/* ── RUNNING ── */}
        {stage === 'running' && (
          <>
            <h2 className="heading-display text-2xl mb-4">Running cleanup…</h2>
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
                  <span className="truncate font-medium">{log.title}</span>
                  <span className="text-muted-foreground ml-auto flex-shrink-0 text-xs max-w-[50%] truncate">
                    {log.success ? log.detail : log.error}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── DONE ── */}
        {stage === 'done' && (
          <>
            <Card className="max-w-2xl mx-auto mb-8">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="heading-display text-3xl mb-2">Cleanup Complete</h2>
                <p className="text-muted-foreground mb-6">
                  {successCount} posts processed{errorCount > 0 && ` · ${errorCount} errors`}
                </p>
                <Button variant="outline" onClick={() => { setStage('idle'); setLogs([]); setPreviewRows([]); }}>
                  Run Again
                </Button>
              </CardContent>
            </Card>

            {/* Alt text review table */}
            {fixAlt && emptyAltReview.length > 0 && (
              <>
                <h3 className="heading-display text-xl mb-3">Images needing alt text ({emptyAltReview.length})</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These image blocks have empty alt text. Edit each post to add descriptive alt text.
                </p>
                <div className="border border-border rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Post</TableHead>
                        <TableHead>Image URL</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emptyAltReview.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium max-w-[200px] truncate">{item.postTitle}</TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-[300px] truncate">{item.src}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/admin/blog/edit/${item.postId}`}>Edit post</a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  Small sub-components                                                */
/* ------------------------------------------------------------------ */

function ToggleRow({ checked, onChange, label, desc }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; desc: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
      <Switch checked={checked} onCheckedChange={onChange} className="mt-0.5" />
      <div>
        <Label className="font-medium text-foreground">{label}</Label>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function MiniToggle({ checked, onChange, label }: {
  checked: boolean; onChange: (v: boolean) => void; label: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        checked
          ? 'bg-primary/10 border-primary/30 text-primary'
          : 'bg-muted border-border text-muted-foreground'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${checked ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
      {label}
    </button>
  );
}

function CountBadge({ count, enabled }: { count: number; enabled: boolean }) {
  if (count === 0) return <span className="text-muted-foreground">—</span>;
  return <Badge variant={enabled ? 'destructive' : 'secondary'}>{count}</Badge>;
}
