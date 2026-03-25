"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PillRadio } from "@/components/ui/PillRadio";
import { ConfettiEffect } from "@/components/ui/ConfettiEffect";

const rsvpSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters").max(50),
  guestCount: z.number().min(1).max(4),
  message: z.string().max(300).optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPFormProps {
  slug: string;
  deadline?: string;
  themeColors: { primary: string; accent: string };
}

const guestOptions = [
  { value: "1", label: "👤 Just Me" },
  { value: "2", label: "👥 2 People" },
  { value: "3", label: "👨‍👩‍👦 3 People" },
  { value: "4", label: "👨‍👩‍👧‍👦 4+" },
];

export function RSVPForm({ slug, deadline, themeColors }: RSVPFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestCount, setGuestCount] = useState("1");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestCount: 1 },
  });

  const onSubmit = async (formData: RSVPFormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rsvp/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          guestCount: parseInt(guestCount),
        }),
      });

      if (res.ok) {
        setSubmittedName(formData.guestName);
        setSubmitted(true);
      }
    } catch {
      // Handle error silently for now
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-10 sm:py-14 md:py-20"
      style={{
        background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.primary}cc 100%)`,
      }}
    >
      <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-script text-white text-[32px] sm:text-[40px] md:text-[52px]">
          Will You Join Us?
        </h2>
        {deadline && (
          <p className="font-sans text-[13px] sm:text-[14px] text-white/70 mt-1.5 mb-6 sm:mb-8">
            Please RSVP by {deadline}
          </p>
        )}

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="text-4xl sm:text-5xl mb-3 animate-pulse">❤️</div>
            <h3 className="font-script text-[28px] sm:text-[34px] md:text-[40px] text-white">
              Thank you, {submittedName}! 🎊
            </h3>
            <p className="font-sans text-[14px] sm:text-[15px] text-white/80 mt-2">
              We can&apos;t wait to celebrate with you!
            </p>
            <ConfettiEffect
              trigger={submitted}
              colors={["#ffffff", themeColors.primary, themeColors.accent]}
              particleCount={80}
            />
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 backdrop-blur-xl rounded-3xl p-7 md:p-10"
            style={{
              backgroundColor: "rgba(255,255,255,0.13)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            <div className="space-y-5">
              <Input
                label="Your Name *"
                placeholder="Enter your name"
                variant="light"
                error={errors.guestName?.message}
                {...register("guestName")}
                className="!bg-white/20 !border-white/20 !text-white !placeholder:text-white/40 focus:!border-white"
              />

              <div>
                <label className="block font-sans text-[13px] uppercase tracking-wider text-white/65 mb-2">
                  Number of Guests
                </label>
                <PillRadio
                  options={guestOptions}
                  value={guestCount}
                  onChange={setGuestCount}
                  variant="light"
                />
              </div>

              <Textarea
                label="Message to the Couple 💌 (optional)"
                placeholder="Share your wishes..."
                rows={3}
                variant="light"
                {...register("message")}
                className="!bg-white/20 !border-white/20 !text-white !placeholder:text-white/40 focus:!border-white"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-6 bg-white rounded-xl py-3 md:py-4 font-sans text-[17px] font-semibold transition-colors duration-200 disabled:opacity-60"
              style={{ color: themeColors.primary }}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              ) : (
                "RSVP Now ❤️"
              )}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
