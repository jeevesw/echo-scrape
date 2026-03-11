import { useState, useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import UnderlineExtension from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  AlignLeft, Heading2, Image as ImageIcon, Quote, List, Minus,
  Youtube, HelpCircle, BookOpen, GripVertical, ChevronUp, ChevronDown,
  Copy, Trash2, Plus, Bold, Italic, Underline, Strikethrough,
  Link2, Unlink, ListOrdered, RemoveFormatting, Upload, RefreshCw, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Block, BlockType, TextBlock, HeadingBlock, ImageBlock, QuoteBlock, ListBlock, DividerBlock, EmbedBlock, FAQBlock, TOCBlock, FAQItem } from '../BlockRenderer';

interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

const generateId = () => crypto.randomUUID();
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const BLOCK_TYPES: { type: BlockType; icon: React.ElementType; label: string; desc: string }[] = [
  { type: 'text', icon: AlignLeft, label: 'Text', desc: 'Paragraph with rich formatting' },
  { type: 'heading', icon: Heading2, label: 'Heading', desc: 'H2 or H3 section title' },
  { type: 'image', icon: ImageIcon, label: 'Image', desc: 'Photo with optional caption' },
  { type: 'quote', icon: Quote, label: 'Quote', desc: 'Pull quote or blockquote' },
  { type: 'list', icon: List, label: 'List', desc: 'Bullet or numbered list' },
  { type: 'divider', icon: Minus, label: 'Divider', desc: 'Horizontal rule' },
  { type: 'embed', icon: Youtube, label: 'Embed', desc: 'YouTube or video embed' },
  { type: 'faq', icon: HelpCircle, label: 'FAQ', desc: 'FAQ accordion + schema' },
  { type: 'toc', icon: BookOpen, label: 'TOC', desc: 'Auto table of contents' },
];

function createEmptyBlock(type: BlockType): Block {
  const id = generateId();
  switch (type) {
    case 'text': return { id, type: 'text', content: '' };
    case 'heading': return { id, type: 'heading', level: 2, content: '', anchor: '' };
    case 'image': return { id, type: 'image', src: '', alt: '', caption: '' };
    case 'quote': return { id, type: 'quote', content: '', attribution: '' };
    case 'list': return { id, type: 'list', style: 'bullet', items: [''] };
    case 'divider': return { id, type: 'divider' };
    case 'embed': return { id, type: 'embed', url: '', caption: '' };
    case 'faq': return { id, type: 'faq', items: [{ question: '', answer: '' }] };
    case 'toc': return { id, type: 'toc', auto: true, label: 'In this article' };
  }
}

// ── Tiptap Rich Text Editor ──────────────────────────────────────────
function RichTextEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      LinkExtension.configure({ openOnClick: false }),
      UnderlineExtension,
      Placeholder.configure({ placeholder: 'Start writing…' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const ToolBtn = ({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title: string }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded hover:bg-muted transition-colors ${active ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex items-center gap-0.5 flex-wrap border border-border rounded-t-lg p-1.5 bg-muted/30">
        <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><Bold className="h-4 w-4" /></ToolBtn>
        <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><Italic className="h-4 w-4" /></ToolBtn>
        <ToolBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><Underline className="h-4 w-4" /></ToolBtn>
        <ToolBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><Strikethrough className="h-4 w-4" /></ToolBtn>
        <div className="w-px h-5 bg-border mx-1" />
        <ToolBtn active={editor.isActive('link')} onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }} title="Link"><Link2 className="h-4 w-4" /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().unsetLink().run()} title="Unlink"><Unlink className="h-4 w-4" /></ToolBtn>
        <div className="w-px h-5 bg-border mx-1" />
        <ToolBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list"><List className="h-4 w-4" /></ToolBtn>
        <ToolBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered list"><ListOrdered className="h-4 w-4" /></ToolBtn>
        <div className="w-px h-5 bg-border mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting"><RemoveFormatting className="h-4 w-4" /></ToolBtn>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[120px] p-3 rounded-b-lg border border-t-0 border-border focus-within:border-primary transition-colors prose prose-sm max-w-none"
      />
    </div>
  );
}

