import { processImage } from "@/app/actions/processImage";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageData } = await req.json();
    const response = await processImage(imageData);
    
    return NextResponse.json({ parsedData: response.parsedData });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
