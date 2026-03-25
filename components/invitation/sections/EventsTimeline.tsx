"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EventData } from "@/types/wedding";
import { formatWeddingDate, formatTime12h } from "@/lib/formatDate";
import { LotusOrnament } from "@/components/ornaments/LotusOrnament";

interface EventsTimelineProps {
  events: EventData[];
  themeColors: { primary: string; accent: string; bg: string; dark: string };
}

function EventCard({
  event,
  index,
  themeColors,
}: {
  event: EventData;
  index: number;
  themeColors: EventsTimelineProps["themeColors"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        delay: index * 0.12,
      }}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-md p-4 sm:p-5 md:p-7"
      style={{ borderLeft: `3px solid ${themeColors.primary}` }}
    >
      {/* Header row */}
      <div className="flex items-start gap-2.5 sm:gap-3 mb-3">
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-serif text-[14px] sm:text-[16px] flex-shrink-0 mt-0.5"
          style={{ backgroundColor: themeColors.primary }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-serif text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-tight"
            style={{ color: themeColors.dark }}
          >
            {event.name}
          </h3>
        </div>
        {event.time && (
          <span
            className="text-white font-sans text-[11px] sm:text-[12px] rounded-full px-2.5 py-0.5 flex-shrink-0"
            style={{ backgroundColor: themeColors.primary }}
          >
            {formatTime12h(event.time)}
          </span>
        )}
      </div>

      {/* Date */}
      {event.date && (
        <p className="font-sans text-[12px] sm:text-[13px] md:text-[14px] text-gray-500 mb-1.5">
          📅 {formatWeddingDate(event.date)}
        </p>
      )}

      {/* Venue */}
      <p className="font-sans text-[13px] sm:text-[14px] font-semibold text-gray-700">
        📍 {event.venueName}
      </p>
      {event.venueAddress && (
        <p className="font-sans text-[11px] sm:text-[12px] md:text-[13px] text-gray-400 ml-5 sm:ml-6 mt-0.5">
          {event.venueAddress}
        </p>
      )}

      {/* Dress code */}
      {event.dressCode && (
        <p
          className="font-sans text-[11px] sm:text-[12px] md:text-[13px] italic mt-2.5"
          style={{ color: themeColors.primary }}
        >
          👗 {event.dressCode}
        </p>
      )}

      {/* Maps link */}
      {event.mapsLink && (
        <a
          href={event.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 font-sans text-[12px] sm:text-[13px] rounded-full px-4 py-1.5 border transition-colors duration-200 hover:text-white"
          style={{
            borderColor: themeColors.primary,
            color: themeColors.primary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = themeColors.primary;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = themeColors.primary;
          }}
        >
          Get Directions →
        </a>
      )}
    </motion.div>
  );
}

export function EventsTimeline({ events, themeColors }: EventsTimelineProps) {
  return (
    <section
      className="py-10 sm:py-14 md:py-20 relative"
      style={{
        backgroundColor: themeColors.bg,
        backgroundImage: `radial-gradient(circle, ${themeColors.primary}1a 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-5">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className="font-script text-[30px] sm:text-[36px] md:text-[48px]"
            style={{ color: themeColors.primary }}
          >
            Join Us For
          </h2>
          <p
            className="font-serif text-[16px] sm:text-[18px] md:text-[24px]"
            style={{ color: themeColors.dark }}
          >
            Our Celebrations
          </p>
          <div className="flex justify-center mt-3">
            <LotusOrnament size={36} color={themeColors.primary} />
          </div>
        </div>

        {/* Event cards */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {events.map((event, i) => (
            <div key={i}>
              <EventCard event={event} index={i} themeColors={themeColors} />
              {i < events.length - 1 && (
                <div className="flex justify-center my-3">
                  <LotusOrnament size={24} color={themeColors.primary} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
