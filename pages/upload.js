import { useState, useEffect } from 'react';
import UploadForm from '../components/UploadForm';

export default function Upload() {
  const [closet, setCloset] = useState([]);

  // Persist closet in localStorage for MVP
  useEffect(() => {
    const stored = localStorage.getItem('closet');
    if (stored) setCloset(JSON.parse(stored));
  }, []);

  function addItem(item) {
    const updated = [...closet, item];
    setCloset(updated);
    localStorage.setItem('closet', JSON.stringify(updated));
  }

  function removeItem(id) {
    const updated = closet.filter((i) => i.id !== id);
    setCloset(updated);
    localStorage.setItem('closet', JSON.stringify(updated));
  }

  return (
    <div className="page-body">
      <div className="container">
        <h1 style={{ marginBottom: '8px' }}>My Closet</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Add clothing items below. AI will analyze photos and fill in any missing details.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <div className="card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Add an item</h2>
              <UploadForm onItemAdded={addItem} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.1rem' }}>Closet ({closet.length} items)</h2>
              {closet.length > 0 && (
                <a href="/results" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                  Generate outfits →
                </a>
              )}
            </div>

            {closet.length === 0 && (
              <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
                <p>No items yet. Add your first piece!</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {closet.map((item) => (
                <div key={item.id} className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 500, marginBottom: '4px' }}>
                      {item.category}
                      {item.color ? ` · ${item.color}` : ''}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {[item.fabric, item.style, item.weight].filter(Boolean).map((t, i) => (
                        <span key={i} className="tag" style={{ fontSize: '0.75rem' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.1rem', padding: '2px 6px' }}
                    aria-label="Remove item"
                  >×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
