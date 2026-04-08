import Anthropic from '@anthropic-ai/sdk';
import { buildOutfitPrompt } from '../../utils/outfitGenerator';
import { CLAUDE_MODEL, API_CONFIG } from '../../cloud/cloudEndpoints';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { closet, filters } = req.body;

  if (!closet || closet.length === 0) {
    return res.status(400).json({ error: 'Closet is empty — add some items first' });
  }

  try {
    // ---- MOCK AI MODE ----
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 2000));

    // Return dummy outfit generations instead of calling Claude
    const outfits = [
      {
        items: closet.slice(0, 2).map((i) => i.category + (i.color ? ` (${i.color})` : '')),
        description: 'A stylish mocked outfit based on your closet.',
        occasion: 'Casual Friday',
        confidence: 95,
        missingItems: ['A nice mock hat']
      },
      {
        items: closet.slice(-2).map((i) => i.category + (i.color ? ` (${i.color})` : '')),
        description: 'A sleek evening look featuring mocked styling.',
        occasion: 'Dinner Date',
        confidence: 82,
        missingItems: ['Leather belt']
      },
      {
        items: closet.slice(1, 4).map((i) => i.category + (i.color ? ` (${i.color})` : '')),
        description: 'An experimental mock outfit. Very trendy.',
        occasion: 'Art gallery',
        confidence: 70,
        missingItems: []
      }
    ];

    // Filter out empty outfits if closet had fewer than 2 items
    const validOutfits = outfits.filter(o => o.items.length > 0);

    return res.status(200).json({ outfits: validOutfits });
  } catch (err) {
    console.error('[generate-outfit]', err);
    return res.status(500).json({ error: err.message || 'Outfit generation failed' });
  }
}
