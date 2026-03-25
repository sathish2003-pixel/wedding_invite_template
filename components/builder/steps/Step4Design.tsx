"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { ThemeName, TemplateNumber } from "@/types/wedding";
import { weddingThemes, themeNames } from "@/lib/weddingThemes";
import { musicTracks } from "@/lib/musicTracks";
import { TemplatePreviewMode } from "../TemplatePreviewMode";

const templateInfo: { id: TemplateNumber; name: string; style: string }[] = [
  { id: 1, name: "Rose Garden", style: "Romantic florals, warm tones" },
  { id: 2, name: "Royal Indigo", style: "Mughal royal, navy & gold" },
  { id: 3, name: "Emerald Tradition", style: "South Indian, kolam & green" },
  { id: 4, name: "Midnight Glamour", style: "Dark luxury, modern minimal" },
  { id: 5, name: "Blush Romance", style: "Soft pink, botanical, airy" },
  { id: 6, name: "Saffron Festival", style: "Vibrant, festive, bold" },
];

function MiniTemplatePreview({
  template,
  theme,
  brideName,
  groomName,
  isSelected,
  onClick,
}: {
  template: typeof templateInfo[0];
  theme: ThemeName;
  brideName: string;
  groomName: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const colors = weddingThemes[theme] || weddingThemes["rose-gold"];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden text-left transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-[#B76E79] ring-offset-2 ring-offset-[#1A1A1A] scale-[1.02]"
          : "hover:scale-[1.01] opacity-80 hover:opacity-100"
      }`}
    >
      {/* Mini invitation preview */}
      <div
        className="p-3 sm:p-4 h-[160px] sm:h-[180px] flex flex-col items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary}40 50%, ${colors.dark} 100%)`,
        }}
      >
        <div
          className="text-[8px] uppercase tracking-[0.2em] opacity-50 mb-1"
          style={{ color: colors.accent }}
        >
          together with their families
        </div>
        <div
          className="font-script text-[18px] sm:text-[20px] leading-tight"
          style={{ color: colors.accent }}
        >
          {brideName || "Bride"}
        </div>
        <div className="text-[10px] opacity-40 text-white my-0.5">&</div>
        <div
          className="font-script text-[18px] sm:text-[20px] leading-tight"
          style={{ color: colors.accent }}
        >
          {groomName || "Groom"}
        </div>

        {/* Color accent bar */}
        <div
          className="w-8 h-[2px] rounded-full mt-2 opacity-50"
          style={{ backgroundColor: colors.accent }}
        />
      </div>

      {/* Info bar */}
      <div className="bg-[#111] px-3 py-2.5 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
          />
          <div className="min-w-0">
            <p className="font-sans text-[12px] text-white font-medium truncate">
              {template.name}
            </p>
            <p className="font-sans text-[10px] text-white/40 truncate">
              {template.style}
            </p>
          </div>
        </div>
      </div>

      {/* Selected badge */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#B76E79] flex items-center justify-center">
          <span className="text-white text-[10px]">✓</span>
        </div>
      )}
    </button>
  );
}

export function Step4Design() {
  const store = useBuilderStore();
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="font-serif text-[24px] text-white mb-2">🎨 Design & Music</h3>

      {/* Compare Templates full-screen mode */}
      {showCompare && (
        <TemplatePreviewMode
          onClose={() => setShowCompare(false)}
          onSelect={(template, theme) => {
            store.setTemplate(template);
            store.setTheme(theme);
          }}
        />
      )}

      {/* Color Theme */}
      <div>
        <label className="block font-sans text-[13px] uppercase tracking-wider text-white/65 mb-3">
          Color Theme
        </label>
        <div className="flex flex-wrap gap-3">
          {themeNames.map((name: ThemeName) => {
            const theme = weddingThemes[name];
            const isSelected = store.colorTheme === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => store.setTheme(name)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-200 ${
                    isSelected ? "scale-[1.15] ring-[2px] ring-white ring-offset-2 ring-offset-[#1A1A1A]" : "hover:scale-105"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                  }}
                />
                <span className={`font-sans text-[10px] ${isSelected ? "text-white/80" : "text-white/40"}`}>
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Template Selector — Live mini previews with user data */}
      <div>
        <label className="block font-sans text-[13px] uppercase tracking-wider text-white/65 mb-3">
          Template Style
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {templateInfo.map((tpl) => (
            <MiniTemplatePreview
              key={tpl.id}
              template={tpl}
              theme={store.colorTheme}
              brideName={store.brideName}
              groomName={store.groomName}
              isSelected={store.template === tpl.id}
              onClick={() => store.setTemplate(tpl.id)}
            />
          ))}
        </div>

        {/* Compare button */}
        <button
          type="button"
          onClick={() => setShowCompare(true)}
          className="w-full mt-3 py-2.5 rounded-xl border border-dashed border-[#B76E79]/30 text-[#D4A574] font-sans text-[13px] hover:border-[#B76E79]/50 hover:bg-[#B76E79]/5 transition-all"
        >
          🔍 Compare All Templates Full Screen
        </button>
      </div>

      {/* Music Toggle */}
      <div>
        <Toggle
          enabled={store.musicEnabled}
          onChange={(v) => store.setField("musicEnabled", v)}
          label="Add Background Music 🎵"
        />

        {store.musicEnabled && (
          <div className="mt-3 rounded-xl overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {musicTracks.map((track) => {
              const isSelected = store.musicTrack === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => store.setField("musicTrack", track.id)}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-[#B76E79]/15 text-white"
                      : "text-white/50 hover:bg-white/[0.03]"
                  }`}
                >
                  <div>
                    <span className="font-sans text-[13px] font-medium">{track.name}</span>
                    <span className="font-sans text-[11px] text-white/35 ml-2">— {track.movie}</span>
                  </div>
                  {isSelected && <span className="text-[#D4A574] text-[14px]">♪</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" fullWidth onClick={() => store.setStep(3)}>
          ← Back
        </Button>
        <Button fullWidth onClick={() => store.setStep(5)}>
          Next: Publish →
        </Button>
      </div>
    </div>
  );
}
