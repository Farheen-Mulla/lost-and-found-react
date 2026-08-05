import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateVerificationQuestion(name, desc) {
  const prompt = `An item was reported in a lost-and-found app.
Item name: ${name}
Description: ${desc}

Write ONE short clarifying question that would help verify someone
claiming this item is genuine — something specific to this item that
a stranger wouldn't easily guess (e.g. a small detail, mark, or content).
Respond with ONLY the question text, nothing else — no quotes, no labels.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return response.text.trim();
}