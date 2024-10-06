"use client";

import { useState, DragEvent, FormEvent, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export const Upload = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file: File | null = e.dataTransfer.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageData(reader.result as string);
      reader.readAsDataURL(file);
    }
    setIsDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageData) return;
    setIsUploading(true);
    setStatus("Przetwarzanie...");

    try {
      // Wywołanie API
      const response = await fetch("/api/processImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData }),
      });

      const result = await response.json();
      if (result?.parsedData) {
        setStatus(`Przetworzone dane: ${JSON.stringify(result.parsedData)}`);
      } else {
        setStatus("Przetwarzanie się nie udało.");
      }
    } catch (error) {
      console.error("Błąd przetwarzania obrazu: ", error);
      setStatus("Błąd przetwarzania.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        className={`${
          isDragActive
            ? "bg-slate-200 border-slate-800"
            : "bg-slate-50 border-slate-400"
        } min-h-[10rem] flex flex-col items-center justify-center gap-10 `}
      >
        <h2>Załaduj zdjęcie formularza</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          ref={inputFileRef}
        />
        {imageData && (
          <div>
            <Image
              src={imageData}
              alt="Uploaded Image"
              width={100}
              height={100}
            />
          </div>
        )}
        <Button type="submit" disabled={!imageData || isUploading}>
          {isUploading ? "Przetwarzanie..." : "Przetwórz zdjęcie na tekst"}
        </Button>
      </form>
      <p>
        <small>*Akceptowane formaty plików: JPG, PNG, JPEG</small>
      </p>
      {status && <p>{status}</p>}
    </div>
  );
};
