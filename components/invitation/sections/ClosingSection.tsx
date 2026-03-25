"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FloatingPetals } from "@/components/landing/FloatingPetals";
import { ConfettiEffect } from "@/components/ui/ConfettiEffect";
import { WeddingFormData } from "@/types/wedding";
import { getOrdinalDate } from "@/lib/formatDate";

interface ClosingSectionProps {
  data: WeddingFormData;
  themeColors: { primary: string; accent: string; dark: string };
  showWatermark?: boolean;
  isPreview?: boolean;
}

export function ClosingSection({ data, themeColors, showWatermark = true, isPreview = false }: ClosingSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const brideInitial = (data.brideName || "B")[0];
  const groomInitial = (data.groomName || "G")[0];
  const mainEventDate = data.events[0]?.date;

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16"
      style={{ backgroundColor: themeColors.dark }}
    >
      {/* Diamond pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-conic-gradient(${themeColors.accent} 0% 25%, transparent 0% 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      {!isPreview && <FloatingPetals color={`${themeColors.primary}80`} count={10} />}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-5 sm:px-6 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Monogram */}
        <h2
          className="font-script text-[48px] sm:text-[60px] md:text-[80px] lg:text-[100px]"
          style={{
            color: themeColors.accent,
            textShadow: `0 4px 30px ${themeColors.accent}50`,
          }}
        >
          {brideInitial} ♡ {groomInitial}
        </h2>

        {/* Wedding date */}
        {mainEventDate && (
          <p className="font-serif text-[15px] sm:text-[18px] md:text-[22px] text-white/55 mt-2 sm:mt-3">
            {getOrdinalDate(mainEventDate)}
          </p>
        )}

        {/* Message */}
        {data.customMessage && (
          <div className="relative max-w-sm sm:max-w-md mx-auto mt-4 sm:mt-5">
            <span
              className="absolute -top-4 -left-2 font-script text-[48px] sm:text-[60px] leading-none opacity-25"
              style={{ color: themeColors.accent }}
            >
              &ldquo;
            </span>
            <p className="font-serif italic text-[13px] sm:text-[15px] md:text-[18px] text-white/70 leading-[1.7]">
              {data.customMessage}
            </p>
            <span
              className="absolute -bottom-5 -right-2 font-script text-[48px] sm:text-[60px] leading-none opacity-25"
              style={{ color: themeColors.accent }}
            >
              &rdquo;
            </span>
          </div>
        )}

        {/* Hashtag */}
        {data.hashtag && (
          <p
            className="font-sans text-[13px] sm:text-[14px] md:text-[16px] tracking-[0.12em] mt-6 cursor-pointer"
            style={{ color: themeColors.accent }}
          >
            {data.hashtag}
          </p>
        )}

        {/* Blessings */}
        <p className="font-sans text-[12px] sm:text-[13px] md:text-[14px] text-white/45 mt-4 sm:mt-5">
          We look forward to your presence and blessings 🙏
        </p>

        {/* Divider */}
        <div
          className="w-16 h-px mx-auto my-4 sm:my-5"
          style={{ backgroundColor: themeColors.accent }}
        />

        {/* Watermark */}
        {showWatermark && (
          <p className="font-sans text-[10px] sm:text-[11px] text-white/20">
            Made with ShaadiPage ❤️
          </p>
        )}
      </motion.div>

      {!isPreview && (
        <ConfettiEffect
          trigger={inView}
          colors={[themeColors.primary, themeColors.accent, "#ffffff"]}
          particleCount={80}
        />
      )}
    </section>
  );
}
