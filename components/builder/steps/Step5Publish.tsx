"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PillRadio } from "@/components/ui/PillRadio";
import { Toggle } from "@/components/ui/Toggle";
import { generateSlug } from "@/lib/slugGenerator";
import { weddingThemes } from "@/lib/weddingThemes";

const planOptions = [
  { value: "free", label: "Free — ₹0" },
  { value: "premium", label: "Premium — ₹999" },
  { value: "premium_plus", label: "Plus — ₹1,499" },
];

const templateNames: Record<number, string> = {
  1: "Rose Garden",
  2: "Royal Indigo",
  3: "Emerald Tradition",
  4: "Midnight Glamour",
  5: "Blush Romance",
  6: "Saffron Festival",
};

export function Step5Publish() {
  const store = useBuilderStore();
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const autoSlug =
    store.slug ||
    generateSlug(store.brideName, store.groomName, store.events[0]?.date);

  const theme = weddingThemes[store.colorTheme] || weddingThemes["rose-gold"];

  const checkSlug = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/check-slug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: store.slug || autoSlug }),
      });
      const data = await res.json();
      setSlugAvailable(data.available);
      if (!data.available && data.suggestion) {
        store.setField("slug", data.suggestion);
      }
    } catch {
      setSlugAvailable(null);
    } finally {
      setChecking(false);
    }
  };

  const handlePublish = async () => {
    if (!store.slug) {
      store.setField("slug", autoSlug);
    }
    await store.publish();
  };

  return (
    <div className="space-y-5">
      <h3 className="font-serif text-[24px] text-white mb-2">🎊 Review & Publish</h3>

      {/* Live template mini preview with user data */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.primary}30 50%, ${theme.dark} 100%)`,
        }}
      >
        <div className="p-5 sm:p-6 text-center">
          <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
            Your Invitation Preview
          </p>
          <div className="my-3">
            <p
              className="font-script text-[28px] sm:text-[32px] leading-tight"
              style={{ color: theme.accent }}
            >
              {store.brideName || "Bride"}
            </p>
            <p className="font-serif text-[14px] text-white/40 my-0.5">&</p>
            <p
              className="font-script text-[28px] sm:text-[32px] leading-tight"
              style={{ color: theme.accent }}
            >
              {store.groomName || "Groom"}
            </p>
          </div>
          {store.events[0]?.date && (
            <p className="font-serif text-[12px] text-white/50">
              {new Date(store.events[0].date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
            />
            <span className="font-sans text-[11px] text-white/50">
              {templateNames[store.template]} · {theme.name}
            </span>
          </div>
        </div>
      </div>

      {/* Summary card */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h4 className="font-sans text-[12px] font-semibold text-white/70 uppercase tracking-wider mb-3">
          Details
        </h4>
        <div className="space-y-2 font-sans text-[13px]">
          {[
            { label: "Couple", value: `${store.brideName || "—"} & ${store.groomName || "—"}` },
            { label: "Events", value: `${store.events.filter(e => e.name).length} events` },
            { label: "Gallery", value: `${store.gallery.length} photos` },
            { label: "Template", value: templateNames[store.template] },
            { label: "Theme", value: theme.name },
            { label: "Music", value: store.musicEnabled ? "On" : "Off" },
            { label: "RSVP", value: store.rsvpEnabled ? "Enabled" : "Off" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-white/40">{row.label}</span>
              <span className="text-white/80">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* URL Preview */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <label className="block font-sans text-[12px] uppercase tracking-wider text-white/50 mb-2">
          Invitation Link
        </label>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-white/40 flex-shrink-0">
            shaadipage.in/
          </span>
          <Input
            value={store.slug || autoSlug}
            onChange={(e) => {
              store.setField("slug", e.target.value);
              setSlugAvailable(null);
            }}
            className="!font-mono !text-[13px] !py-2 !min-h-[40px]"
          />
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Button size="sm" variant="secondary" onClick={checkSlug} loading={checking} className="!text-[12px] !px-3 !py-1.5 !min-h-[32px]">
            Check
          </Button>
          {slugAvailable === true && (
            <span className="font-sans text-[12px] text-green-400">✓ Available</span>
          )}
          {slugAvailable === false && (
            <span className="font-sans text-[12px] text-red-400">✗ Taken</span>
          )}
        </div>
      </div>

      {/* Plan selector */}
      <div>
        <label className="block font-sans text-[12px] uppercase tracking-wider text-white/50 mb-2">
          Plan
        </label>
        <PillRadio
          options={planOptions}
          value={store.plan}
          onChange={(v) => store.setField("plan", v as typeof store.plan)}
        />
      </div>

      {/* RSVP */}
      <div className="flex items-center justify-between">
        <Toggle
          enabled={store.rsvpEnabled}
          onChange={(v) => store.setField("rsvpEnabled", v)}
          label="Enable RSVP"
        />
      </div>
      {store.rsvpEnabled && (
        <Input
          label="RSVP Deadline"
          type="date"
          value={store.rsvpDeadline}
          onChange={(e) => store.setField("rsvpDeadline", e.target.value)}
        />
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="secondary" fullWidth onClick={() => store.setStep(4)}>
          ← Back
        </Button>
      </div>

      {/* Publish button */}
      <Button
        fullWidth
        size="lg"
        loading={store.isPublishing}
        onClick={handlePublish}
        className="!rounded-2xl !py-4 !text-lg shadow-[0_8px_40px_rgba(183,110,121,0.4)]"
      >
        Publish My Invitation 🎊
      </Button>
    </div>
  );
}
