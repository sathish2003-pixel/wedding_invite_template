"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function Step2Events() {
  const store = useBuilderStore();
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <div className="space-y-5">
      <h3 className="font-serif text-[24px] text-white mb-2">📅 Wedding Events</h3>
      <p className="font-sans text-[13px] text-white/50 mb-4">
        Add 1-4 events. Tap to expand and edit details.
      </p>

      {store.events.map((event, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Header */}
          <button
            type="button"
            onClick={() => setExpanded(expanded === i ? -1 : i)}
            className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="font-sans text-[15px] text-white font-semibold">
                {event.name || `Event ${i + 1}`}
              </span>
              {event.date && (
                <span className="font-sans text-[12px] text-[#D4A574] bg-[#D4A574]/10 px-2 py-0.5 rounded-full">
                  {event.date}
                </span>
              )}
            </div>
            <span className="text-white/50">
              {expanded === i ? "↑" : "↓"}
            </span>
          </button>

          {/* Expanded */}
          {expanded === i && (
            <div className="px-4 pb-4 space-y-4">
              <Input
                label="Event Name *"
                placeholder="e.g. Wedding Ceremony"
                value={event.name}
                onChange={(e) => store.updateEvent(i, "name", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Date *"
                  type="date"
                  value={event.date}
                  onChange={(e) => store.updateEvent(i, "date", e.target.value)}
                />
                <Input
                  label="Time *"
                  type="time"
                  value={event.time}
                  onChange={(e) => store.updateEvent(i, "time", e.target.value)}
                />
              </div>
              <Input
                label="Venue Name *"
                placeholder="e.g. The Grand Palace Banquet"
                value={event.venueName}
                onChange={(e) => store.updateEvent(i, "venueName", e.target.value)}
              />
              <Textarea
                label="Venue Address *"
                placeholder="123, MG Road..."
                rows={2}
                value={event.venueAddress}
                onChange={(e) => store.updateEvent(i, "venueAddress", e.target.value)}
              />
              <Input
                label="Maps Link"
                type="url"
                placeholder="https://maps.google.com/..."
                value={event.mapsLink}
                onChange={(e) => store.updateEvent(i, "mapsLink", e.target.value)}
              />
              <Input
                label="Dress Code"
                placeholder="Traditional | Saree / Sherwani"
                value={event.dressCode}
                onChange={(e) => store.updateEvent(i, "dressCode", e.target.value)}
              />

              {/* Remove button (not for first event) */}
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => store.removeEvent(i)}
                  className="font-sans text-[13px] text-red-400 hover:text-red-300"
                >
                  − Remove Event
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add event button */}
      {store.events.length < 4 && (
        <button
          type="button"
          onClick={store.addEvent}
          className="w-full py-3 rounded-xl border-2 border-dashed border-[#B76E79]/40 text-[#B76E79] font-sans text-[14px] hover:border-[#B76E79]/60 transition-colors"
        >
          + Add Another Event
        </button>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" fullWidth onClick={() => store.setStep(1)}>
          ← Back
        </Button>
        <Button fullWidth onClick={() => store.setStep(3)}>
          Next: Gallery →
        </Button>
      </div>
    </div>
  );
}
