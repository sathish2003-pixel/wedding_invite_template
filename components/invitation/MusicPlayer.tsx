"use client";

import { useState, useEffect } from "react";
import { musicTracks } from "@/lib/musicTracks";

interface MusicPlayerProps {
  trackId: string;
  enabled: boolean;
}

export function MusicPlayer({ trackId, enabled }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const track = musicTracks.find((t) => t.id === trackId);

  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    return () => document.removeEventListener("click", handleFirstInteraction);
  }, [enabled, hasInteracted]);

  if (!enabled || !track) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 md:left-1/2 md:-translate-x-1/2 z-30">
      <div className="glass rounded-full px-4 py-2 flex items-center gap-3 w-[180px] md:w-[240px]">
        <span className={`text-[18px] ${isPlaying ? "animate-pulse" : ""}`}>
          🎵
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[12px] text-white/80 truncate">
            {track.name}
          </p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white text-[14px] hover:bg-white/25 transition-colors flex-shrink-0"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </div>
  );
}
