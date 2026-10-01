'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

export default function MarkdownRenderer({ content }) {
  const seenIds = new Map();

  const getUniqueId = (text) => {
    const baseId = String(text)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    const count = seenIds.get(baseId) || 0;
    seenIds.set(baseId, count + 1);
    return count > 0 ? `${baseId}-${count}` : baseId;
  };

  const customComponents = {
    h2({ children }) {
      const text = typeof children === 'string' ? children : String(children);
      const id = getUniqueId(text);

      return (
        <h2 id={id} className="content-h2 group">
          <a href={`#${id}`} className="heading-anchor">
            {children}
            <span className="anchor-hash">#</span>
          </a>
        </h2>
      );
    },
    h3({ children }) {
      const text = typeof children === 'string' ? children : String(children);
      const id = getUniqueId(text);

      return (
        <h3 id={id} className="content-h3 group">
          <a href={`#${id}`} className="heading-anchor">
            {children}
            <span className="anchor-hash">#</span>
          </a>
        </h3>
      );
    },
    pre({ children }) {
      // Find code child
      if (children && children.props) {
        const { className, children: codeText } = children.props;
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : '';
        return <CodeBlock language={language} value={String(codeText).replace(/\n$/, '')} />;
      }
      return <pre className="code-pre">{children}</pre>;
    },
    code({ inline, className, children }) {
      if (inline) {
        return <code className="inline-code">{children}</code>;
      }
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      return <CodeBlock language={language} value={String(children).replace(/\n$/, '')} />;
    },
    table({ children }) {
      return (
        <div className="table-wrapper">
          <table className="content-table">{children}</table>
        </div>
      );
    },
    blockquote({ children }) {
      return <blockquote className="content-blockquote">{children}</blockquote>;
    },
    ul({ children }) {
      return <ul className="content-ul">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="content-ol">{children}</ol>;
    },
    li({ children }) {
      return (
        <li className="content-li">
          <span className="li-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M8.5 12l2.5 2.5L15.5 9.5" />
            </svg>
          </span>
          <div className="li-content">{children}</div>
        </li>
      );
    },
    p({ children }) {
      return <p className="content-p">{children}</p>;
    },
    hr() {
      return (
        <div className="content-divider-wrapper">
          <span className="divider-cross left">+</span>
          <hr className="content-hr" />
          <span className="divider-cross right">+</span>
        </div>
      );
    },
  };

  return (
    <article className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
