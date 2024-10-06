import { google } from 'googleapis';

const vision = google.vision('v1');
const apiKey = process.env.GOOGLE_VISION_API_KEY!;

export async function recognizeTextFromBuffer(imageBuffer: Buffer) {
  const request = {
    requests: [
      {
        image: {
          content: imageBuffer.toString('base64'),
        },
        features: [{ type: 'TEXT_DETECTION' }],
      },
    ],
  };

  const response = await vision.images.annotate({
    key: apiKey,
    requestBody: request,
  });

  const textAnnotations = response.data.responses?.[0]?.textAnnotations ?? [];
  const text = textAnnotations.map(annotation => annotation.description).join(' ');

  return text;
}

// const vision = require('@google-cloud/vision');

// // Tworzenie klienta
// const client = new vision.ImageAnnotatorClient();

// async function detectText(imagePath) {
//   const [result] = await client.textDetection(imagePath);
//   const detections = result.textAnnotations;
//   console.log('Text:');
//   detections.forEach(text => console.log(text.description));
// }

// // Przykład użycia
// detectText('path/to/your/image.jpg');

