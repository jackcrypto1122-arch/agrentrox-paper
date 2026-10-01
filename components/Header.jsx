'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header({ onOpenSearch }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-left">
          <Link href="/" className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-icon">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M7 8L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 16L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="brand-text-group">
              <span className="brand-title">BLACKWOOD</span>
              <span className="brand-badge">PROTOCOL</span>
            </div>
          </Link>
          <span className="header-divider">/</span>
          <span className="header-section-label">Whitepaper</span>
        </div>

        {/* Center / Navigation Links matching Framer site */}
        <nav className="header-nav">
          <a href="https://empathetic-view-679067.framer.app/#agents" target="_blank" rel="noopener noreferrer" className="nav-link">
            Agents
          </a>
          <a href="https://empathetic-view-679067.framer.app/#strategies" target="_blank" rel="noopener noreferrer" className="nav-link">
            Strategies
          </a>
          <a href="https://empathetic-view-679067.framer.app/#roadmap" target="_blank" rel="noopener noreferrer" className="nav-link">
            Roadmap
          </a>
          <Link href="/chapter/executive-summary" className={`nav-link ${pathname.startsWith('/chapter') || pathname === '/' ? 'nav-link-active' : ''}`}>
            Whitepaper
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="header-right">
          <button
            type="button"
            className="search-trigger-btn"
            onClick={onOpenSearch}
            title="Search Whitepaper (Ctrl+K or ⌘K)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="search-placeholder">Quick search...</span>
            <kbd className="search-kbd">⌘K</kbd>
          </button>

          <a
            href="https://empathetic-view-679067.framer.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-main-site"
          >
            <span>Website</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
