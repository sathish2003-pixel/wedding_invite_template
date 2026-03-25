"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("../Lightbox").then((m) => m.Lightbox), {
  ssr: false,
});

interface PhotoGalleryProps {
  photos: string[];
  themeColors: { primary: string; accent: string; bg: string };
}

export function PhotoGallery({ photos, themeColors }: PhotoGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 md:py-16" style={{ backgroundColor: themeColors.bg }} ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2
            className="font-script text-[28px] sm:text-[34px] md:text-[44px] lg:text-[52px]"
            style={{ color: themeColors.primary }}
          >
            Captured Moments
          </h2>
          <p className="font-serif italic text-[14px] sm:text-[16px] md:text-[20px] text-gray-400 mt-1">
            A glimpse of our journey together
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-[10px] md:gap-[16px]">
          {photos.map((photo, i) => (
            <motion.div
              key={`photo-${i}`}
              className="break-inside-avoid mb-[10px] md:mb-[16px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className="relative overflow-hidden rounded-[16px] md:rounded-[20px] cursor-pointer group"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={photo}
                  alt={`Gallery photo ${i + 1}`}
                  width={400}
                  height={i % 3 === 0 ? 500 : i % 3 === 1 ? 400 : 350}
                  className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-[1.03] group-hover:brightness-[1.08]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 rounded-[16px] md:rounded-[20px] pointer-events-none"
                  style={{ borderColor: themeColors.primary }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </section>
  );
}
