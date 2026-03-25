"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  BuilderStore,
  EventData,
  ThemeName,
  TemplateNumber,
  WeddingFormData,
} from "@/types/wedding";

const initialFormData: WeddingFormData = {
  brideName: "Priya",
  groomName: "Rahul",
  brideFamily: "D/O Mr. & Mrs. Sharma",
  groomFamily: "S/O Mr. & Mrs. Verma",
  loveStory: "We met at a college fest in 2019 and knew instantly. After 5 years of laughter, adventures, and love, we are finally making it official. Thank you for being part of our journey.",
  couplePhoto: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=600&q=80",
  hashtag: "#RahulWedsPriya",
  customMessage: "With the blessings of our families, we joyfully invite you to celebrate our wedding. Your presence will make our day complete.",
  language: "en",
  events: [
    {
      name: "Mehendi Ceremony",
      date: "2025-11-14",
      time: "16:00",
      venueName: "Sharma Residence",
      venueAddress: "42, Linking Road, Bandra West, Mumbai 400050",
      mapsLink: "https://maps.google.com",
      dressCode: "Colourful Traditional",
    },
    {
      name: "Sangeet Night",
      date: "2025-11-15",
      time: "19:00",
      venueName: "The Grand Ballroom",
      venueAddress: "Hotel Taj Lands End, Bandra, Mumbai 400050",
      mapsLink: "https://maps.google.com",
      dressCode: "Ethnic Wear | Lehenga / Sherwani",
    },
    {
      name: "Wedding & Reception",
      date: "2025-11-16",
      time: "10:30",
      venueName: "ISKCON Temple Hall",
      venueAddress: "Hare Krishna Land, Juhu, Mumbai 400049",
      mapsLink: "https://maps.google.com",
      dressCode: "Traditional | Saree / Dhoti",
    },
  ],
  gallery: [
    "https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?w=800&q=80",
    "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?w=800&q=80",
    "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=800&q=80",
    "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?w=1200&q=80",
    "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?w=600&q=80",
    "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?w=1200&q=80",
  ],
  template: 1,
  colorTheme: "rose-gold",
  musicEnabled: false,
  musicTrack: null,
  rsvpEnabled: false,
  rsvpDeadline: "",
  plan: "free",
  slug: "",
};

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
  ...initialFormData,
  currentStep: 1,
  isPublishing: false,
  isPublished: false,
  publishedUrl: null,

  setField: <K extends keyof WeddingFormData>(
    key: K,
    value: WeddingFormData[K]
  ) => {
    set({ [key]: value });
  },

  setStep: (step) => {
    set({ currentStep: step });
  },

  addEvent: () => {
    const { events } = get();
    if (events.length >= 4) return;
    set({
      events: [...events, {
        name: "",
        date: "",
        time: "",
        venueName: "",
        venueAddress: "",
        mapsLink: "",
        dressCode: "",
      }],
    });
  },

  removeEvent: (index) => {
    const { events } = get();
    if (events.length <= 1) return;
    set({ events: events.filter((_, i) => i !== index) });
  },

  updateEvent: (index, field, value) => {
    const { events } = get();
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    set({ events: updated });
  },

  togglePhoto: (url) => {
    const { gallery } = get();
    if (gallery.includes(url)) {
      set({ gallery: gallery.filter((p) => p !== url) });
    } else if (gallery.length < 8) {
      set({ gallery: [...gallery, url] });
    }
  },

  reorderPhotos: (from, to) => {
    const { gallery } = get();
    const updated = [...gallery];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    set({ gallery: updated });
  },

  setTheme: (theme: ThemeName) => {
    set({ colorTheme: theme });
  },

  setTemplate: (template: TemplateNumber) => {
    set({ template });
  },

  publish: async () => {
    const state = get();
    set({ isPublishing: true });

    // Generate slug
    const bride = (state.brideName || "bride").toLowerCase().replace(/[^a-z0-9]/g, "");
    const groom = (state.groomName || "groom").toLowerCase().replace(/[^a-z0-9]/g, "");
    const slug = state.slug || `${groom}-weds-${bride}-${Date.now().toString(36)}`;
    const baseUrl = window.location.origin;

    // Try API with a short timeout (2s) — skip if no DB configured
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    try {
      const response = await fetch("/api/weddings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          brideName: state.brideName,
          groomName: state.groomName,
          brideFamily: state.brideFamily,
          groomFamily: state.groomFamily,
          loveStory: state.loveStory,
          couplePhoto: state.couplePhoto,
          hashtag: state.hashtag,
          customMessage: state.customMessage,
          language: state.language,
          events: state.events,
          gallery: state.gallery,
          template: state.template,
          colorTheme: state.colorTheme,
          musicEnabled: state.musicEnabled,
          musicTrack: state.musicTrack,
          rsvpEnabled: state.rsvpEnabled,
          rsvpDeadline: state.rsvpDeadline,
          plan: state.plan,
          slug,
        }),
      });
      clearTimeout(timeout);

      const data = await response.json();
      if (data.success) {
        set({
          isPublished: true,
          isPublishing: false,
          publishedUrl: data.previewUrl,
          slug: data.slug,
        });
        return;
      }
    } catch {
      clearTimeout(timeout);
    }

    // Instant fallback — publish locally using preview route
    set({
      isPublished: true,
      isPublishing: false,
      publishedUrl: `${baseUrl}/wedding/preview`,
      slug: slug,
    });
  },

  reset: () => {
    set({
      ...initialFormData,
      currentStep: 1,
      isPublishing: false,
      isPublished: false,
      publishedUrl: null,
    });
  },
}),
    {
      name: "shaadipage-builder",
      partialize: (state) => ({
        brideName: state.brideName,
        groomName: state.groomName,
        brideFamily: state.brideFamily,
        groomFamily: state.groomFamily,
        loveStory: state.loveStory,
        couplePhoto: state.couplePhoto,
        hashtag: state.hashtag,
        customMessage: state.customMessage,
        language: state.language,
        events: state.events,
        gallery: state.gallery,
        template: state.template,
        colorTheme: state.colorTheme,
        musicEnabled: state.musicEnabled,
        musicTrack: state.musicTrack,
        rsvpEnabled: state.rsvpEnabled,
        rsvpDeadline: state.rsvpDeadline,
        plan: state.plan,
        slug: state.slug,
        currentStep: state.currentStep,
      }),
    }
  )
);
