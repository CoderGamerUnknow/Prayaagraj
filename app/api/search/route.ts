import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: 'Find the exact menu prices for Cafe Potoba in Ilupeju, Lagos. Specifically look for Vada Pav, Misal Pav, Thali, Sabudana Vada, and Chai.',
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
