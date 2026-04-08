import { useState } from 'react';

export default function PaymentModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubscribe() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Give them premium privileges locally to bypass the 3-day limit!
      localStorage.setItem('isPremium', 'true');
    }, 1500);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: 'var(--surface)', width: '90%', maxWidth: '500px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Upgrade Your Closet 💎</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--text-muted)', lineHeight: 1 }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px', animation: 'bounce 1s infinite' }}>🎉</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--success)' }}>Payment Successful!</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '1rem' }}>You now have unlimited daily outfit generations.</p>
              <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '24px', width: '100%', justifyContent: 'center', padding: '14px' }}>Start Styling</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
                <div style={{ flex: 1, padding: '20px 16px', border: '2px solid var(--border)', borderRadius: '12px', opacity: 0.8, background: 'var(--bg)' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: 'var(--text-muted)' }}>Free Tier</h4>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 12px' }}>$0<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/mo</span></p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>✓ 3 generations/day</li>
                    <li>✓ Basic matching</li>
                    <li>✕ Ads included</li>
                  </ul>
                </div>
                
                <div style={{ flex: 1, padding: '20px 16px', border: '2px solid var(--accent)', borderRadius: '12px', background: 'var(--accent-bg)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '50%', transform: 'translateX(50%)', background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Popular</div>
                  <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: 'var(--accent)' }}>Premium</h4>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 12px', color: 'var(--accent)' }}>$5<span style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: 500 }}>/mo</span></p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 500 }}>
                    <li>✓ <strong style={{color: 'var(--accent)'}}>Unlimited</strong> generations</li>
                    <li>✓ Pro AI styling</li>
                    <li>✓ Clickable Affiliate links</li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={handleSubscribe} 
                disabled={loading}
                style={{ width: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef)', color: 'white', padding: '16px', border: 'none', borderRadius: '10px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)', transition: 'transform 0.1s' }}
                onMouseDown={(e) => !loading && (e.currentTarget.style.transform = 'scale(0.97)')}
                onMouseUp={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {loading ? <span className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white', width: 22, height: 22 }} /> : '💳 Subscribe with Stripe (Mock)'}
              </button>
            </>
          )}

          {/* Investor/Presentation Info Panel */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '2px dashed var(--border)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
               📊 Investor Presentation Board
            </p>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#f59e0b' }} />
              <p style={{ fontSize: '0.85rem', margin: '0 0 10px', color: 'var(--text)' }}>
                <strong>MRR Projection:</strong> 1,000 active users × $5/month = <strong style={{color: '#059669', fontSize: '0.95rem'}}>$5,000/mo</strong>
              </p>
              <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text)' }}>
                <strong>Affiliate Strategy:</strong> The "🛒 Buy Item" buttons in Outfits inject passive affiliate commissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
