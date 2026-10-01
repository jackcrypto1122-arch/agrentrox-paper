'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchModal from './SearchModal';

export default function WhitepaperShell({ chapters, children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="whitepaper-app">
      <Header onOpenSearch={() => setSearchOpen(true)} />

      {/* Mobile Top Sub-bar */}
      <div className="mobile-subbar">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open chapters navigation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span>Table of Contents</span>
        </button>

        <button
          type="button"
          className="mobile-search-btn"
          onClick={() => setSearchOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search</span>
        </button>
      </div>

      <div className="whitepaper-body-layout">
        <Sidebar
          chapters={chapters}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <main className="main-content-area">{children}</main>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
