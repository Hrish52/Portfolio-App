import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import * as cheerio from "cheerio"; // ✅ Fixed import

const MODEL = "gemini-2.0-flash";
let _SYSTEM_PROMPT = null;

// Fetch and extract site text from live site
async function getSiteContent() {
  try {
    const res = await fetch("https://hrishikesh-dhole.vercel.app", {
      headers: { "User-Agent": "PortfolioBot" }
    });
    const html = await res.text();

    const $ = cheerio.load(html);
    const text = $("body").text().replace(/\s+/g, " ").trim();

    return text.slice(0, 5000); // Limit size for prompt safety
  } catch (err) {
    console.warn("⚠️ Failed to fetch site content:", err.message);
    return "(Website content could not be loaded.)";
  }
}

// Combine Docs.json and live site text into a single prompt
async function buildSystemPrompt() {
  if (_SYSTEM_PROMPT) return _SYSTEM_PROMPT;

  const jsonPath = path.join(process.cwd(), "context", "Docs.json");
  const raw = await fs.readFile(jsonPath, "utf8");
  const siteText = await getSiteContent();

  _SYSTEM_PROMPT = `
You are Hrishikesh’s portfolio assistant.
Answer ONLY using the context from the documents and website snapshot.
If the answer isn't found there, reply: “I don’t know from the provided docs.”

===== DOCUMENTS START =====
${raw}
===== DOCUMENTS END =====

===== WEBSITE SNAPSHOT =====
${siteText}
===== END WEBSITE SNAPSHOT =====
`.trim();

  console.log("📝 System prompt preview:", _SYSTEM_PROMPT.slice(0, 300), "…");
  return _SYSTEM_PROMPT;
}

export async function POST(req) {
  try {
    const { messages = [] } = await req.json();
    const systemPrompt = await buildSystemPrompt();

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