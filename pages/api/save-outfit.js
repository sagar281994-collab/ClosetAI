// In-memory store for MVP. Replace with a real DB (e.g. Supabase, PlanetScale) later.

let savedOutfits = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { outfit } = req.body;
    if (!outfit) return res.status(400).json({ error: 'No outfit provided' });
    const record = { ...outfit, savedAt: new Date().toISOString(), id: Date.now() };
    savedOutfits.push(record);
    return res.status(200).json({ success: true, id: record.id });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ outfits: savedOutfits });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
