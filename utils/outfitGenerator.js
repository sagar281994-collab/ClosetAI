// Builds the Claude prompt for outfit generation

export function buildOutfitPrompt(closet, filters) {
  const filterText = Object.entries(filters)
    .filter(([, v]) => v && v !== 'Any')
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  return `You are a world-class fashion stylist AI.

The user has the following clothing items in their closet:
${JSON.stringify(closet, null, 2)}

Filters requested: ${filterText || 'none'}

Create 3 complete outfit combinations using ONLY items from the closet.
For each outfit, also suggest 1–2 missing items that would elevate the look.

Return ONLY valid JSON — no markdown, no explanation — in this exact shape:
{
  "outfits": [
    {
      "items": ["Item name 1", "Item name 2"],
      "description": "Short, punchy style description",
      "occasion": "When to wear this",
      "confidence": 88,
      "missingItems": ["Optional item 1"]
    }
  ]
}`;
}
