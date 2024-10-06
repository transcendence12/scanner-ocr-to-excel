import { Upload } from "@/components/Upload";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Upload />
      </main>
      <footer className="flex items-center justify-center">footer here</footer>
    </div>
  );
}
