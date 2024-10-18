import { NextResponse } from 'next/server';
import { z } from 'zod';
import { extractTextFromImage } from '@/utils/openAiHandler';
import { imageSchema } from '@/utils/zodSchemas';
import { removeSensitiveData, parseFormData } from '@/utils/removeSensitiveData'; // Przeniesione funkcje

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Walidacja danych wejściowych
    const data = imageSchema.parse(body);

    // Przetwarzanie obrazu i wyciąganie tekstu za pomocą OpenAI
    const { text: rawText } = await extractTextFromImage(data.imageData);

    // Usunięcie danych wrażliwych (np. PESEL)
    const cleanedText = removeSensitiveData(rawText);

    // Parsowanie danych z formularza
    const parsedData = parseFormData(cleanedText);

    return NextResponse.json({ parsedData }); // Zwrócenie przetworzonych danych formularza
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
