import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse/lib/pdf-parse.js"; // ✅ safe ESM import

async function extractTextFromPDF(pdfPath) {
  const buffer = await fs.readFile(pdfPath);
  const data = await pdfParse(buffer);
  return data.text;
}

async function main() {
  // ✅ Adjusted for your actual path: public/docs/
  const resumePath = path.join(process.cwd(), "public", "docs", "resume_hrishikesh_dhole_DS.pdf");
  const sopPath = path.join(process.cwd(), "public", "docs", "Statement Of Purpose.pdf");

  // Extract and clean text
  const resumeText = await extractTextFromPDF(resumePath);
  const sopText = await extractTextFromPDF(sopPath);

  const jsonData = {
    resume_ds: resumeText.replace(/\s+/g, " ").trim(),
    sop: sopText.replace(/\s+/g, " ").trim(),
  };

  // ✅ Save to /context/Docs.json
  const outputDir = path.join(process.cwd(), "context");
  const outputPath = path.join(outputDir, "Docs.json");

  try {
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2));
    console.log("✅ Docs.json successfully created at:", outputPath);
  } catch (err) {
    console.error("❌ Failed to write Docs.json:", err);
  }
}

main().catch(console.error);
