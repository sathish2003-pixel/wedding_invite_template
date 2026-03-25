"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "🎨",
    title: "6 Premium Templates",
    desc: "Crafted by designers for Indian weddings. Rose Garden, Royal Indigo, Emerald Tradition & more.",
  },
  {
    icon: "⚡",
    title: "Instant Live Preview",
    desc: "See your invitation update in real-time as you fill in each detail.",
  },
  {
    icon: "📱",
    title: "Mobile First Design",
    desc: "Looks stunning on every phone. Perfect for WhatsApp sharing.",
  },
  {
    icon: "⏳",
    title: "Live Countdown Timer",
    desc: "A beautiful real-time countdown to your wedding day on every invite.",
  },
  {
    icon: "🌐",
    title: "Free Custom URL",
    desc: "Get your own: shaadipage.vercel.app/rahul-weds-priya",
  },
  {
    icon: "💬",
    title: "One-tap WhatsApp Share",
    desc: "Pre-filled message ready to send to all your guests instantly.",
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-landing-section text-[#2C1810] text-center">
          Everything for the Perfect Digital Invite
        </h2>
        <p className="font-sans text-[16px] text-gray-500 text-center mt-3 mb-12">
          Crafted specifically for Indian weddings
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] flex items-center justify-center text-[28px] mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif text-[20px] font-bold text-[#2C1810] mb-2">
                {feature.title}
              </h3>
              <p className="font-sans text-[14px] text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
