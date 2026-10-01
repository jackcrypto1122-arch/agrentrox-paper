import Link from 'next/link';

export default function Pagination({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className="pagination-container" aria-label="Chapter navigation">
      {prev ? (
        <Link
          href={prev.slug === 'overview' ? '/' : `/chapter/${prev.slug}`}
          className="pagination-card pagination-prev"
        >
          <div className="pagination-meta">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>PREVIOUS CHAPTER</span>
          </div>
          <div className="pagination-title">
            <span className="pagination-num">{prev.number}</span> {prev.title}
          </div>
        </Link>
      ) : (
        <div className="pagination-spacer" />
      )}

      {next ? (
        <Link
          href={`/chapter/${next.slug}`}
          className="pagination-card pagination-next"
        >
          <div className="pagination-meta">
            <span>NEXT CHAPTER</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className="pagination-title">
            <span className="pagination-num">{next.number}</span> {next.title}
          </div>
        </Link>
      ) : (
        <div className="pagination-spacer" />
      )}
    </nav>
  );
}
