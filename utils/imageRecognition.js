// Builds the Claude vision message content for a clothing item image

export function buildImageContent(base64, mediaType) {
  return {
    type: 'image',
    source: {
      type: 'base64',
      media_type: mediaType || 'image/jpeg',
      data: base64,
    },
  };
}

export function buildAnalyzePrompt(form) {
  return `You are a fashion expert AI. Analyze this clothing item image and the user-provided metadata below.
Fill in any missing or blank fields using what you can see in the image.
Return ONLY valid JSON — no markdown, no explanation.

User-provided metadata:
${JSON.stringify(form, null, 2)}

Return this exact JSON shape:
{
  "category": "string",
  "color": "string",
  "fabric": "string",
  "style": "string",
  "weight": "string",
  "notes": "string",
  "tags": ["tag1", "tag2"]
}`;
}
