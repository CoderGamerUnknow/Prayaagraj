import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: 'Find the exact menu prices for Cafe Potoba in Ilupeju, Lagos. Specifically look for Vada Pav, Misal Pav, Thali, Sabudana Vada, and Chai.',
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  console.log(response.text);
}
run();
