import { getRandomWord, type WordData } from '@/data/fallbackWords';

export async function generateSecretWord(): Promise<WordData> {
  try {
    const response = await fetch('/api/generate-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const wordData: WordData = await response.json();
    console.log('[GAME MASTER] Generated word from server:', wordData.category);
    return wordData;
  } catch (error) {
    console.error('[GAME MASTER] Server word generation failed, using local fallback:', error);
    return getLocalSecretWord();
  }
}

export function getLocalSecretWord(): WordData {
  return getRandomWord();
}
