'use client';

import { useState } from 'react';

export default function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const isAsciiDiagram =
    value.includes('┌─') ||
    value.includes('│') ||
    value.includes('──') ||
    language === 'text' ||
    language === 'ascii';

  return (
    <div className={`code-block-wrapper ${isAsciiDiagram ? 'diagram-block-wrapper' : ''}`}>
      <div className="code-block-header">
        <div className="code-block-lang">
          {isAsciiDiagram ? (
            <span className="diagram-indicator">
              <span className="diagram-dot" />
              SYSTEM ARCHITECTURE
            </span>
          ) : (
            language || 'code'
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="code-copy-btn"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="copied-text">Copied!</span>
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-pre">
        <code>{value}</code>
      </pre>
    </div>
  );
}
