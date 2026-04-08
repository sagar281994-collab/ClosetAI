// Shared fetch wrapper used by pages

export async function analyzeItem(form, image) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form, image }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Analyze failed');
  return data.item;
}

export async function generateOutfits(closet, filters) {
  const res = await fetch('/api/generate-outfit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ closet, filters }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Generation failed');
  return data.outfits;
}

export async function saveOutfit(outfit) {
  const res = await fetch('/api/save-outfit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ outfit }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Save failed');
  return data;
}
