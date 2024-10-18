// Funkcja do usuwania danych wrażliwych, takich jak PESEL
export function removeSensitiveData(text: string): string {
  const peselRegex = /\b\d{11}\b/g; // Przykładowy regex dla PESEL
  return text.replace(peselRegex, '[REMOVED]');
}

// Funkcja do parsowania danych z formularza (np. student names, birth dates)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFormData(text: string): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsedData: Record<string, any> = {};

  // Dodaj logikę parsowania na podstawie tekstu formularza
  // Przykład: podziel tekst na linie i przetwórz odpowiednio
  const lines = text.split('\n');
  lines.forEach((line) => {
    const [key, value] = line.split(':');
    if (key && value) {
      parsedData[key.trim()] = value.trim();
    }
  });

  return parsedData;
}

  