// ── Individual Block Editors ─────────────────────────────────────────

function HeadingEditor({ block, onUpdate }: { block: HeadingBlock; onUpdate: (u: Partial<HeadingBlock>) => void }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onUpdate({ level: block.level === 2 ? 3 : 2 })}
          className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors shrink-0"
        >
          H{block.level}
        </button>
        <input
          value={block.content}
          onChange={(e) => onUpdate({ content: e.target.value, anchor: slugify(e.target.value) })}
          placeholder="Section heading…"
          className="heading-display text-2xl w-full bg-transparent border-b border-border focus:border-primary outline-none pb-2"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">#{block.anchor || '…'}</p>
    </div>
  );
}

function ImageEditor({ block, onUpdate }: { block: ImageBlock; onUpdate: (u: Partial<ImageBlock>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Not an image'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5MB'); return; }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const filename = `blog/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
      const { error } = await supabase.storage.from('images').upload(filename, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filename);
      onUpdate({ src: publicUrl });
      toast.success('Uploaded');
    } catch (e: unknown) {
      toast.error('Upload failed: ' + (e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  if (!block.src) {
    return (
      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
        {uploading ? (
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
        ) : (
          <>
            <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-4">Click to upload or paste an image URL</p>
            <div className="flex gap-2 justify-center">
              <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" /> Upload
              </Button>
            </div>
            <div className="flex gap-2 mt-3 max-w-sm mx-auto">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://…"
                className="text-sm"
              />
              <Button type="button" variant="outline" size="sm" onClick={() => { if (urlInput) { onUpdate({ src: urlInput }); setUrlInput(''); } }}>
                Add
              </Button>
            </div>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
      </div>
    );
  }

  return (
    <div>
      <img src={block.src} alt={block.alt} className="w-full rounded-xl mb-3" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Alt text</Label>
          <Input value={block.alt} onChange={(e) => onUpdate({ alt: e.target.value })} placeholder="Describe the image" className="text-sm" />
        </div>
        <div>
          <Label className="text-xs">Caption</Label>
          <Input value={block.caption ?? ''} onChange={(e) => onUpdate({ caption: e.target.value })} placeholder="Optional caption" className="text-sm" />
        </div>
      </div>
      <button type="button" onClick={() => onUpdate({ src: '' })} className="text-xs text-primary hover:underline mt-2">Replace image</button>
    </div>
  );
}

function QuoteEditor({ block, onUpdate }: { block: QuoteBlock; onUpdate: (u: Partial<QuoteBlock>) => void }) {
  return (
    <div>
      <textarea
        value={block.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        placeholder="Quote text…"
        className="w-full text-xl italic border-l-4 border-primary pl-4 bg-transparent resize-none outline-none min-h-[80px]"
      />
      <input
        value={block.attribution ?? ''}
        onChange={(e) => onUpdate({ attribution: e.target.value })}
        placeholder="Attribution (optional)"
        className="w-full text-sm text-muted-foreground bg-transparent outline-none mt-2"
      />
    </div>
  );
}

function ListEditor({ block, onUpdate }: { block: ListBlock; onUpdate: (u: Partial<ListBlock>) => void }) {
  const handleItemChange = (index: number, value: string) => {
    const items = [...block.items];
    items[index] = value;
    onUpdate({ items });
  };
  const addItem = () => onUpdate({ items: [...block.items, ''] });
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const items = [...block.items];
      items.splice(index + 1, 0, '');
      onUpdate({ items });
    }
    if (e.key === 'Backspace' && block.items[index] === '' && block.items.length > 1) {
      e.preventDefault();
      onUpdate({ items: block.items.filter((_, i) => i !== index) });
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {(['bullet', 'numbered'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onUpdate({ style: s })}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${block.style === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            {s === 'bullet' ? 'Bullet' : 'Numbered'}
          </button>
        ))}
      </div>
      <div className="space-y-1">
        {block.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm w-5 text-right shrink-0">
              {block.style === 'bullet' ? '•' : `${i + 1}.`}
            </span>
            <input
              value={item}
              onChange={(e) => handleItemChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="flex-1 bg-transparent outline-none border-b border-transparent focus:border-border py-1 text-sm"
              placeholder="List item…"
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} className="text-xs text-muted-foreground hover:text-primary mt-2 flex items-center gap-1">
        <Plus className="h-3 w-3" /> Add item
      </button>
    </div>
  );
}

function EmbedEditor({ block, onUpdate }: { block: EmbedBlock; onUpdate: (u: Partial<EmbedBlock>) => void }) {
  const getEmbedUrl = (url: string) => {
    const m = url.match(/youtube\.com\/watch\?v=([^&]+)/);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
    const m2 = url.match(/youtu\.be\/([^?]+)/);
    if (m2) return `https://www.youtube.com/embed/${m2[1]}`;
    return url;
  };
  const isYouTube = /youtube\.com|youtu\.be/.test(block.url);

  return (
    <div>
      <Label className="text-xs">Video URL (YouTube)</Label>
      <Input
        value={block.url}
        onChange={(e) => onUpdate({ url: e.target.value })}
        placeholder="https://youtube.com/watch?v=..."
        className="text-sm mb-3"
      />
      {isYouTube && block.url && (
        <div className="aspect-video rounded-xl overflow-hidden mb-3">
          <iframe src={getEmbedUrl(block.url)} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Preview" />
        </div>
      )}
      <Input
        value={block.caption ?? ''}
        onChange={(e) => onUpdate({ caption: e.target.value })}
        placeholder="Caption (optional)"
        className="text-sm"
      />
    </div>
  );
}

