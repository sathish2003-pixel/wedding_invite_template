"use client";

import { useState } from "react";
import Link from "next/link";
import { useBuilderStore } from "@/store/useBuilderStore";
import { FormPanel } from "./FormPanel";
import { PreviewPanel } from "./PreviewPanel";
import { PublishModal } from "./PublishModal";

type MobileTab = "edit" | "preview";

export function BuilderLayout() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const currentStep = useBuilderStore((s) => s.currentStep);
  const isPublished = useBuilderStore((s) => s.isPublished);
  const publishedUrl = useBuilderStore((s) => s.publishedUrl);
  const slug = useBuilderStore((s) => s.slug);
  const brideName = useBuilderStore((s) => s.brideName);
  const groomName = useBuilderStore((s) => s.groomName);
  const reset = useBuilderStore((s) => s.reset);

  const [showModal, setShowModal] = useState(false);

  // Show modal when publish completes
  const prevPublished = useBuilderStore((s) => s.isPublished);
  if (prevPublished && publishedUrl && !showModal) {
    setShowModal(true);
  }

  return (
    <div className="h-screen flex flex-col bg-[#111]">
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-4 h-14 flex-shrink-0 border-b border-white/[0.08]"
        style={{ background: "rgba(20,10,8,0.95)", backdropFilter: "blur(20px)" }}
      >
        <Link href="/" className="font-script text-[26px] text-[#D4A574]">
          ShaadiPage
        </Link>

        <span className="font-sans text-[13px] text-white/50 hidden md:block">
          Step {currentStep} of 5
        </span>

        {/* Mobile step dots */}
        <div className="flex items-center gap-1.5 md:hidden">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full ${
                s === currentStep
                  ? "bg-[#B76E79]"
                  : s < currentStep
                    ? "bg-[#B76E79]/50"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isPublished && (
            <span className="font-sans text-[13px] text-green-400">✓ Published</span>
          )}
        </div>
      </header>

      {/* Mobile tab bar */}
      <div className="flex md:hidden border-b border-white/[0.08]">
        {(["edit", "preview"] as MobileTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-3 font-sans text-[14px] font-semibold text-center min-h-[48px] transition-colors ${
              mobileTab === tab
                ? "text-[#D4A574] border-b-2 border-[#D4A574]"
                : "text-white/40"
            }`}
          >
            {tab === "edit" ? "✏️ Edit" : "👁 Preview"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile: show one panel */}
        <div className="h-full md:hidden">
          {mobileTab === "edit" ? <FormPanel /> : <PreviewPanel />}
        </div>

        {/* Desktop: side by side */}
        <div className="hidden md:grid md:grid-cols-[45%_55%] h-full">
          <FormPanel />
          <PreviewPanel />
        </div>
      </div>

      {/* Publish success modal — rendered at root level to cover entire screen */}
      {showModal && publishedUrl && (
        <PublishModal
          url={publishedUrl}
          slug={slug}
          brideName={brideName}
          groomName={groomName}
          onClose={() => {
            setShowModal(false);
            reset();
          }}
        />
      )}
    </div>
  );
}
