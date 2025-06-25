// lib/gemini.js
import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.0-flash'; // You can change to gemini-1.5-pro if needed

// Load context once from Docs.json
const ctxPath = path.join(process.cwd(), 'context', 'Docs.json');
let CONTEXT_TEXT = '';

try {
  const raw = await fs.readFile(ctxPath, 'utf8');
  CONTEXT_TEXT = `
You are Hrishikesh’s portfolio assistant.
Answer ONLY from the documents below.
If the answer isn't found there, reply: “I don’t know from the provided docs.”

===== DOCUMENTS START =====
${raw}
===== DOCUMENTS END =====
`.trim();
} catch (err) {
  console.warn('⚠️  Docs.json not found — continuing with empty context.');
}

/**
 * Ask Gemini with résumé + SOP context prepended.
 * @param {string} question – The end-user query
 * @returns {Promise<string>} Gemini’s response
 */
export async function askGemini(question) {
  const body = {
    contents: [
      { role: 'system', parts: [{ text: CONTEXT_TEXT }] },
      { role: 'user', parts: [{ text: question }] }
    ]
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    console.error(`❌ Gemini error ${res.status}`);
    throw new Error(`Gemini API error ${res.status}`);
  }

  const data = await res.json();
  const answer =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    'I don’t know from the provided docs.';

  return answer;
}
