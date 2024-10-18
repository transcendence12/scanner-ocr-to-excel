import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Definiowanie schematu odpowiedzi
const transcriptionSchema = z.object({
  text: z.string(), // Oczekujemy, że AI zwróci przetworzony tekst z obrazu
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key");
}

export async function extractTextFromImage(
  imageData: string
): Promise<{ text: string }> {
  try {
    // Generowanie obiektu na podstawie promptu i schematu
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      temperature: 0.3,
      maxTokens: 300,
      maxRetries: 2,
      schema: transcriptionSchema, // Schemat odpowiedzi
      prompt: `Przeczytaj tekst z obrazka, który jest pisany ręcznie w języku polskim: ${imageData}`,
      // temperature: 1,
      // maxTokens: 300,
      // maxRetries: 2,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // response_format: {
      //   type: "text",
      // },
    });

    return object; // Zwracamy przetworzony tekst jako obiekt
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to process image.");
  }
}
