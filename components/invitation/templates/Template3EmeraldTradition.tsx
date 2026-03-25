"use client";

import { WeddingFormData } from "@/types/wedding";
import { weddingThemes } from "@/lib/weddingThemes";
import { CoverHero } from "../sections/CoverHero";
import { CountdownTimer } from "../sections/CountdownTimer";
import { EventsTimeline } from "../sections/EventsTimeline";
import { LoveStory } from "../sections/LoveStory";
import { PhotoGallery } from "../sections/PhotoGallery";
import { RSVPForm } from "../sections/RSVPForm";
import { ShareContact } from "../sections/ShareContact";
import { ClosingSection } from "../sections/ClosingSection";

interface TemplateProps {
  data: WeddingFormData;
  isPreview?: boolean;
}

export function Template3EmeraldTradition({ data, isPreview = false }: TemplateProps) {
  const theme = weddingThemes[data.colorTheme] || weddingThemes["emerald"];
  const themeColors = { primary: theme.primary, accent: theme.accent, bg: theme.bg, dark: theme.dark };

  return (
    <div
      className="theme-transition"
      style={{
        "--color-primary": theme.primary,
        "--color-accent": theme.accent,
        "--color-bg": theme.bg,
        "--color-dark": theme.dark,
      } as React.CSSProperties}
    >
      <CoverHero data={data} themeColors={themeColors} isPreview={isPreview} />
      <CountdownTimer weddingDate={data.events[0]?.date || ""} themeColors={themeColors} isPreview={isPreview} />
      <EventsTimeline events={data.events} themeColors={themeColors} />
      {data.loveStory && <LoveStory story={data.loveStory} hashtag={data.hashtag} themeColors={themeColors} />}
      {data.gallery.length > 0 && <PhotoGallery photos={data.gallery} themeColors={themeColors} />}
      {data.rsvpEnabled && <RSVPForm slug={data.slug} deadline={data.rsvpDeadline} themeColors={themeColors} />}
      <ShareContact data={data} themeColors={themeColors} />
      <ClosingSection data={data} themeColors={themeColors} showWatermark={data.plan === "free"} isPreview={isPreview} />
    </div>
  );
}
