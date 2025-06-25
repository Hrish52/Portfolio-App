// app/api/chat/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MODEL = "gemini-2.0-flash";
let _SYSTEM_PROMPT = null;

async function buildSystemPrompt() {
  if (_SYSTEM_PROMPT) return _SYSTEM_PROMPT;

  const jsonPath = path.join(process.cwd(), "context", "Docs.json");
  const raw = await fs.readFile(jsonPath, "utf8");

  _SYSTEM_PROMPT = `
You are Hrishikesh’s portfolio assistant.
Answer ONLY from the documents below.
If the answer isn't found there, reply: “I don’t know from the provided docs.”

===== DOCUMENTS START =====
${raw}
===== DOCUMENTS END =====
`.trim();

  console.log("📝 System prompt preview:", _SYSTEM_PROMPT.slice(0, 300), "…");
  return _SYSTEM_PROMPT;
}

export async function POST(req) {
  try {
    const { messages = [] } = await req.json();
    const systemPrompt = await buildSystemPrompt();

    // Only the final user query matters — combine it with system prompt
    const lastUserMessage = messages.filter(m => m.sender === "user").pop()?.text || "Hello";
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${lastUserMessage}`;

    const contents = [{ role: "user", parts: [{ text: fullPrompt }] }];

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      }
    );

    if (!resp.ok) {
      const body = await resp.text();
      console.error("❌ Gemini error", resp.status, body);
      return NextResponse.json({ reply: "❌ Gemini API error." }, { status: 500 });
    }

    const data = await resp.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I don’t know from the provided docs.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("🛠 Chat route error:", err);
    return NextResponse.json({ reply: "❌ Server error." }, { status: 500 });
  }
}