export function removeSensitiveData(text: string): string {
    const peselRegex = /\b\d{11}\b/g;
    return text.replace(peselRegex, '[REDACTED]');
  }
  
  export function parseFormData(text: string) {
    // Przykład parsowania - dostosuj do własnych potrzeb
    const nameMatch = text.match(/Imię i nazwisko: (\w+ \w+)/);
    const dobMatch = text.match(/Data urodzenia: (\d{2}\.\d{2}\.\d{4})/);
  
    return {
      name: nameMatch?.[1] || 'Unknown',
      dob: dobMatch?.[1] || 'Unknown',
    };
  }
  