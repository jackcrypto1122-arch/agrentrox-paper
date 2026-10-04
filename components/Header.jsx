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
        {/* Brand Logo & Title */}
        <div className="header-left">
          <Link href="/" className="brand-logo">
            <img
              src="/agentrox-logo.jpeg"
              alt="Agentrox logo"
              className="brand-logo-img"
            />
            <div className="brand-text-group">
              <span className="brand-title">Agentrox</span>
              <span className="brand-badge">WHITEPAPER</span>
            </div>
          </Link>
          <span className="header-divider">/</span>
          <span className="header-section-label">Robinhood Chain</span>
        </div>

        {/* Center Navigation Links */}
        <nav className="header-nav">
          <Link
            href="/chapter/introduction"
            className={`nav-link ${pathname.startsWith('/chapter') || pathname === '/' ? 'nav-link-active' : ''}`}
          >
            Whitepaper
          </Link>
          <Link href="/chapter/private-swaps" className="nav-link">
            Private Swaps
          </Link>
          <Link href="/chapter/agentic-strategies" className="nav-link">
            Strategies
          </Link>
          <Link href="/chapter/roadmap" className="nav-link">
            Roadmap
          </Link>
        </nav>

        {/* Right Actions & Socials */}
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

          {/* Social Icons */}
          <div className="header-socials">
            <a
              href="https://x.com/agentrox_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="social-icon-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://t.me/agentroxportal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="social-icon-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>

          <a
            href="https://www.agentrox.site"
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
