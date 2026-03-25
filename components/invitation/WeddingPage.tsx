"use client";

import { useEffect, useState } from "react";
import { WeddingFormData } from "@/types/wedding";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { StickyWhatsApp } from "./StickyWhatsApp";
import { ConfettiEffect } from "@/components/ui/ConfettiEffect";
import { weddingThemes } from "@/lib/weddingThemes";
import { Template1RoseGarden } from "./templates/Template1RoseGarden";
import { Template2RoyalIndigo } from "./templates/Template2RoyalIndigo";
import { Template3EmeraldTradition } from "./templates/Template3EmeraldTradition";
import { Template4MidnightGlamour } from "./templates/Template4MidnightGlamour";
import { Template5BlushRomance } from "./templates/Template5BlushRomance";
import { Template6SaffronFestival } from "./templates/Template6SaffronFestival";

interface WeddingPageProps {
  data: WeddingFormData;
  isPreview?: boolean;
}

export function WeddingPage({ data, isPreview = false }: WeddingPageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const theme = weddingThemes[data.colorTheme] || weddingThemes["rose-gold"];

  useEffect(() => {
    if (isPreview) return;
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, [isPreview]);

  const renderTemplate = () => {
    const props = { data, isPreview };
    switch (data.template) {
      case 1: return <Template1RoseGarden {...props} />;
      case 2: return <Template2RoyalIndigo {...props} />;
      case 3: return <Template3EmeraldTradition {...props} />;
      case 4: return <Template4MidnightGlamour {...props} />;
      case 5: return <Template5BlushRomance {...props} />;
      case 6: return <Template6SaffronFestival {...props} />;
      default: return <Template1RoseGarden {...props} />;
    }
  };

  return (
    <div className="min-h-screen">
      {!isPreview && <ScrollProgressBar />}
      {!isPreview && (
        <ConfettiEffect
          trigger={showConfetti}
          colors={[theme.primary, theme.accent, "#ffffff", "#ff6b6b"]}
        />
      )}
      {renderTemplate()}
      {!isPreview && <StickyWhatsApp data={data} />}
    </div>
  );
}
