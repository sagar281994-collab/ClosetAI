import '../styles/globals.css';
import DarkModeToggle from '../components/DarkModeToggle';
import PaymentModal from '../components/PaymentModal';
import Link from 'next/link';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <PaymentModal onClose={() => setShowModal(false)} />}
      <header className="page-header">
        <div className="container inner">
          <Link href="/" className="logo">👗 ClosetAI</Link>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/upload" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>My Closet</Link>
            <Link href="/results" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Outfits</Link>
            
            <button 
              onClick={() => setShowModal(true)}
              style={{
                background: 'linear-gradient(90deg, #ff6b6b, #c06c84)',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.1s'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              👑 Premium
            </button>
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
