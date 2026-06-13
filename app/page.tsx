// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="hub-container">
      {/* Hero Header Banner */}
      <header className="hub-header">
        <h1>Next.js Core Architecture Prototype</h1>
      </header>

      {/* Grid Menu Matrix */}
      <div className="pillar-grid">
        
        {/* Pillar 1: SSG */}
        <div className="pillar-card">
          <div>
            <div className="badge-row">
              <span className="badge-dot ssg-dot"></span>
              <span className="badge-text ssg-text">SSG</span>
            </div>
            <h2>Static Site Generation</h2>
            <p>
              Pre-renders the product catalog directly to flat HTML files at build time. Leverages <code>generateStaticParams</code> for instant, CDN-cached dynamic detail loads.
            </p>
          </div>
          <Link href="/products" className="pillar-link">
            Explore Products Catalog &rarr;
          </Link>
        </div>

        {/* Pillar 2: SSR */}
        <div className="pillar-card">
          <div>
            <div className="badge-row">
              <span className="badge-dot ssr-dot"></span>
              <span className="badge-text ssr-text">SSR</span>
            </div>
            <h2>Server-Side Rendering</h2>
            <p>
              Generates administrative views dynamically on every request. Utilizes concurrent parallel promises (<code>Promise.all</code>) to simultaneously process independent API data without request waterfalls.
            </p>
          </div>
          <Link href="/dashboard" className="pillar-link">
            View Live Operations Dashboard &rarr;
          </Link>
        </div>

        {/* Pillar 3: ISR */}
        <div className="pillar-card">
          <div>
            <div className="badge-row">
              <span className="badge-dot isr-dot"></span>
              <span className="badge-text isr-text">ISR</span>
            </div>
            <h2>Incremental Static Regeneration</h2>
            <p>
              Balances global distribution speed and freshness. Serves cached static files instantly while automatically initiating background regeneration intervals every 60 seconds.
            </p>
          </div>
          <Link href="/posts" className="pillar-link">
            Read Dynamic Posts Feed &rarr;
          </Link>
        </div>

        {/* Pillar 4: CSR */}
        <div className="pillar-card">
          <div>
            <div className="badge-row">
              <span className="badge-dot csr-dot"></span>
              <span className="badge-text csr-text">CSR</span>
            </div>
            <h2>Client-Side Interactivity</h2>
            <p>
              Encapsulates heavy state manipulation and event lifecycle handlers in highly interactive, isolated browser-only components marked with the <code>&quot;use client&quot;</code> directive.
            </p>
          </div>
          <Link href="/todos" className="pillar-link">
            Test Interactive Filter App &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}