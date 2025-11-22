import type { Express } from "express";
import { createServer, type Server } from "http";
import { GoogleGenAI } from '@google/genai';

interface WordData {
  word: string;
  category: string;
}

const fallbackWords: WordData[] = [
  { word: "LAPTOP", category: "TECHNOLOGY" },
  { word: "PIZZA", category: "FOOD" },
  { word: "DOCTOR", category: "PROFESSION" },
  { word: "LIBRARY", category: "LOCATION" },
  { word: "MOTORCYCLE", category: "VEHICLE" },
  { word: "ELEPHANT", category: "ANIMAL" },
  { word: "GUITAR", category: "OBJECT" },
  { word: "SMARTPHONE", category: "TECHNOLOGY" },
  { word: "SUSHI", category: "FOOD" },
  { word: "TEACHER", category: "PROFESSION" },
  { word: "AIRPORT", category: "LOCATION" },
  { word: "SUBMARINE", category: "VEHICLE" },
  { word: "PENGUIN", category: "ANIMAL" },
  { word: "CAMERA", category: "OBJECT" },
  { word: "HEADPHONES", category: "TECHNOLOGY" },
  { word: "BURGER", category: "FOOD" },
  { word: "CHEF", category: "PROFESSION" },
  { word: "MUSEUM", category: "LOCATION" },
  { word: "HELICOPTER", category: "VEHICLE" },
  { word: "DOLPHIN", category: "ANIMAL" }
];

function getRandomFallbackWord(): WordData {
  return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
}

async function generateWordWithGemini(): Promise<WordData> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey.trim() === '') {
    console.log('[SERVER] No Gemini API key, using fallback');
    return getRandomFallbackWord();
  }

  try {
    const genAI = new GoogleGenAI({ apiKey });
    const prompt = `Generate a single random word suitable for a social deduction game. The word should be:
- A concrete noun (not abstract)
- Easy to describe without saying it directly
- Common enough that most people know it
- One or two words maximum
- From categories like: technology, food, professions, locations, vehicles, animals, objects

Respond ONLY with the word in UPPERCASE, followed by a pipe character, then the category in UPPERCASE.
Example format: PIZZA|FOOD
Do not include any other text.`;

    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt
    });
    const text = result.text?.trim() || '';
    
    const parts = text.split('|');
    if (parts.length === 2) {
      return {
        word: parts[0].trim().toUpperCase(),
        category: parts[1].trim().toUpperCase()
      };
    } else {
      throw new Error('Invalid response format from Gemini');
    }
  } catch (error) {
    console.error('[SERVER] Gemini API failed, using fallback:', error);
    return getRandomFallbackWord();
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/generate-word', async (req, res) => {
    try {
      const wordData = await generateWordWithGemini();
      res.json(wordData);
    } catch (error) {
      console.error('[SERVER] Word generation error:', error);
      res.json(getRandomFallbackWord());
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
