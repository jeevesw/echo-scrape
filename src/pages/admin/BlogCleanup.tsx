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
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import type { Block, TextBlock, HeadingBlock, ImageBlock } from '@/components/blog/BlockRenderer';
import {
  ArrowRight, CheckCircle, AlertTriangle,
  XCircle, Wrench, ChevronDown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Analysis helpers                                                    */
/* ------------------------------------------------------------------ */

const LEAKED_JSON_PATTERNS = [
  /\[\s*\{\s*"type"\s*:\s*"highlight"/,
  /underlineCurve/,
  /TextAttributes/,
];

const NEWSLETTER_MARKERS = [
  /newsletter-form/i,
  /squarespace-form-submit/i,
  /<button[^>]*type="submit"[^>]*value="Subscribe"/i,
  /direct to your inbox/i,
  /Subscribe<\/h2>/i,
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

function hasNewsletterForm(blocks: Block[]): boolean {
  for (const b of blocks) {
    if (b.type !== 'text') continue;
    const html = (b as TextBlock).content;
    if (NEWSLETTER_MARKERS.some(rx => rx.test(html))) return true;
  }
  return false;
}

interface NewsletterDiff {
  blockId: string;
  before: string;
  after: string | null; // null means block removed entirely
}

function previewNewsletterStrip(blocks: Block[]): NewsletterDiff[] {
  const diffs: NewsletterDiff[] = [];
  for (const b of blocks) {
    if (b.type !== 'text') continue;
    const html = (b as TextBlock).content;
    if (!NEWSLETTER_MARKERS.some(rx => rx.test(html))) continue;
    const cleaned = stripNewsletterHtml(html);
    if (cleaned !== html) {
      diffs.push({ blockId: b.id, before: html, after: cleaned });
    }
  }
  return diffs;
}

function stripNewsletterHtml(html: string): string | null {
  // Strategy: use regex to find newsletter form regions and strip them.
  // Pattern 1: Full Squarespace form blocks (newsletter-form, squarespace-form-submit)
  let result = html;

  // Remove complete newsletter form divs — greedy match from newsletter-form opening to its closing
  // We use a multi-pass approach since forms can be nested in various ways
  
  // First, handle the concatenated case: strip from "direct to your inbox" or "Subscribe</h2>" 
  // through the form content. We look for the heading that introduces the newsletter,
  // then strip everything from there through the form's closing tags.
  
  // Pattern: heading containing "direct to your inbox" or ending with "Subscribe</h2>"
  // followed by form content including newsletter-form / squarespace-form-submit / Subscribe button
  const newsletterStartPatterns = [
    // Matches from a heading containing "direct to your inbox" or "Subscribe" through form content
    /(?:<h[1-6][^>]*>[^<]*(?:direct to your inbox|Subscribe)[^<]*<\/h[1-6]>)[\s\S]*?(?:<button[^>]*value="Subscribe"[^>]*>[\s\S]*?<\/button>[\s\S]*?<\/div>|<\/form>[\s\S]*?<\/div>)/gi,
    // Matches newsletter-form class containers
    /<div[^>]*class="[^"]*newsletter-form[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi,
    // Matches squarespace form blocks
    /<div[^>]*class="[^"]*squarespace-form[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi,
  ];

  for (const pattern of newsletterStartPatterns) {
    result = result.replace(pattern, '');
  }

  // Fallback: if markers still present, do a more aggressive line-by-line strip
  if (NEWSLETTER_MARKERS.some(rx => rx.test(result))) {
    // Parse as DOM and remove offending elements
    const doc = new DOMParser().parseFromString(result, 'text/html');
    
    // Remove any element containing newsletter markers
    const allElements = doc.body.querySelectorAll('*');
    const toRemove = new Set<Element>();
    
    allElements.forEach(el => {
      const outerHtml = el.outerHTML;
      if (NEWSLETTER_MARKERS.some(rx => rx.test(outerHtml))) {
        // Walk up to find the highest ancestor that is entirely newsletter content
        let candidate = el;
        while (candidate.parentElement && candidate.parentElement !== doc.body) {
          const siblingText = Array.from(candidate.parentElement.childNodes)
            .filter(n => n !== candidate)
            .map(n => n.textContent || '')
            .join('')
            .trim();
          // If siblings have substantial content, stop here
          if (siblingText.length > 20) break;
          candidate = candidate.parentElement;
        }
        toRemove.add(candidate);
      }
    });

    toRemove.forEach(el => el.remove());
    result = doc.body.innerHTML.trim();
  }

  // Clean up empty tags and whitespace
  result = result.replace(/(<(p|div|span)>\s*<\/\2>)+/g, '').trim();

  if (!result || !result.replace(/<[^>]*>/g, '').trim()) return null;
  return result;
}

function fixNewsletterForms(blocks: Block[]): Block[] {
  return blocks.map(b => {
    if (b.type !== 'text') return b;
    const html = (b as TextBlock).content;
    if (!NEWSLETTER_MARKERS.some(rx => rx.test(html))) return b;
    const cleaned = stripNewsletterHtml(html);
    if (cleaned === null) return null;
    return { ...b, content: cleaned } as TextBlock;
  }).filter(Boolean) as Block[];
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
  hasNewsletter: boolean;
  newsletterDiffs: NewsletterDiff[];
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
  const [fixNewsletter, setFixNewsletter] = useState(true);

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
        hasNewsletter: hasNewsletterForm(blocks),
        newsletterDiffs: previewNewsletterStrip(blocks),
      };

      if (row.leakedJsonCount || row.hasLongIntro || row.internalLinkCount || row.sqImageCount || row.emptyAltCount || row.hasNewsletter) {
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

        // Fix 6 — Newsletter forms
        if (fixNewsletter && row.hasNewsletter) {
          blocks = fixNewsletterForms(blocks);
          details.push('Stripped newsletter form');
        }

        // Determine if we need to update
        const needsUpdate = (fixLeaked && row.leakedJsonCount > 0) ||
          (fixIntro && row.hasLongIntro) ||
          (fixLinks && row.internalLinkCount > 0) ||
          (fixImages && row.sqImageCount > 0) ||
          (fixNewsletter && row.hasNewsletter);

        if (needsUpdate) {
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({ blocks: blocks as any })
            .eq('id', row.post.id);
          if (updateError) throw updateError;
        }

        // Fix 5 — Flag empty alt (just reporting)
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
  }, [previewRows, fixLeaked, fixIntro, fixLinks, fixImages, fixAlt, fixNewsletter]);

  const successCount = logs.filter(l => l.success).length;
  const errorCount = logs.filter(l => !l.success).length;

  const emptyAltReview = previewRows.flatMap(row =>
    row.post.blocks
      .filter((b): b is ImageBlock => b.type === 'image' && !(b as ImageBlock).alt?.trim())
      .map(img => ({ postTitle: row.post.title, postId: row.post.id, src: img.src }))
  );

  const totalIssues = previewRows.reduce(
    (s, r) => s + r.leakedJsonCount + (r.hasLongIntro ? 1 : 0) + r.internalLinkCount + r.sqImageCount + r.emptyAltCount + (r.hasNewsletter ? 1 : 0),
    0
  );

  const newsletterRows = previewRows.filter(r => r.hasNewsletter && r.newsletterDiffs.length > 0);

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
                <ToggleRow checked={fixNewsletter} onChange={setFixNewsletter} label="Strip leaked newsletter forms" desc="Remove Squarespace newsletter form HTML that leaked into text blocks." />
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
              <MiniToggle checked={fixNewsletter} onChange={setFixNewsletter} label="Newsletter forms" />
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
                    <TableHead className="text-center">Newsletter</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewRows.map(row => (
                    <TableRow key={row.post.id}>
                      <TableCell className="font-medium max-w-[220px] truncate">{row.post.title}</TableCell>
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
                      <TableCell className="text-center">
                        {row.hasNewsletter
                          ? <Badge variant={fixNewsletter ? 'destructive' : 'secondary'}>Yes</Badge>
                          : <span className="text-muted-foreground">—</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Newsletter before/after preview */}
            {fixNewsletter && newsletterRows.length > 0 && (
              <div className="mb-6">
                <h3 className="heading-display text-lg mb-3">Newsletter form removal preview ({newsletterRows.length} posts)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Expand each post to see the before/after for affected text blocks.
                </p>
                <div className="space-y-2">
                  {newsletterRows.map(row => (
                    <Collapsible key={row.post.id}>
                      <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors text-sm font-medium">
                        <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform [[data-state=open]_&]:rotate-180" />
                        <span className="truncate">{row.post.title}</span>
                        <Badge variant="secondary" className="ml-auto flex-shrink-0">{row.newsletterDiffs.length} block{row.newsletterDiffs.length !== 1 ? 's' : ''}</Badge>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-3 pl-6">
                          {row.newsletterDiffs.map((diff, i) => (
                            <div key={i} className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs font-semibold text-destructive mb-1">Before</p>
                                <pre className="text-[10px] leading-tight bg-destructive/5 border border-destructive/20 rounded-lg p-3 overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                                  {truncateHtml(diff.before, 800)}
                                </pre>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-primary mb-1">After</p>
                                <pre className="text-[10px] leading-tight bg-primary/5 border border-primary/20 rounded-lg p-3 overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                                  {diff.after ? truncateHtml(diff.after, 800) : <em className="text-muted-foreground">Block removed (empty)</em>}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
            )}
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
/*  Small sub-components & helpers                                      */
/* ------------------------------------------------------------------ */

function truncateHtml(html: string, maxLen: number): string {
  if (html.length <= maxLen) return html;
  return html.slice(0, maxLen) + '…';
}

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
