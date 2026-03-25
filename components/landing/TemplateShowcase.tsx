"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const templates = [
  {
    id: 1,
    name: "Rose Garden",
    desc: "Romantic florals with warm rose gold tones. Our most loved template.",
    color: "#B76E79",
    image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=400&q=80",
    popular: true,
  },
  {
    id: 2,
    name: "Royal Indigo",
    desc: "Mughal-inspired royal aesthetic with navy and gold accents.",
    color: "#1B3A6B",
    image: "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?w=400&q=80",
    popular: false,
  },
  {
    id: 3,
    name: "Emerald Tradition",
    desc: "South Indian traditional design with kolam patterns and gold.",
    color: "#2D5A27",
    image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?w=400&q=80",
    popular: false,
  },
  {
    id: 4,
    name: "Midnight Glamour",
    desc: "Modern dark luxury for the contemporary urban couple.",
    color: "#1A1A2E",
    image: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?w=400&q=80",
    popular: false,
  },
  {
    id: 5,
    name: "Blush Romance",
    desc: "Light, airy, and romantic with botanical illustrations.",
    color: "#E8739A",
    image: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?w=400&q=80",
    popular: false,
  },
  {
    id: 6,
    name: "Saffron Festival",
    desc: "Vibrant and festive for large, joyful celebrations.",
    color: "#FF6B35",
    image: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?w=400&q=80",
    popular: false,
  },
];

export function TemplateShowcase() {
  return (
    <section id="templates" className="py-16 md:py-20 bg-[#FDF6F0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-landing-section text-[#2C1810] text-center">
          Choose Your Dream Template
        </h2>
        <p className="font-sans text-[16px] text-gray-500 text-center mt-3 mb-12">
          6 handcrafted designs for every style of Indian wedding
        </p>

        {/* Mobile: horizontal scroll / Desktop: 3-col grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto snap-scroll pb-4 md:pb-0">
          {templates.map((tpl) => (
            <Link key={tpl.id} href={`/builder?template=${tpl.id}`}>
              <motion.div
                className="relative min-w-[240px] md:min-w-0 rounded-[20px] overflow-hidden bg-white shadow-lg cursor-pointer group snap-start"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* Popular badge */}
                {tpl.popular && (
                  <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-sans text-[11px] font-semibold rounded-full px-3 py-1">
                    Most Popular
                  </div>
                )}

                {/* Image area - 60% */}
                <div className="relative aspect-[3/4]">
                  <Image
                    src={tpl.image}
                    alt={`${tpl.name} template preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: tpl.color, opacity: 0.25 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="font-script text-[28px] text-white">
                      Rahul ♡ Priya
                    </span>
                  </div>
                </div>

                {/* Info area - 40% */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-[20px] font-bold text-[#2C1810]">
                      {tpl.name}
                    </h3>
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tpl.color }}
                    />
                  </div>
                  <p className="font-sans text-[13px] text-gray-500 line-clamp-2">
                    {tpl.desc}
                  </p>
                </div>

                {/* Hover CTA */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white text-center py-3 font-sans font-semibold rounded-b-[20px]">
                  Use This Template →
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
