"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface LoveStoryProps {
  story: string;
  hashtag?: string;
  themeColors: { primary: string; accent: string; dark: string };
}

export function LoveStory({ story, hashtag, themeColors }: LoveStoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!story) return null;

  const paragraphs = story.split(/\n\n|\n/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="py-10 sm:py-14 md:py-20 relative"
      style={{
        background: `linear-gradient(135deg, ${themeColors.dark} 0%, ${themeColors.dark}dd 100%)`,
      }}
    >
      {/* Diamond pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-conic-gradient(${themeColors.accent} 0% 25%, transparent 0% 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-lg md:max-w-2xl mx-auto px-5 sm:px-6 text-center">
        {/* Large quote */}
        <div
          className="absolute top-2 left-4 sm:left-6 font-script text-[100px] sm:text-[140px] md:text-[180px] leading-none opacity-[0.06] pointer-events-none"
          style={{ color: themeColors.accent }}
        >
          &ldquo;
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-script relative z-10 text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px]"
          style={{ color: themeColors.accent }}
        >
          Our Story
        </motion.h2>

        <div className="mt-5 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5">
          {paragraphs.map((para, i) => (
            <motion.div key={i}>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="font-serif italic text-[15px] sm:text-[17px] md:text-[20px] text-white/78 text-center leading-[1.8] max-w-md md:max-w-xl mx-auto"
              >
                {para}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {hashtag && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="font-sans text-[13px] sm:text-[14px] md:text-[15px] mt-6 cursor-pointer"
            style={{ color: themeColors.accent }}
          >
            {hashtag}
          </motion.p>
        )}
      </div>
    </section>
  );
}
