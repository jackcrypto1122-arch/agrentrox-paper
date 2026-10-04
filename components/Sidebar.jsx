'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CHAPTER_GROUPS = [
  {
    category: 'OVERVIEW',
    slugs: ['introduction', 'abstract'],
  },
  {
    category: 'PRIVATE TRADING',
    slugs: ['private-swaps', 'tokenized-stock-swaps'],
  },
  {
    category: 'AGENTIC SYSTEM',
    slugs: ['private-agentic-trading', 'agentic-strategies'],
  },
  {
    category: 'ARCHITECTURE & SECURITY',
    slugs: ['architecture-overview', 'security-privacy-model'],
  },
  {
    category: 'EXECUTION & ROADMAP',
    slugs: ['use-cases', 'roadmap', 'conclusion'],
  },
];

export default function Sidebar({ chapters = [], isOpen, onClose }) {
  const pathname = usePathname();

  const chapterMap = {};
  chapters.forEach((ch) => {
    chapterMap[ch.slug] = ch;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-nav-groups">
            {CHAPTER_GROUPS.map((group) => {
              const groupChapters = group.slugs
                .map((slug) => chapterMap[slug])
                .filter(Boolean);

              if (groupChapters.length === 0) return null;

              return (
                <div key={group.category} className="sidebar-group">
                  <div className="sidebar-group-title">{group.category}</div>
                  <ul className="sidebar-list">
                    {groupChapters.map((ch) => {
                      const isActive =
                        pathname === `/chapter/${ch.slug}` ||
                        (pathname === '/' && ch.slug === 'introduction');

                      return (
                        <li key={ch.slug} className="sidebar-item">
                          <Link
                            href={`/chapter/${ch.slug}`}
                            className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                            onClick={onClose}
                          >
                            <span className="sidebar-num">{ch.number}</span>
                            <span className="sidebar-label">{ch.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
