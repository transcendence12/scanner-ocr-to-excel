import { recognizeTextFromBuffer } from "@/utils/openAiHandler"; // Importujemy nasz handler OpenAI
import { removeSensitiveData, parseFormData } from "@/utils/removeSensitiveData"; // Narzędzia do przetwarzania danych

export async function processImage(imageData: string) {
  const imageBuffer = Buffer.from(imageData.split(",")[1], "base64");

  try {
    // Wywołanie funkcji OCR (OpenAI)
    const rawText = await recognizeTextFromBuffer(imageBuffer);

    // Usunięcie danych wrażliwych (np. PESEL)
    const cleanedText = removeSensitiveData(rawText);
    console.log(cleanedText)
    // Parsowanie danych z formularza
    const parsedData = parseFormData(cleanedText);
    console.log(parsedData)

    return { parsedData };
  } catch (error) {
    console.error("Error processing image:", error);
    return { parsedData: null };
  }
}
