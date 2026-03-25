"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "@/store/useBuilderStore";
import { weddingThemes } from "@/lib/weddingThemes";
import { WeddingFormData, TemplateNumber, ThemeName } from "@/types/wedding";
import { WeddingPage } from "@/components/invitation/WeddingPage";

const templates: { id: TemplateNumber; name: string; defaultTheme: ThemeName }[] = [
  { id: 1, name: "Rose Garden", defaultTheme: "rose-gold" },
  { id: 2, name: "Royal Indigo", defaultTheme: "royal-blue" },
  { id: 3, name: "Emerald Tradition", defaultTheme: "emerald" },
  { id: 4, name: "Midnight Glamour", defaultTheme: "midnight" },
  { id: 5, name: "Blush Romance", defaultTheme: "blush" },
  { id: 6, name: "Saffron Festival", defaultTheme: "saffron" },
];

interface TemplatePreviewModeProps {
  onClose: () => void;
  onSelect: (template: TemplateNumber, theme: ThemeName) => void;
}

export function TemplatePreviewMode({ onClose, onSelect }: TemplatePreviewModeProps) {
  const store = useBuilderStore();
  const [activeTemplate, setActiveTemplate] = useState<TemplateNumber>(store.template);
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid");

  // Build preview data from store
  const previewData: Omit<WeddingFormData, "template" | "colorTheme"> = {
    brideName: store.brideName || "Priya",
    groomName: store.groomName || "Rahul",
    brideFamily: store.brideFamily,
    groomFamily: store.groomFamily,
    loveStory: store.loveStory,
    couplePhoto: store.couplePhoto,
    hashtag: store.hashtag || "#RahulWedsPriya",
    customMessage: store.customMessage,
    language: store.language,
    events: store.events.length > 0 && store.events[0].name
      ? store.events
      : [{ name: "Wedding", date: "2025-11-16", time: "10:30", venueName: "Venue", venueAddress: "Address", mapsLink: "", dressCode: "" }],
    gallery: store.gallery,
    musicEnabled: false,
    musicTrack: null,
    rsvpEnabled: false,
    rsvpDeadline: "",
    plan: store.plan,
    slug: "preview",
  };

  const activeInfo = templates.find((t) => t.id === activeTemplate)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-white/[0.08] flex-shrink-0 bg-[#111]">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
          >
            ←
          </button>
          <h2 className="font-sans text-[14px] sm:text-[15px] text-white font-medium">
            Compare Templates
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex bg-white/5 rounded-full p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-full font-sans text-[12px] transition-all ${
                viewMode === "grid" ? "bg-[#B76E79] text-white" : "text-white/50"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("single")}
              className={`px-3 py-1 rounded-full font-sans text-[12px] transition-all ${
                viewMode === "single" ? "bg-[#B76E79] text-white" : "text-white/50"
              }`}
            >
              Full
            </button>
          </div>

          <button
            onClick={() => {
              onSelect(activeTemplate, activeInfo.defaultTheme);
              onClose();
            }}
            className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-sans text-[13px] font-semibold px-4 py-2 rounded-full hover:brightness-110 transition-all"
          >
            Use {activeInfo.name}
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === "grid" && (
        <div className="flex-1 overflow-auto p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {templates.map((tpl) => {
              const theme = weddingThemes[tpl.defaultTheme];
              const isActive = activeTemplate === tpl.id;
              const isCurrentInBuilder = store.template === tpl.id;

              return (
                <motion.div
                  key={tpl.id}
                  layout
                  className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "ring-2 ring-[#B76E79] ring-offset-2 ring-offset-[#0a0a0a]"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  onClick={() => setActiveTemplate(tpl.id)}
                >
                  {/* Mini invitation render */}
                  <div
                    className="relative h-[280px] sm:h-[320px] overflow-hidden"
                    style={{
                      background: `linear-gradient(160deg, ${theme.dark} 0%, ${theme.primary}25 40%, ${theme.dark} 100%)`,
                    }}
                  >
                    {/* Simulated invitation content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                      <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-white/30 mb-1">
                        with the blessings of our families
                      </p>

                      {store.brideFamily && (
                        <p className="font-serif italic text-[9px] text-white/40 mb-2">
                          {store.groomFamily} · {store.brideFamily}
                        </p>
                      )}

                      <div
                        className="w-6 h-px rounded-full opacity-40 mb-2"
                        style={{ backgroundColor: theme.accent }}
                      />

                      <p
                        className="font-script text-[28px] sm:text-[32px] leading-tight"
                        style={{ color: theme.accent, textShadow: `0 2px 12px ${theme.accent}40` }}
                      >
                        {previewData.brideName}
                      </p>
                      <p className="font-serif text-[12px] text-white/30 my-0.5">&</p>
                      <p
                        className="font-script text-[28px] sm:text-[32px] leading-tight"
                        style={{ color: theme.accent, textShadow: `0 2px 12px ${theme.accent}40` }}
                      >
                        {previewData.groomName}
                      </p>

                      <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-white/30 mt-2">
                        are getting married
                      </p>

                      {/* Couple photo mini circle */}
                      {previewData.couplePhoto && (
                        <div
                          className="w-12 h-12 rounded-full mt-3 border-[1.5px] overflow-hidden"
                          style={{ borderColor: theme.accent }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewData.couplePhoto}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {previewData.events[0]?.date && (
                        <p className="font-serif text-[10px] text-white/40 mt-2">
                          {new Date(previewData.events[0].date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Info bar */}
                  <div className="bg-[#111] px-3 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
                      />
                      <div>
                        <p className="font-sans text-[13px] text-white font-medium">{tpl.name}</p>
                      </div>
                    </div>

                    {isCurrentInBuilder && (
                      <span className="font-sans text-[10px] bg-[#B76E79]/20 text-[#D4A574] px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Single/Full view — renders actual template at phone width */}
      {viewMode === "single" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Template tabs */}
          <div className="flex gap-1 px-3 py-2 overflow-x-auto flex-shrink-0 bg-[#111] border-b border-white/[0.06]">
            {templates.map((tpl) => {
              const theme = weddingThemes[tpl.defaultTheme];
              const isActive = activeTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTemplate(tpl.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 font-sans text-[12px] transition-all ${
                    isActive
                      ? "bg-[#B76E79] text-white"
                      : "text-white/40 hover:text-white/60 bg-white/5"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
                  />
                  {tpl.name}
                </button>
              );
            })}
          </div>

          {/* Full template render */}
          <div className="flex-1 overflow-auto flex justify-center bg-[#0a0a0a] p-4">
            <div
              className="w-[375px] max-w-full rounded-[2rem] border-[6px] border-[#222] overflow-hidden shadow-2xl bg-white"
              style={{ transformOrigin: "top center" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTemplate}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <WeddingPage
                    data={{
                      ...previewData,
                      template: activeTemplate,
                      colorTheme: activeInfo.defaultTheme,
                    }}
                    isPreview
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