function FAQEditor({ block, onUpdate }: { block: FAQBlock; onUpdate: (u: Partial<FAQBlock>) => void }) {
  const updateItem = (index: number, updates: Partial<FAQItem>) => {
    const items = block.items.map((item, i) => i === index ? { ...item, ...updates } : item);
    onUpdate({ items });
  };
  const addItem = () => onUpdate({ items: [...block.items, { question: '', answer: '' }] });
  const removeItem = (index: number) => {
    if (block.items.length <= 1) return;
    onUpdate({ items: block.items.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-3">FAQ Block — outputs FAQPage schema</p>
      <div className="space-y-3">
        {block.items.map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-3 relative group/faq">
            <input
              value={item.question}
              onChange={(e) => updateItem(i, { question: e.target.value })}
              placeholder="Question…"
              className="w-full font-medium bg-transparent outline-none border-b border-border pb-2 mb-2 text-sm"
            />
            <textarea
              value={item.answer}
              onChange={(e) => updateItem(i, { answer: e.target.value })}
              placeholder="Answer…"
              className="w-full text-sm text-muted-foreground bg-transparent outline-none resize-none min-h-[60px]"
            />
            {block.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="absolute top-2 right-2 opacity-0 group-hover/faq:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} className="text-xs text-muted-foreground hover:text-primary mt-3 flex items-center gap-1">
        <Plus className="h-3 w-3" /> Add Question
      </button>
    </div>
  );
}

function TOCEditor({ block, onUpdate, allBlocks }: { block: TOCBlock; onUpdate: (u: Partial<TOCBlock>) => void; allBlocks: Block[] }) {
  const headings = allBlocks.filter((b): b is HeadingBlock => b.type === 'heading');

  return (
    <div>
      <nav className="bg-muted/50 rounded-xl p-4">
        <input
          value={block.label ?? 'In this article'}
          onChange={(e) => onUpdate({ label: e.target.value })}
          className="font-semibold text-foreground bg-transparent outline-none w-full mb-3"
        />
        {headings.length === 0 ? (
          <p className="text-xs text-muted-foreground">No headings yet. Add H2/H3 blocks to populate this.</p>
        ) : (
          <ul className="space-y-1.5">
            {headings.map((h) => (
              <li key={h.id} className={`text-sm text-muted-foreground ${h.level === 3 ? 'ml-4' : ''}`}>
                {h.content || '(untitled)'}
              </li>
            ))}
          </ul>
        )}
      </nav>
      <p className="text-xs text-muted-foreground mt-3">This block auto-generates from your H2/H3 headings. Place it near the top of your post.</p>
    </div>
  );
}

// ── Block Wrapper ────────────────────────────────────────────────────
function BlockWrapper({
  block, index, total, focused, onFocus, onUpdate, onDelete, onMove, onDuplicate, onInsert, allBlocks
}: {
  block: Block; index: number; total: number; focused: boolean;
  onFocus: () => void; onUpdate: (u: Partial<Block>) => void;
  onDelete: () => void; onMove: (dir: 'up' | 'down') => void;
  onDuplicate: () => void; onInsert: (type: BlockType) => void;
  allBlocks: Block[];
}) {
  const [showInsert, setShowInsert] = useState(false);
  const typeInfo = BLOCK_TYPES.find(t => t.type === block.type);

  return (
    <div>
      <div
        onClick={onFocus}
        className={`relative border rounded-xl transition-all group/block ${
          focused ? 'border-primary/40 shadow-sm' : 'border-transparent hover:border-border/40'
        }`}
      >
        {/* Left action bar */}
        <div className="absolute -left-10 top-2 flex flex-col gap-0.5 opacity-0 group-hover/block:opacity-100 transition-opacity">
          <button type="button" className="p-1 text-muted-foreground hover:text-foreground" title="Drag"><GripVertical className="h-3.5 w-3.5" /></button>
          {index > 0 && <button type="button" onClick={(e) => { e.stopPropagation(); onMove('up'); }} className="p-1 text-muted-foreground hover:text-foreground" title="Move up"><ChevronUp className="h-3.5 w-3.5" /></button>}
          {index < total - 1 && <button type="button" onClick={(e) => { e.stopPropagation(); onMove('down'); }} className="p-1 text-muted-foreground hover:text-foreground" title="Move down"><ChevronDown className="h-3.5 w-3.5" /></button>}
          <button type="button" onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-1 text-muted-foreground hover:text-foreground" title="Duplicate"><Copy className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 text-muted-foreground hover:text-destructive" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
        </div>

        {/* Block type badge */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          {typeInfo && <typeInfo.icon className="h-3.5 w-3.5 text-muted-foreground" />}
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{typeInfo?.label}</span>
        </div>

        {/* Block content */}
        <div className="px-4 pb-4">
          {block.type === 'text' && <RichTextEditor content={(block as TextBlock).content} onChange={(html) => onUpdate({ content: html })} />}
          {block.type === 'heading' && <HeadingEditor block={block as HeadingBlock} onUpdate={onUpdate as (u: Partial<HeadingBlock>) => void} />}
          {block.type === 'image' && <ImageEditor block={block as ImageBlock} onUpdate={onUpdate as (u: Partial<ImageBlock>) => void} />}
          {block.type === 'quote' && <QuoteEditor block={block as QuoteBlock} onUpdate={onUpdate as (u: Partial<QuoteBlock>) => void} />}
          {block.type === 'list' && <ListEditor block={block as ListBlock} onUpdate={onUpdate as (u: Partial<ListBlock>) => void} />}
          {block.type === 'divider' && <div><hr className="border-border my-2" /><p className="text-xs text-muted-foreground text-center">Divider</p></div>}
          {block.type === 'embed' && <EmbedEditor block={block as EmbedBlock} onUpdate={onUpdate as (u: Partial<EmbedBlock>) => void} />}
          {block.type === 'faq' && <FAQEditor block={block as FAQBlock} onUpdate={onUpdate as (u: Partial<FAQBlock>) => void} />}
          {block.type === 'toc' && <TOCEditor block={block as TOCBlock} onUpdate={onUpdate as (u: Partial<TOCBlock>) => void} allBlocks={allBlocks} />}
        </div>
      </div>

      {/* Insert between blocks */}
      <div className="relative h-6 group/insert flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShowInsert(!showInsert)}
          className="opacity-0 group-hover/insert:opacity-100 transition-opacity bg-primary text-primary-foreground rounded-full p-0.5"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        {showInsert && (
          <div className="absolute top-6 z-20 bg-background border border-border rounded-xl shadow-lg p-2 grid grid-cols-3 gap-1 w-[280px]">
            {BLOCK_TYPES.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => { onInsert(type); setShowInsert(false); }}
                className="flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-lg hover:bg-muted transition-colors text-left"
              >
                <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main BlockEditor ─────────────────────────────────────────────────
export default function BlockEditor({ blocks: initialBlocks, onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  // Sync from parent when initialBlocks changes (e.g. async post load)
  useEffect(() => {
    if (initialBlocks.length > 0 && blocks.length === 0) {
      setBlocks(initialBlocks);
    }
  }, [initialBlocks]);

  useEffect(() => {
    onChange(blocks);
  }, [blocks, onChange]);

  const addBlock = useCallback((type: BlockType, afterId?: string) => {
    const newBlock = createEmptyBlock(type);
    setBlocks(prev => {
      if (!afterId) return [...prev, newBlock];
      const idx = prev.findIndex(b => b.id === afterId);
      const next = [...prev];
      next.splice(idx + 1, 0, newBlock);
      return next;
    });
    setFocusedBlockId(newBlock.id);
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(b => {
      if (b.id !== id) return b;
      const merged = { ...b, ...updates } as Block;
      if (merged.type === 'heading' && 'content' in updates) {
        (merged as HeadingBlock).anchor = slugify((updates as Partial<HeadingBlock>).content ?? (b as HeadingBlock).content);
      }
      return merged;
    }));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      const next = prev.filter(b => b.id !== id);
      if (next.length > 0) {
        setFocusedBlockId(next[Math.max(0, idx - 1)].id);
      }
      return next;
    });
  }, []);

  const moveBlock = useCallback((id: string, direction: 'up' | 'down') => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === prev.length - 1)) return prev;
      const next = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  }, []);

  const duplicateBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      const copy = { ...prev[idx], id: generateId() } as Block;
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      setFocusedBlockId(copy.id);
      return next;
    });
  }, []);

  return (
    <div className="min-h-[600px] flex flex-col lg:flex-row gap-6">
      {/* Block list */}
      <div className="flex-1 min-w-0 pl-10">
        {blocks.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">
            <p className="mb-4">No blocks yet. Add one from the panel →</p>
            <Button type="button" variant="outline" onClick={() => addBlock('text')}>
              <Plus className="h-4 w-4 mr-2" /> Add Text Block
            </Button>
          </div>
        )}
        {blocks.map((block, i) => (
          <BlockWrapper
            key={block.id}
            block={block}
            index={i}
            total={blocks.length}
            focused={focusedBlockId === block.id}
            onFocus={() => setFocusedBlockId(block.id)}
            onUpdate={(u) => updateBlock(block.id, u)}
            onDelete={() => deleteBlock(block.id)}
            onMove={(dir) => moveBlock(block.id, dir)}
            onDuplicate={() => duplicateBlock(block.id)}
            onInsert={(type) => addBlock(type, block.id)}
            allBlocks={blocks}
          />
        ))}
      </div>

      {/* Block Library — sidebar on desktop, bottom bar on mobile */}
      <div className="lg:w-[240px] shrink-0">
        <div className="lg:sticky lg:top-4">
          <h3 className="heading-display text-sm uppercase tracking-widest mb-4 hidden lg:block">Add a Block</h3>
          {/* Desktop grid */}
          <div className="hidden lg:grid grid-cols-2 gap-2">
            {BLOCK_TYPES.map(({ type, icon: Icon, label, desc }) => (
              <button
                key={type}
                type="button"
                onClick={() => addBlock(type)}
                className="border border-border rounded-xl p-3 text-left hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                <Icon className="h-4 w-4 text-muted-foreground mb-1" />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{desc}</p>
              </button>
            ))}
          </div>
          {/* Mobile horizontal scroll */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-2">
            {BLOCK_TYPES.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => addBlock(type)}
                className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm whitespace-nowrap hover:border-primary hover:bg-primary/5 transition-all shrink-0"
              >
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
