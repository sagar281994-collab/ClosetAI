import { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import OutfitCard from '../components/OutfitCard';
import { generateOutfits } from '../utils/api';

export default function Results() {
  const [closet, setCloset] = useState([]);
  const [filters, setFilters] = useState({ mood: 'Any', weather: 'Any', trend: 'Any' });
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generationsToday, setGenerationsToday] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('closet');
    if (stored) setCloset(JSON.parse(stored));
    
    // Check daily limit for freemium model
    const dailyData = JSON.parse(localStorage.getItem('generationData') || '{"count": 0, "date": ""}');
    const today = new Date().toDateString();
    if (dailyData.date === today) {
      setGenerationsToday(dailyData.count);
    } else {
      localStorage.setItem('generationData', JSON.stringify({ count: 0, date: today }));
      setGenerationsToday(0);
    }
  }, []);

  async function handleGenerate() {
    if (closet.length === 0) {
      setError('Your closet is empty. Add some items first.');
      return;
    }

    if (generationsToday >= 3 && localStorage.getItem('isPremium') !== 'true') {
      setError('Free tier limit reached (3/3 daily generations). Upgrade to Premium for unlimited styling for just $5/month! 💎');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const result = await generateOutfits(closet, filters);
      setOutfits(result);

      // Increment daily generation count
      const newCount = generationsToday + 1;
      setGenerationsToday(newCount);
      localStorage.setItem('generationData', JSON.stringify({ count: newCount, date: new Date().toDateString() }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-body">
      <div className="container">
        <h1 style={{ marginBottom: '8px' }}>Outfit Generator</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Customize your filters, then let AI style you.
        </p>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Filters</h2>
          <FilterPanel filters={filters} onChange={setFilters} />
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
              {loading
                ? <><span className="spinner" style={{ width: 16, height: 16 }} />Styling…</>
                : '✨ Generate outfits'}
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {closet.length} item{closet.length !== 1 ? 's' : ''} in your closet
            </span>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {outfits.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Your outfits</h2>
            {outfits.map((outfit, i) => (
              <OutfitCard key={i} outfit={outfit} index={i} />
            ))}
          </div>
        )}

        {!loading && outfits.length === 0 && !error && (
          <div className="card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No outfits yet</p>
            <p style={{ fontSize: '0.9rem' }}>
              Set your filters and click "Generate outfits" to start.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
