"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ConfettiEffect } from "@/components/ui/ConfettiEffect";

interface PublishModalProps {
  url: string;
  slug: string;
  brideName: string;
  groomName: string;
  onClose: () => void;
}

export function PublishModal({ url, slug, brideName, groomName, onClose }: PublishModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappText = `💌 ${groomName} & ${brideName} are getting married! 🎊\n\nView their digital invitation:\n${url}`;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <ConfettiEffect trigger={true} colors={["#B76E79", "#D4A574", "#ffffff", "#ff6b6b"]} />

      <motion.div
        className="relative w-full max-w-md rounded-3xl p-8 text-center overflow-y-auto max-h-[90vh]"
        style={{ background: "linear-gradient(135deg, #B76E79, #D4A574)" }}
        initial={{ y: 60, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring" as const, stiffness: 120, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        {/* Animated checkmark */}
        <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center mx-auto mb-4">
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <motion.path
              d="M8 16 L14 22 L24 10"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.svg>
        </div>

        <h2 className="font-script text-[36px] sm:text-[44px] text-white leading-tight">
          Your Invitation is Live! 🎊
        </h2>

        {/* Link box */}
        <div className="mt-5 bg-black/20 rounded-xl px-4 py-3">
          <p className="font-mono text-[12px] sm:text-[13px] text-white/80 break-all">{url}</p>
        </div>

        {/* Action buttons */}
        <div className="mt-5 space-y-3">
          <button
            onClick={handleCopy}
            className="w-full glass text-white font-sans font-semibold py-3 rounded-xl transition-colors hover:bg-white/20 min-h-[48px]"
          >
            {copied ? "✓ Copied!" : "📋 Copy Link"}
          </button>

          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
                "_blank"
              )
            }
            className="w-full bg-[#25D366] text-white font-sans font-semibold py-3 rounded-xl hover:brightness-110 transition-all min-h-[48px]"
          >
            💬 Share on WhatsApp
          </button>

          <button
            onClick={() => window.open(`/wedding/${slug}`, "_blank")}
            className="w-full border-2 border-white text-white font-sans font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors min-h-[48px]"
          >
            👁 View Invitation
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
