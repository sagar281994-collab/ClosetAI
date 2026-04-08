import { useState, useRef } from 'react';

const CATEGORIES = ['Shirt', 'Pants', 'Shoes', 'Jacket', 'Dress', 'Skirt', 'Accessory', 'Other'];
const COLORS = ['', 'Black', 'White', 'Navy', 'Gray', 'Brown', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange'];
const FABRICS = ['', 'Cotton', 'Linen', 'Wool', 'Silk', 'Polyester', 'Denim', 'Leather', 'Knit'];
const STYLES = ['', 'Casual', 'Formal', 'Sporty', 'Bohemian', 'Minimalist', 'Street'];
const WEIGHTS = ['', 'Lightweight', 'Medium weight', 'Heavy'];

export default function UploadForm({ onItemAdded }) {
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    category: 'Shirt',
    color: '',
    fabric: '',
    style: '',
    weight: '',
    notes: '',
  });
  const [image, setImage] = useState(null); // base64 string
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleField(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      // Store pure base64 (strip data URI prefix)
      const base64 = ev.target.result.split(',')[1];
      setImage({ base64, mediaType: file.type });
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze item');
      onItemAdded(data.item);
      // Reset
      setForm({ category: 'Shirt', color: '', fabric: '', style: '', weight: '', notes: '' });
      setImage(null);
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select id="category" name="category" value={form.category} onChange={handleField} required>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <select id="color" name="color" value={form.color} onChange={handleField}>
            {COLORS.map((c) => <option key={c} value={c}>{c || '— select —'}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fabric">Fabric</label>
          <select id="fabric" name="fabric" value={form.fabric} onChange={handleField}>
            {FABRICS.map((f) => <option key={f} value={f}>{f || '— select —'}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="style">Style</label>
          <select id="style" name="style" value={form.style} onChange={handleField}>
            {STYLES.map((s) => <option key={s} value={s}>{s || '— select —'}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <select id="weight" name="weight" value={form.weight} onChange={handleField}>
            {WEIGHTS.map((w) => <option key={w} value={w}>{w || '— select —'}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes (optional)</label>
        <input id="notes" name="notes" value={form.notes} onChange={handleField} placeholder="e.g. vintage, gift from mum..." />
      </div>

      <div className="form-group">
        <label>Photo (optional — AI will auto-fill missing details)</label>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="img-preview" />
        )}
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} />Analyzing…</> : '+ Add to closet'}
      </button>
    </form>
  );
}
