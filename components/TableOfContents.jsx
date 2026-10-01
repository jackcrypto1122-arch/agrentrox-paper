'use client';

import { useEffect, useState } from 'react';

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="toc-container">
      <div className="toc-inner">
        <div className="toc-header">
          <span className="toc-title">ON THIS PAGE</span>
        </div>
        <nav className="toc-nav">
          <ul className="toc-list">
            {headings.map((h) => {
              const isH3 = h.level === 3;
              const isActive = activeId === h.id;
              return (
                <li
                  key={h.id}
                  className={`toc-item ${isH3 ? 'toc-item-sub' : ''} ${isActive ? 'toc-item-active' : ''}`}
                >
                  <a
                    href={`#${h.id}`}
                    className="toc-link"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(h.id);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        history.pushState(null, '', `#${h.id}`);
                      }
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="toc-actions">
          <button type="button" onClick={scrollToTop} className="toc-action-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
