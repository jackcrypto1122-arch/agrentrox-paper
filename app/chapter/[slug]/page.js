import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllChapters, getChapterBySlug } from '@/lib/content';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import Pagination from '@/components/Pagination';

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((ch) => ({
    slug: ch.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return { title: 'Chapter Not Found' };

  return {
    title: `${chapter.number} · ${chapter.title} | AgentRox Protocol Whitepaper`,
    description: `Read chapter ${chapter.number}: ${chapter.title} of the AgentRox Protocol Whitepaper. A privacy-first execution layer for tokenized stocks and crypto.`,
  };
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="chapter-page-layout">
      <div className="chapter-main-column">
        {/* Breadcrumb Bar */}
        <div className="chapter-breadcrumbs">
          <Link href="/" className="breadcrumb-link">Whitepaper</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Chapter {chapter.number}</span>
        </div>

        {/* Chapter Header */}
        <header className="chapter-header">
          <div className="chapter-meta-row">
            <span className="chapter-num-badge">CHAPTER {chapter.number}</span>
            <span className="chapter-reading-time">{chapter.readingTime}</span>
            <span className="chapter-network-tag">Robinhood Chain</span>
          </div>
          <h1 className="chapter-title">{chapter.title}</h1>
        </header>

        {/* Decorative Grid Line with Framer '+' markers */}
        <div className="framer-grid-divider">
          <span className="grid-cross left">+</span>
          <div className="grid-line" />
          <span className="grid-cross right">+</span>
        </div>

        {/* Render Markdown Content */}
        <div className="chapter-body">
          <MarkdownRenderer content={chapter.content} />
        </div>

        {/* Bottom Navigation */}
        <Pagination prev={chapter.prev} next={chapter.next} />
      </div>

      {/* Right Sidebar: Table of Contents */}
      <TableOfContents headings={chapter.headings} />
    </div>
  );
}
