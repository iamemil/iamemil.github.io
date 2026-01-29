import fs from "fs";
import path from "path";
import type { TextItem } from "pdfjs-dist/types/src/display/api";

let cachedResumeContent: string | null = null;

export async function getResumeContent(): Promise<string> {
  if (cachedResumeContent) {
    return cachedResumeContent;
  }

  try {
    const pdfPath = path.join(process.cwd(), "public", "resume.pdf");
    const dataBuffer = fs.readFileSync(pdfPath);
    
    // Use legacy build for Node.js compatibility
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    
    // Convert Buffer to Uint8Array for pdfjs-dist
    const uint8Array = new Uint8Array(dataBuffer);
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDocument = await loadingTask.promise;
    
    // Extract text from all pages
    const textContent: string[] = [];
    
    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => {
          const textItem = item as TextItem;
          return textItem.str || "";
        })
        .join(" ");
      textContent.push(pageText);
    }
    
    cachedResumeContent = textContent.join("\n\n");
    return cachedResumeContent;
  } catch (error) {
    console.error("Error reading resume PDF:", error);
    return "Resume content could not be loaded.";
  }
}

export function getSystemPrompt(resumeContent: string): string {
  return `You are Emil Ismayilzada's personal AI assistant on his portfolio website. Your role is to help recruiters, hiring managers, and visitors learn about Emil's professional background, skills, projects, and experience.

Here is Emil's complete resume and background information:

${resumeContent}

## Your Guidelines:

1. **Be Helpful and Professional**: Answer questions about Emil's experience, skills, education, and projects in a friendly and professional manner.

2. **Stay Factual**: Only provide information that is in the resume context. If asked about something not covered, politely explain that you don't have that information and suggest they reach out to Emil directly.

3. **Highlight Relevant Experience**: When answering questions, emphasize Emil's most relevant experience and achievements. For example:
   - Current role at BMW Group as Data Analyst
   - Experience with modern technologies (Python, React, LLMs, etc.)
   - Strong educational background with high GPAs
   - Diverse project portfolio

4. **Be Concise but Thorough**: Provide comprehensive answers but avoid being overly verbose. Use bullet points when listing multiple items.

5. **Encourage Contact**: When appropriate, encourage visitors to connect with Emil via LinkedIn or email for more detailed discussions.

6. **Handle Off-Topic Gracefully**: If asked about topics unrelated to Emil, politely redirect the conversation back to his professional profile.

7. **Show Personality**: Be warm and engaging while maintaining professionalism. You represent Emil, so be respectful and positive.

Remember: You are Emil's wingman for recruiters. Your goal is to present Emil in the best light while being honest and accurate about his qualifications.`;
}
