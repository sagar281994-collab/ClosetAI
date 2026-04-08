const MOODS = ['Any', 'Happy', 'Casual', 'Professional', 'Romantic', 'Energetic', 'Relaxed'];
const WEATHERS = ['Any', 'Sunny', 'Rainy', 'Cold', 'Hot', 'Windy', 'Snowy'];
const TRENDS = ['Any', 'Quiet luxury', 'Y2K', 'Cottagecore', 'Streetwear', 'Old money', 'Athleisure'];

function Pill({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: '20px',
        border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        background: selected ? 'var(--accent-bg)' : 'transparent',
        color: selected ? 'var(--accent)' : 'var(--text-muted)',
        fontWeight: selected ? 600 : 400,
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

export default function FilterPanel({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mood</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {MOODS.map((m) => (
            <Pill key={m} label={m} selected={filters.mood === m} onClick={() => set('mood', m)} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Weather</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {WEATHERS.map((w) => (
            <Pill key={w} label={w} selected={filters.weather === w} onClick={() => set('weather', w)} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trend</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TRENDS.map((t) => (
            <Pill key={t} label={t} selected={filters.trend === t} onClick={() => set('trend', t)} />
          ))}
        </div>
      </div>
    </div>
  );
}
