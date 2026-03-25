"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Priya & Rahul",
    city: "Mumbai",
    date: "Feb 2025",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=200&q=80",
    quote:
      "Our guests were amazed! Everyone said it was the most beautiful wedding invitation they had ever received. Worth every rupee.",
  },
  {
    name: "Ananya & Vikram",
    city: "New Delhi",
    date: "Jan 2025",
    image: "https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?w=200&q=80",
    quote:
      "Created our invitation in 15 minutes. The Royal Blue template was perfect for our North Indian wedding. Highly recommend!",
  },
  {
    name: "Meera & Arjun",
    city: "Chennai",
    date: "Mar 2025",
    image: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?w=200&q=80",
    quote:
      "The Emerald Tradition template with Tamil text was exactly what we wanted. Our families loved it. The countdown timer was a hit!",
  },
  {
    name: "Sneha & Karthik",
    city: "Bangalore",
    date: "Apr 2025",
    image: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?w=200&q=80",
    quote:
      "Shared it on WhatsApp and got calls from relatives saying how modern and beautiful it was. The RSVP feature saved us so much time!",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-[#FDF6F0] overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-landing-section text-[#2C1810] text-center mb-12">
          Couples Who Chose ShaadiPage
        </h2>

        <div className="flex md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 overflow-x-auto snap-scroll pb-4 md:pb-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="min-w-[280px] md:min-w-0 bg-white rounded-2xl p-6 shadow-md snap-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#B76E79] flex-shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="font-sans text-[15px] font-semibold text-[#2C1810]">
                    {t.name}
                  </p>
                  <p className="font-sans text-[12px] text-gray-400">
                    {t.city} · {t.date}
                  </p>
                </div>
              </div>
              <div className="text-[#D4A574] text-[14px] mb-3">⭐⭐⭐⭐⭐</div>
              <p className="font-serif italic text-[18px] text-[#2C1810] leading-[1.7]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
