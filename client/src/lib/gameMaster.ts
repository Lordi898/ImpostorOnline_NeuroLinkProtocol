import { getRandomWord, type WordData } from '@/data/fallbackWords';

export async function generateSecretWord(language: 'en' | 'es' = 'en'): Promise<WordData> {
  try {
    const response = await fetch('/api/generate-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate word');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[GAME MASTER] Word generation failed, using fallback:', error);
    return getRandomWord(language);
  }
}

export function getLocalSecretWord(): WordData {
  // This function is no longer used directly for secret word generation
  // but is kept for backward compatibility or potential future use.
  // The language parameter is not passed here as it's not specified in the original usage.
  return getRandomWord();
}