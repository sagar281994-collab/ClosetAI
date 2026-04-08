import Link from 'next/link';

export default function Home() {
  return (
    <div className="page-body">
      <div className="container">
        <div style={{ textAlign: 'center', padding: '60px 0 48px' }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>
            Your AI Stylist,<br />always ready.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '520px', margin: '0 auto 36px' }}>
            Upload your wardrobe, pick your mood, and get AI-powered outfit ideas in seconds.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/upload" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '13px 28px' }}>
              Start with my closet →
            </Link>
            <Link href="/results" className="btn btn-secondary">
              See example outfits
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {[
            { icon: '📸', title: 'Upload your closet', desc: 'Add items with or without photos. AI fills in the details.' },
            { icon: '🎛️', title: 'Set your filters', desc: 'Choose your mood, today\'s weather, and a fashion trend.' },
            { icon: '✨', title: 'Get AI outfits', desc: '3 curated looks with confidence scores and what\'s missing.' },
          ].map((f) => (
            <div key={f.title} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
