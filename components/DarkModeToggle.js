import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{
        background: 'var(--accent-bg)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '7px 13px',
        cursor: 'pointer',
        color: 'var(--text)',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {dark ? '☀️' : '🌙'}
      <span style={{ fontSize: '0.85rem' }}>{dark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
