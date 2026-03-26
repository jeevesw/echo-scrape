import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

export type BlockType =
  | 'text' | 'heading' | 'image' | 'quote'
  | 'list' | 'divider' | 'embed' | 'faq' | 'toc' | 'newsletter';

export interface TextBlock      { id: string; type: 'text'; content: string; }
export interface HeadingBlock   { id: string; type: 'heading'; level: 2 | 3; content: string; anchor: string; }
export interface ImageBlock     { id: string; type: 'image'; src: string; alt: string; caption?: string; }
export interface QuoteBlock     { id: string; type: 'quote'; content: string; attribution?: string; }
export interface ListBlock      { id: string; type: 'list'; style: 'bullet' | 'numbered'; items: string[]; }
export interface DividerBlock   { id: string; type: 'divider'; }
export interface EmbedBlock     { id: string; type: 'embed'; url: string; caption?: string; }
export interface FAQItem        { question: string; answer: string; }
export interface FAQBlock       { id: string; type: 'faq'; items: FAQItem[]; }
export interface TOCBlock       { id: string; type: 'toc'; auto: boolean; label?: string; }
export interface NewsletterBlock { id: string; type: 'newsletter'; heading?: string; subheading?: string; }

export type Block =
  | TextBlock | HeadingBlock | ImageBlock | QuoteBlock
  | ListBlock | DividerBlock | EmbedBlock | FAQBlock | TOCBlock | NewsletterBlock;

interface BlockRendererProps {
  blocks: Block[];
  fallbackHtml?: string;
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return url;
}

function RenderBlock({ block, allBlocks }: { block: Block; allBlocks: Block[] }) {
  switch (block.type) {
    case 'text':
      return (
        <div
          className="prose prose-lg max-w-none prose-headings:heading-display prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:text-foreground prose-ol:text-foreground prose-li:marker:text-primary prose-strong:text-foreground mb-6"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case 'heading':
      if (block.level === 2) {
        return (
          <h2 id={block.anchor} className="heading-display text-2xl md:text-3xl text-foreground mt-10 mb-2">
            {block.content}
          </h2>
        );
      }
      return (
        <h3 id={block.anchor} className="heading-display text-xl md:text-2xl text-foreground mt-10 mb-2">
          {block.content}
        </h3>
      );

    case 'image':
      return (
        <figure className="my-8">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-xl"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary pl-6 my-8 italic">
          <p className="text-lg text-foreground">"{block.content}"</p>
          {block.attribution && (
            <cite className="text-sm text-muted-foreground not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case 'list':
      if (block.style === 'bullet') {
        return (
          <ul className="space-y-2 my-6 pl-6 list-disc text-foreground">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <ol className="space-y-2 my-6 pl-6 list-decimal text-foreground">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );

    case 'divider':
      return <hr className="my-10 border-border" />;

    case 'embed': {
      const embedUrl = getYouTubeEmbedUrl(block.url);
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded content"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'faq':
      return (
        <div className="my-8 space-y-3">
          <h2 className="heading-display text-2xl mb-6">Frequently Asked Questions</h2>
          {block.items.map((item, i) => (
            <details key={i} className="group border border-border rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground list-none hover:bg-muted/50 transition-colors">
                {item.question}
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      );

    case 'toc': {
      const headings = allBlocks.filter(
        (b): b is HeadingBlock => b.type === 'heading'
      );
      return (
        <nav className="my-8 p-6 bg-muted/50 rounded-xl border border-border">
          <h2 className="font-semibold text-foreground mb-4">
            {block.label ?? 'In this article'}
          </h2>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
                <a
                  href={`#${heading.anchor}`}
                  className="text-primary hover:underline text-sm"
                >
                  {heading.content}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
    }

    case 'newsletter':
      return (
        <div className="my-8">
          <NewsletterSignup
            heading={(block as NewsletterBlock).heading}
            subheading={(block as NewsletterBlock).subheading}
          />
        </div>
      );

    default:
      return null;
  }
}

export function BlockRenderer({ blocks: rawBlocks, fallbackHtml }: BlockRendererProps) {
  const safeBlocks: Block[] = Array.isArray(rawBlocks)
    ? rawBlocks
    : typeof rawBlocks === 'string'
      ? JSON.parse(rawBlocks)
      : [];

  useEffect(() => {
    if (!safeBlocks || safeBlocks.length === 0) return;
    const faqBlocks = safeBlocks.filter((b): b is FAQBlock => b.type === 'faq');
    if (!faqBlocks.length) return;
    const allItems = faqBlocks.flatMap(b => b.items);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": { "@type": "Answer", "text": item.answer }
      }))
    });
    document.head.appendChild(script);
    return () => { document.getElementById('faq-schema')?.remove(); };
  }, [safeBlocks]);

  if (!safeBlocks || safeBlocks.length === 0) {
    return (
      <div
        className="prose prose-lg max-w-none
          prose-headings:heading-display prose-headings:text-foreground
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-p:text-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-ul:text-foreground prose-ol:text-foreground
          prose-li:marker:text-primary
          prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: fallbackHtml || '' }}
      />
    );
  }

  return (
    <div className="max-w-none">
      {safeBlocks.map(block => (
        <RenderBlock key={block.id} block={block} allBlocks={safeBlocks} />
      ))}
    </div>
  );
}
