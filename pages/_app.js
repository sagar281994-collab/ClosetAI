import '../styles/globals.css';
import DarkModeToggle from '../components/DarkModeToggle';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  return (
    <>
      <header className="page-header">
        <div className="container inner">
          <Link href="/" className="logo">👗 ClosetAI</Link>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/upload" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>My Closet</Link>
            <Link href="/results" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Outfits</Link>
            <DarkModeToggle />
          </nav>
        </div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
