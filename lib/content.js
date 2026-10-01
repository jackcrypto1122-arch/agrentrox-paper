import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllChapters() {
  const fileNames = fs.readdirSync(contentDirectory);
  const chapters = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Estimate reading time (200 words per min)
      const wordCount = content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        slug: data.slug || fileName.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        number: data.number || '00',
        readingTime: `${readingTime} min read`,
        data,
        fileName,
      };
    })
    .sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10));

  return chapters;
}

export function getChapterBySlug(slug) {
  const chapters = getAllChapters();
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index === -1) return null;

  const chapterMeta = chapters[index];
  const fullPath = path.join(contentDirectory, chapterMeta.fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract headings for Table of Contents
  const headings = [];
  const lines = content.split('\n');
  const seenIds = new Map();

  lines.forEach((line) => {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h2Match || h3Match) {
      const isH2 = Boolean(h2Match);
      const text = (isH2 ? h2Match[1] : h3Match[1]).trim();
      let baseId = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      const count = seenIds.get(baseId) || 0;
      seenIds.set(baseId, count + 1);
      const id = count > 0 ? `${baseId}-${count}` : baseId;

      headings.push({ level: isH2 ? 2 : 3, text, id });
    }
  });

  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  return {
    slug,
    title: data.title || chapterMeta.title,
    number: data.number || chapterMeta.number,
    readingTime: `${readingTime} min read`,
    headings,
    content,
    data,
    prev,
    next,
  };
}

export function searchChapters(query) {
  if (!query || query.trim().length === 0) return [];
  const cleanQuery = query.toLowerCase().trim();
  const chapters = getAllChapters();

  const results = [];
  for (const ch of chapters) {
    const fullPath = path.join(contentDirectory, ch.fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);

    const titleMatch = ch.title.toLowerCase().includes(cleanQuery);
    const contentLower = content.toLowerCase();
    const matchIndex = contentLower.indexOf(cleanQuery);

    if (titleMatch || matchIndex !== -1) {
      let snippet = '';
      if (matchIndex !== -1) {
        const start = Math.max(0, matchIndex - 50);
        const end = Math.min(content.length, matchIndex + 120);
        snippet = (start > 0 ? '...' : '') + content.slice(start, end).replace(/\n/g, ' ') + (end < content.length ? '...' : '');
      } else {
        snippet = content.slice(0, 120).replace(/\n/g, ' ') + '...';
      }

      results.push({
        slug: ch.slug,
        title: ch.title,
        number: ch.number,
        snippet,
      });
    }
  }

  return results;
}
