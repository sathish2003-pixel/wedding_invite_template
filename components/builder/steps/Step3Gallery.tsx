"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Button } from "@/components/ui/Button";

const couplePhotos = [
  "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=800&q=80",
  "https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?w=800&q=80",
  "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?w=800&q=80",
  "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=800&q=80",
  "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?w=800&q=80",
  "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?w=800&q=80",
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?w=800&q=80",
];

const venuePhotos = [
  "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?w=1200&q=80",
  "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?w=1200&q=80",
  "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?w=800&q=80",
  "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?w=600&q=80",
];

type Tab = "upload" | "couple" | "venue";

export function Step3Gallery() {
  const store = useBuilderStore();
  const [tab, setTab] = useState<Tab>("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isFull = store.gallery.length >= 8;

  const presetPhotos = tab === "couple" ? couplePhotos : tab === "venue" ? venuePhotos : [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/") || store.gallery.length >= 8) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result && store.gallery.length < 8) {
          store.togglePhoto(result);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-5">
      <h3 className="font-serif text-[24px] text-white mb-2">📸 Photo Gallery</h3>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            { id: "upload" as Tab, label: "📤 Upload" },
            { id: "couple" as Tab, label: "💑 Couples" },
            { id: "venue" as Tab, label: "🏛 Venues" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3.5 py-1.5 rounded-full font-sans text-[13px] transition-all ${
              tab === t.id
                ? "bg-[#B76E79] text-white"
                : "bg-transparent border border-white/20 text-white/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Counter */}
      <p className="font-sans text-[13px] text-[#D4A574] text-center">
        {store.gallery.length} / 8 photos selected
      </p>

      {/* Upload tab */}
      {tab === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isFull}
            className={`w-full py-8 rounded-xl border-2 border-dashed transition-all flex flex-col items-center gap-2 ${
              isFull
                ? "border-white/10 opacity-40 cursor-not-allowed"
                : "border-[#B76E79]/30 hover:border-[#B76E79]/60 hover:bg-[#B76E79]/5 cursor-pointer"
            }`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(183,110,121,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="font-sans text-[14px] text-[#B76E79]/80">
              {isFull ? "Gallery full (8/8)" : "Click to upload photos"}
            </span>
            <span className="font-sans text-[11px] text-white/30">
              JPG, PNG up to 10MB each. Select multiple.
            </span>
          </button>
        </div>
      )}

      {/* Preset photo grids */}
      {tab !== "upload" && (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {presetPhotos.map((photo) => {
            const isSelected = store.gallery.includes(photo);
            const isDisabled = isFull && !isSelected;

            return (
              <button
                key={photo}
                type="button"
                onClick={() => store.togglePhoto(photo)}
                disabled={isDisabled}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                  isSelected
                    ? "border-2 border-[#B76E79]"
                    : isDisabled
                      ? "opacity-40 cursor-not-allowed"
                      : "border border-white/10 hover:border-white/25"
                }`}
              >
                <Image
                  src={photo}
                  alt="Gallery option"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#B76E79]/30 flex items-center justify-center">
                    <span className="text-white text-[28px]">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Selected thumbnails row */}
      {store.gallery.length > 0 && (
        <div>
          <label className="block font-sans text-[11px] uppercase tracking-wider text-white/40 mb-2">
            Selected Photos
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {store.gallery.map((photo, i) => (
              <div
                key={`${photo.slice(0, 40)}-${i}`}
                className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-[#B76E79]/50 flex-shrink-0 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => store.togglePhoto(photo)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition-opacity"
                >
                  ×
                </button>
                <span className="absolute bottom-0.5 right-1 font-sans text-[9px] text-white/70 bg-black/50 px-1 rounded">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" fullWidth onClick={() => store.setStep(2)}>
          ← Back
        </Button>
        <Button fullWidth onClick={() => store.setStep(4)}>
          Next: Design →
        </Button>
      </div>
    </div>
  );
}
