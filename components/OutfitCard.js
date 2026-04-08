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
            ✨ Could elevate this look:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {outfit.missingItems.map((item, i) => (
              <span key={i} style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>• {item}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
