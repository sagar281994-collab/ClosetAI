export default function OutfitCard({ outfit, index }) {
  const score = outfit.confidence ?? 85;
  const scoreColor = score >= 80 ? 'var(--success)' : score >= 60 ? '#d97706' : '#dc2626';

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '1.1rem' }}>Outfit #{index + 1}</h3>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: scoreColor }}>
          {score}% match
        </span>
      </div>

      {outfit.description && (
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem' }}>
          {outfit.description}
        </p>
      )}

      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Items</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(outfit.items || []).map((item, i) => (
            <span key={i} className="tag">{item}</span>
          ))}
        </div>
      </div>

      {outfit.occasion && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <strong>Best for:</strong> {outfit.occasion}
        </p>
      )}

      {outfit.missingItems && outfit.missingItems.length > 0 && (
        <div style={{ marginTop: '16px', padding: '12px', background: 'var(--accent-bg)', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
            ✨ Elevate this look & support us:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {outfit.missingItems.map((item, i) => {
              const affiliateLink = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(item)}&affiliate=closetai`;
              return (
                <a 
                  key={i} 
                  href={affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '0.8rem', 
                    color: '#fff', 
                    background: 'var(--accent)',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  🛒 Buy "{item}"
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
