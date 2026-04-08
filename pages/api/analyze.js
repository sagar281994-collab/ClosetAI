import Anthropic from '@anthropic-ai/sdk';
import { buildImageContent, buildAnalyzePrompt } from '../../utils/imageRecognition';
import { CLAUDE_MODEL, API_CONFIG } from '../../cloud/cloudEndpoints';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { form, image } = req.body;

  if (!form?.category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    // ---- MOCK AI MODE ----
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1500));
    
    // Return a mocked AI response based loosely on their input
    const item = {
      category: form.category || 'Mocked Top',
      color: form.color || 'Navy',
      fabric: form.fabric || 'Cotton',
      style: form.style || 'Casual',
      weight: form.weight || 'Medium weight',
      notes: form.notes || 'Mock item generated locally (No AI).',
      tags: ['mocked', 'test']
    };

    return res.status(200).json({ item: { ...item, id: Date.now() } });
  } catch (err) {
    console.error('[analyze]', err);
    return res.status(500).json({ error: err.message || 'AI analysis failed' });
  }
}
