// lib/contextLoader.js
import fs from "fs/promises";
import path from "path";

const CHARS_PER_CHUNK = 4000;
let _cachedChunks = null;

export async function getCtxChunks() {
  if (_cachedChunks) return _cachedChunks;

  // Load Docs.json from /context
  const file = path.join(process.cwd(), "context", "Docs.json");
  const raw = await fs.readFile(file, "utf8");
  const json = JSON.parse(raw); // { resume_ds: "...", sop: "..." }

  // Split each document into ~4k-char chunks
  _cachedChunks = Object.values(json).flatMap((text) => {
    const clean = text.replace(/\s+/g, " ").trim();
    const chunks = [];
    for (let i = 0; i < clean.length; i += CHARS_PER_CHUNK) {
      chunks.push(clean.slice(i, i + CHARS_PER_CHUNK));
    }
    return chunks;
  });

  return _cachedChunks;
}
