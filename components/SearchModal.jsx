'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Global key listener for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent
          const btn = document.querySelector('.search-trigger-btn');
          btn?.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setSelectedIndex(0);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (slug) => {
    onClose();
    if (slug === 'overview') {
      router.push('/');
    } else {
      router.push(`/chapter/${slug}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex].slug);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="search-modal-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-modal-icon">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search whitepaper, private swaps, agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={onClose} className="search-modal-close">
            <kbd className="modal-esc">ESC</kbd>
          </button>
        </div>

        <div className="search-modal-results">
          {loading && (
            <div className="search-modal-status">
              <span className="search-spinner" /> Searching protocol whitepaper...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="search-modal-empty">
              No matching sections found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && !query && (
            <div className="search-modal-hints">
              <div className="hint-label">Quick Suggestions:</div>
              <div className="hint-tags">
                {['Private Swaps', 'Tokenized Stocks', 'Grid Trading', 'Scalping', 'Robinhood Chain', 'Roadmap'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="hint-tag-btn"
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ul className="search-result-list">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      className={`search-result-item ${isSelected ? 'search-result-selected' : ''}`}
                      onClick={() => handleSelect(item.slug)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="search-result-header">
                        <span className="search-result-num">{item.number}</span>
                        <span className="search-result-title">{item.title}</span>
                      </div>
                      <p className="search-result-snippet">{item.snippet}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="search-modal-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵</kbd></span>
          <span>Close with <kbd>esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
