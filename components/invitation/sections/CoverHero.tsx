"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingPetals } from "@/components/landing/FloatingPetals";
import { MandalaBg } from "@/components/ornaments/MandalaBg";
import { FloralBorder } from "@/components/ornaments/FloralBorder";
import { WeddingFormData } from "@/types/wedding";
import { formatWeddingDate } from "@/lib/formatDate";

interface CoverHeroProps {
  data: WeddingFormData;
  themeColors: { primary: string; accent: string; dark: string };
  isPreview?: boolean;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

function AnimatedName({ name, color, className }: { name: string; color: string; className?: string }) {
  return (
    <span className={`inline-block ${className || ""}`}>
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
            delay: 0.5 + i * 0.04,
          }}
          className="inline-block font-script"
          style={{ color, textShadow: `0 2px 16px ${color}60` }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function CoverHero({ data, themeColors, isPreview = false }: CoverHeroProps) {
  const mainEventDate = data.events[0]?.date;
  const couplePhoto =
    data.couplePhoto ||
    "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=1200&q=80";

  return (
    <section className="relative min-h-screen-dynamic w-full overflow-hidden">
      {/* Background */}
      <Image
        src={couplePhoto}
        alt={`${data.brideName} and ${data.groomName}`}
        fill
        priority
        className="object-cover object-center z-0"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(to bottom, ${themeColors.dark}90 0%, ${themeColors.primary}30 40%, ${themeColors.dark}e8 100%)`,
        }}
      />

      {!isPreview && <MandalaBg color={themeColors.accent} />}
      {!isPreview && <FloatingPetals color={`${themeColors.primary}b3`} />}

      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 z-[3] opacity-50">
        <FloralBorder color={themeColors.accent} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen-dynamic flex items-center justify-center py-16 sm:py-20 md:py-24">
        <motion.div
          className="text-center w-full max-w-lg mx-auto px-5 sm:px-6"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Blessings */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-white/60"
          >
            With the blessings of
          </motion.p>

          {/* Family names */}
          {(data.brideFamily || data.groomFamily) && (
            <motion.p
              variants={fadeUp}
              className="font-serif italic text-[12px] sm:text-[14px] md:text-[16px] text-white/65 mt-1"
            >
              {data.groomFamily}
              {data.brideFamily && data.groomFamily && "  ·  "}
              {data.brideFamily}
            </motion.p>
          )}

          {/* Decorative divider */}
          <motion.div
            variants={fadeUp}
            className="my-2 text-[14px] sm:text-[16px] text-center opacity-60"
            style={{ color: themeColors.accent }}
          >
            ✦ ——— ✦
          </motion.div>

          {/* Bride Name */}
          <motion.div variants={fadeUp} className="leading-[1.05]">
            <AnimatedName
              name={data.brideName || "Bride"}
              color={themeColors.accent}
              className="text-[38px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[100px]"
            />
          </motion.div>

          {/* & symbol */}
          <motion.p
            variants={fadeUp}
            className="font-serif italic text-white/45 text-[24px] sm:text-[30px] md:text-[40px] leading-none my-0.5 sm:my-1"
          >
            &amp;
          </motion.p>

          {/* Groom Name */}
          <motion.div variants={fadeUp} className="leading-[1.05]">
            <AnimatedName
              name={data.groomName || "Groom"}
              color={themeColors.accent}
              className="text-[38px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[100px]"
            />
          </motion.div>

          {/* Are getting married */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] sm:text-[11px] md:text-[13px] text-white/60 tracking-[0.2em] uppercase mt-2 sm:mt-3"
          >
            are getting married
          </motion.p>

          {/* Couple photo circle */}
          <motion.div
            variants={fadeUp}
            className="relative mx-auto mt-4 sm:mt-5 mb-3 sm:mb-4"
            style={{ width: "fit-content" }}
          >
            {/* Dashed outer ring */}
            <div
              className="absolute rounded-full border border-dashed animate-spin-slower"
              style={{
                borderColor: `${themeColors.accent}50`,
                width: "calc(100% + 36px)",
                height: "calc(100% + 36px)",
                top: "-18px",
                left: "-18px",
              }}
            />
            {/* Photo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" as const, delay: 0.9 }}
              className="relative w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px] lg:w-[190px] lg:h-[190px] rounded-full overflow-hidden border-[2px] sm:border-[3px] md:border-4"
              style={{
                borderColor: themeColors.accent,
                boxShadow: `inset 0 0 16px ${themeColors.primary}40`,
              }}
            >
              <Image
                src={couplePhoto}
                alt="Couple"
                fill
                className="object-cover object-top"
                sizes="(max-width: 375px) 90px, (max-width: 768px) 110px, (max-width: 1024px) 150px, 190px"
              />
            </motion.div>
          </motion.div>

          {/* Date pill */}
          {mainEventDate && (
            <motion.div variants={fadeUp}>
              <span className="inline-block glass rounded-full px-3 sm:px-5 py-1 sm:py-1.5 font-serif text-[13px] sm:text-[15px] md:text-[18px] text-white">
                {formatWeddingDate(mainEventDate)}
              </span>
            </motion.div>
          )}

          {/* Custom message */}
          {data.customMessage && (
            <motion.div
              variants={fadeUp}
              className="mt-3 sm:mt-4 max-w-xs sm:max-w-sm mx-auto glass rounded-xl sm:rounded-2xl p-3 sm:p-4"
            >
              <p className="font-serif italic text-[13px] sm:text-[14px] md:text-[17px] text-white/75 text-center leading-relaxed">
                {data.customMessage}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] opacity-50">
        <FloralBorder color={themeColors.accent} flip />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 text-center animate-bounce-slow">
        <span className="block text-white/40 text-lg">↓</span>
        <span className="font-sans text-[10px] text-white/40">Scroll</span>
      </div>
    </section>
  );
}
