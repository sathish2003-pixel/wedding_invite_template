"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { icon: "📝", title: "Fill Your Details", desc: "Add names, dates, venue, and your love story" },
  { icon: "🎨", title: "Choose Your Style", desc: "Pick from 6 gorgeous templates and color themes" },
  { icon: "💬", title: "Share With Everyone", desc: "Get your link and send to all guests via WhatsApp" },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #B76E79 0%, #D4A574 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-landing-section text-white text-center mb-12">
          Your Invitation in 3 Simple Steps
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Steps */}
          <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex-1 text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.2, type: "spring" }}
              >
                {/* Icon circle */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center text-[32px] shadow-lg">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2C1810] text-white font-sans text-[13px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                {/* Connecting dashes (between steps, hidden on mobile stack) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-9 left-full w-full border-t-2 border-dashed border-white/40" />
                )}

                <h3 className="font-serif text-[24px] text-white mt-5 mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] text-white/75">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Phone mockup — desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <div
              className="relative w-[220px] rounded-[2.5rem] border-[6px] border-[#1a1a1a] overflow-hidden"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
            >
              <div className="relative aspect-[9/19]">
                <Image
                  src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?w=1000&q=80"
                  alt="How ShaadiPage works"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
