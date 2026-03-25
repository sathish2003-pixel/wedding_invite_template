"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { WeddingPage } from "@/components/invitation/WeddingPage";
import { WeddingFormData } from "@/types/wedding";

export default function PreviewPage() {
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
    events:
      store.events.length > 0 && store.events[0].name
        ? store.events
        : [
            {
              name: "Wedding Ceremony",
              date: "2025-11-16",
              time: "10:30",
              venueName: "Venue",
              venueAddress: "Address",
              mapsLink: "",
              dressCode: "",
            },
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

  // If store is empty (user navigated directly), show a message
  if (!store.brideName && !store.groomName) {
    return (
      <div className="min-h-screen bg-[#FDF6F0] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-script text-[48px] text-[#B76E79]">Preview</h1>
          <p className="font-serif text-[20px] text-[#2C1810] mt-3">
            No invitation data found
          </p>
          <p className="font-sans text-[14px] text-gray-500 mt-2">
            Please open this preview from the builder page. Your data lives in the
            builder session.
          </p>
          <a
            href="/builder"
            className="inline-block mt-6 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-sans font-semibold px-6 py-3 rounded-full"
          >
            Go to Builder →
          </a>
        </div>
      </div>
    );
  }

  return <WeddingPage data={previewData} />;
}
