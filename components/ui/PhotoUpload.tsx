"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface PhotoUploadProps {
  onUpload: (dataUrl: string) => void;
  currentPhoto?: string;
  label?: string;
  shape?: "circle" | "square";
  size?: "sm" | "md" | "lg";
}

export function PhotoUpload({
  onUpload,
  currentPhoto,
  label = "Upload Photo",
  shape = "square",
  size = "md",
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-28 h-28 sm:w-32 sm:h-32",
    lg: "w-36 h-36 sm:w-44 sm:h-44",
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) return; // 10MB max

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) onUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          relative ${sizeClasses[size]} overflow-hidden cursor-pointer
          transition-all duration-200 group
          ${shape === "circle" ? "rounded-full" : "rounded-xl"}
          ${dragging
            ? "border-2 border-[#B76E79] bg-[#B76E79]/10"
            : currentPhoto
              ? "border-2 border-[#B76E79]/50"
              : "border-2 border-dashed border-white/20 hover:border-[#B76E79]/50"
          }
        `}
      >
        {currentPhoto ? (
          <>
            <Image
              src={currentPhoto}
              alt="Uploaded"
              fill
              className="object-cover"
              sizes="176px"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[12px] font-sans font-medium">Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-white/40 text-[10px] sm:text-[11px] font-sans mt-1 text-center leading-tight">
              {label}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
