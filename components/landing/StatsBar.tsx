"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { number: 10000, suffix: "+", label: "Invitations Created" },
  { number: 6, suffix: "", label: "Premium Templates" },
  { number: 999, suffix: "", label: "One-time Price", prefix: "₹" },
  { number: 4.9, suffix: "★", label: "Average Rating", isDecimal: true },
];

function CountUp({
  target,
  prefix = "",
  suffix = "",
  isDecimal = false,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-serif text-[#D4A574]" style={{ fontSize: "clamp(32px, 5vw, 44px)" }}>
      {prefix}
      {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-[#2C1810] py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${
                i > 0 ? "md:border-l md:border-[#D4A574]/25" : ""
              }`}
            >
              <CountUp
                target={stat.number}
                prefix={stat.prefix}
                suffix={stat.suffix}
                isDecimal={stat.isDecimal}
              />
              <p className="font-sans text-[12px] md:text-[13px] text-white/55 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
