"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getCountdown } from "@/lib/formatDate";
import { FloralBorder } from "@/components/ornaments/FloralBorder";
import { ConfettiEffect } from "@/components/ui/ConfettiEffect";

interface CountdownTimerProps {
  weddingDate: string;
  themeColors: { primary: string; accent: string; dark: string };
  isPreview?: boolean;
}

export function CountdownTimer({ weddingDate, themeColors, isPreview = false }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(getCountdown(weddingDate));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const boxes = [
    { value: countdown.days, label: "Days" },
    { value: countdown.hours, label: "Hours" },
    { value: countdown.minutes, label: "Minutes" },
    { value: countdown.seconds, label: "Seconds" },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: themeColors.dark }}>
      <div className="opacity-30">
        <FloralBorder color={themeColors.accent} />
      </div>

      <div className="py-10 sm:py-14 md:py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-3xl mx-auto"
        >
          {countdown.isOver ? (
            <>
              <h2
                className="font-script text-[32px] sm:text-[40px] md:text-[52px] text-center"
                style={{ color: themeColors.accent }}
              >
                Today Is The Day! 🎊
              </h2>
              {!isPreview && (
                <ConfettiEffect
                  trigger={countdown.isOver && inView}
                  colors={[themeColors.primary, themeColors.accent, "#ffffff"]}
                />
              )}
            </>
          ) : (
            <>
              <h2
                className="font-script text-[28px] sm:text-[34px] md:text-[44px] mb-1 sm:mb-2"
                style={{ color: themeColors.accent }}
              >
                The Big Day Is Almost Here
              </h2>
              <p className="font-serif text-[13px] sm:text-[14px] md:text-[16px] text-white/50 mb-6 sm:mb-8 md:mb-10">
                Counting down every moment
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-md md:max-w-3xl mx-auto">
                {boxes.map((box) => (
                  <div
                    key={box.label}
                    className="rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-7"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderTop: `2px solid ${themeColors.accent}50`,
                    }}
                  >
                    <div
                      className="font-serif text-[28px] sm:text-[36px] md:text-[52px] lg:text-[64px] text-center leading-none"
                      style={{ color: themeColors.accent }}
                    >
                      {String(box.value).padStart(2, "0")}
                    </div>
                    <div className="font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-white/40 text-center mt-1">
                      {box.label}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div className="opacity-30">
        <FloralBorder color={themeColors.accent} flip />
      </div>
    </section>
  );
}
