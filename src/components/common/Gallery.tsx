import { useState } from "react";
import { X } from "lucide-react";
import a from "@/assets/hero-livelihoods.jpg";
import b from "@/assets/hero-education.jpg";
import c from "@/assets/hero-agriculture.jpg";

const IMAGES = [
  { src: a, alt: "Women preparing preserved vegetables at a training workshop" },
  { src: b, alt: "Girls reading in a classroom" },
  { src: c, alt: "A woman farmer with harvested vegetables" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">Illustrative images — to be replaced with authorized PWSO photography.</p>
      <ul className="mb-10 grid gap-4 sm:grid-cols-3">
        {IMAGES.map((img, i) => (
          <li key={img.alt}>
            <button onClick={() => setOpen(i)} className="block overflow-hidden rounded-2xl" aria-label={`Open image: ${img.alt}`}>
              <img src={img.src} alt={img.alt} loading="lazy" width={1920} height={1088} className="aspect-[4/3] w-full object-cover transition hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && IMAGES[open] && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[70] grid place-items-center bg-navy/90 p-6" onClick={() => setOpen(null)}>
          <button className="absolute right-6 top-6 text-navy-foreground" aria-label="Close"><X className="h-7 w-7" /></button>
          <img src={IMAGES[open]!.src} alt={IMAGES[open]!.alt} className="max-h-[85vh] rounded-xl" />
        </div>
      )}
    </>
  );
}
