"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

interface LightboxProps {
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function Lightbox({ photos, currentIndex, onClose, onChange }: LightboxProps) {
  const touchStart = useRef<number>(0);

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) onChange(currentIndex + 1);
  }, [currentIndex, photos.length, onChange]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onChange(currentIndex - 1);
  }, [currentIndex, onChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (diff > 50) goPrev();
    if (diff < -50) goNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/93 backdrop-blur-lg flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Counter */}
      <div className="fixed top-4 right-16 z-50 font-sans text-[14px] text-white/70">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/12 flex items-center justify-center text-white text-2xl hover:bg-rose-500 transition-colors"
      >
        ×
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-white text-xl"
        >
          ←
        </button>
      )}

      {/* Next button */}
      {currentIndex < photos.length - 1 && (
        <button
          onClick={goNext}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-white text-xl"
        >
          →
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-h-[85dvh] max-w-[92vw]"
        >
          <Image
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-h-[85dvh] w-auto object-contain rounded-2xl"
            sizes="92vw"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
