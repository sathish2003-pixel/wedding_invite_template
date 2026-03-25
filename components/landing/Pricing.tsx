"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  symbol: string;
  features: PlanFeature[];
  cta: string;
  ctaVariant: "outline" | "primary" | "dark";
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "0",
    symbol: "₹",
    features: [
      { text: "1 template (Rose Garden only)", included: true },
      { text: "Basic countdown timer", included: true },
      { text: "3 gallery photos max", included: true },
      { text: "ShaadiPage watermark shown", included: false },
      { text: "30 days active", included: true },
      { text: "No custom URL", included: false },
      { text: "No background music", included: false },
    ],
    cta: "Start Free",
    ctaVariant: "outline",
  },
  {
    name: "Premium",
    price: "999",
    symbol: "₹",
    popular: true,
    features: [
      { text: "All 6 premium templates", included: true },
      { text: "No ShaadiPage watermark", included: true },
      { text: "Custom URL slug", included: true },
      { text: "8 gallery photos", included: true },
      { text: "Background music (8 tracks)", included: true },
      { text: "1 year active", included: true },
      { text: "WhatsApp priority support", included: true },
    ],
    cta: "Get Premium",
    ctaVariant: "primary",
  },
  {
    name: "Premium Plus",
    price: "1,499",
    symbol: "₹",
    features: [
      { text: "All Premium features", included: true },
      { text: "RSVP collection system", included: true },
      { text: "Meal preference tracking", included: true },
      { text: "Guest list CSV export", included: true },
      { text: "Statistics dashboard", included: true },
      { text: "Lifetime active (never expires)", included: true },
      { text: "Priority phone support", included: true },
    ],
    cta: "Get Premium Plus",
    ctaVariant: "dark",
  },
];

const ctaStyles = {
  outline:
    "border-2 border-[#B76E79] text-[#B76E79] hover:bg-[#B76E79] hover:text-white",
  primary:
    "bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white hover:brightness-105",
  dark: "bg-[#2C1810] text-white hover:bg-[#3d2520]",
};

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-landing-section text-[#2C1810] text-center">
          Simple Pricing, No Surprises
        </h2>
        <p className="font-sans text-[16px] text-gray-500 text-center mt-3 mb-12">
          One-time payment. No subscription. Yours forever.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.12, type: "spring" }}
              className={`relative bg-white rounded-3xl p-8 shadow-lg ${
                plan.popular
                  ? "border-2 border-[#B76E79] lg:scale-105 z-10"
                  : "border border-gray-100"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-sans text-[12px] font-semibold rounded-full px-4 py-1">
                  MOST POPULAR
                </div>
              )}

              <h3 className="font-serif text-[22px] font-bold text-[#2C1810] text-center mb-2">
                {plan.name}
              </h3>
              <div className="text-center mb-6">
                <span className="font-serif text-[28px] text-[#B76E79]">
                  {plan.symbol}
                </span>
                <span
                  className="font-serif text-[#B76E79]"
                  style={{ fontSize: "clamp(48px, 7vw, 64px)" }}
                >
                  {plan.price}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-start gap-2 font-sans text-[14px] ${
                      f.included ? "text-gray-700" : "text-gray-400 line-through"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] mt-0.5 ${
                        f.included
                          ? "bg-[#B76E79]/15 text-[#B76E79]"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {f.included ? "✓" : "✗"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link
                href="/builder"
                className={`block text-center w-full py-3 rounded-full font-sans font-semibold text-[16px] transition-all duration-300 ${
                  ctaStyles[plan.ctaVariant]
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
