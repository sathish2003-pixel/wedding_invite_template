"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { DeviceToggle } from "./DeviceToggle";
import { WeddingPage } from "@/components/invitation/WeddingPage";
import { WeddingFormData } from "@/types/wedding";

const deviceConfig = {
  phone: { width: 320, zoom: 0.65 },
  tablet: { width: 580, zoom: 0.55 },
  desktop: { width: "100%", zoom: 0.7 },
} as const;

type DeviceMode = keyof typeof deviceConfig;

export function PreviewPanel() {
  const [device, setDevice] = useState<DeviceMode>("phone");
  const store = useBuilderStore();

  const previewData: WeddingFormData = {
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
      : [
          { name: "Wedding Ceremony", date: "2025-10-12", time: "10:30", venueName: "Venue", venueAddress: "Address", mapsLink: "", dressCode: "" },
        ],
    gallery: store.gallery,
    template: store.template,
    colorTheme: store.colorTheme,
    musicEnabled: store.musicEnabled,
    musicTrack: store.musicTrack,
    rsvpEnabled: store.rsvpEnabled,
    rsvpDeadline: store.rsvpDeadline,
    plan: store.plan,
    slug: store.slug || "preview",
  };

  const config = deviceConfig[device];

  return (
    <div className="h-full bg-[#111] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <span className="font-sans text-[13px] text-gray-400">Live Preview</span>
        <DeviceToggle mode={device} onChange={setDevice} />
        <a
          href="/wedding/preview"
          target="_blank"
          className="font-sans text-[13px] text-[#D4A574] hover:underline"
        >
          Open Full Preview ↗
        </a>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-4">
        <div
          className="rounded-[2rem] border-[6px] border-[#333] overflow-hidden bg-white shadow-2xl"
          style={{
            width: typeof config.width === "number" ? `${config.width}px` : config.width,
            maxWidth: "100%",
            transform: `scale(${config.zoom})`,
            transformOrigin: "top center",
          }}
        >
          <div className="overflow-y-auto" style={{ maxHeight: `${100 / config.zoom}vh` }}>
            <WeddingPage data={previewData} isPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
