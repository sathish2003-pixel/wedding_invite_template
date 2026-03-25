"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingPetals } from "./FloatingPetals";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export function Hero() {
  return (
    <section className="relative h-screen-dynamic w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=1600&q=80"
        alt="Wedding celebration"
        fill
        priority
        className="object-cover object-center z-0"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(44,24,16,0.85) 0%, rgba(183,110,121,0.55) 50%, rgba(44,24,16,0.92) 100%)",
        }}
      />

      {/* Floating petals */}
      <FloatingPetals />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center lg:items-center gap-12">
          {/* Left content */}
          <motion.div
            className="flex-1 text-center lg:text-left lg:max-w-[55%]"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-block glass rounded-full px-5 py-2 font-sans text-[13px] text-[#D4A574]">
                10,000+ Couples Chose ShaadiPage
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} className="font-serif text-landing-h1 text-white leading-[1.1]">
              Your Love Story,
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="font-script text-landing-h1-script text-[#D4A574] leading-[1.1]"
              style={{ textShadow: "0 2px 20px rgba(183,110,121,0.5)" }}
            >
              Beautifully Told
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="mt-6 font-sans text-[16px] md:text-[17px] text-white/85 max-w-[520px] mx-auto lg:mx-0"
            >
              Create a stunning digital wedding invitation in minutes.
              Share with your guests instantly via WhatsApp & Instagram.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/builder"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white px-8 py-4 rounded-full shadow-2xl font-sans text-[16px] font-semibold hover:scale-105 hover:brightness-105 transition-all duration-300"
              >
                Create Your Invitation →
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full font-sans text-[16px] hover:bg-white/10 transition-all duration-300"
              >
                See Live Example ↓
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.p
              variants={fadeUp}
              className="mt-6 font-sans text-[14px] text-white/65"
            >
              ⭐⭐⭐⭐⭐ Loved by 10,000+ couples across India
            </motion.p>
          </motion.div>

          {/* Phone mockup — desktop only */}
          <div className="hidden lg:block flex-shrink-0 lg:max-w-[45%]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="animate-float"
            >
              <div
                className="relative w-[280px] rounded-[3rem] border-[8px] border-[#1a1a1a] overflow-hidden"
                style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}
              >
                <div className="relative aspect-[9/19]">
                  <Image
                    src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=600&q=80"
                    alt="Wedding invitation preview"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 glass p-4 text-center">
                    <span className="font-script text-[28px] text-white">
                      Rahul ♡ Priya
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center animate-bounce-slow">
        <span className="block text-white/50 text-2xl">↓</span>
        <span className="font-sans text-[12px] text-white/50">Scroll to explore</span>
      </div>
    </section>
  );
}
