"use client";

import Image from "next/image";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PillRadio } from "@/components/ui/PillRadio";
import { Button } from "@/components/ui/Button";
import { PhotoUpload } from "@/components/ui/PhotoUpload";

const couplePhotos = [
  "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=600&q=80",
  "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?w=600&q=80",
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी" },
  { value: "ta", label: "தமிழ்" },
  { value: "te", label: "తెలుగు" },
  { value: "kn", label: "ಕನ್ನಡ" },
  { value: "ml", label: "മലയാളം" },
];

export function Step1Couple() {
  const store = useBuilderStore();

  const isUploaded = store.couplePhoto && !store.couplePhoto.startsWith("https://images.pexels");

  return (
    <div className="space-y-5">
      <h3 className="font-serif text-[24px] text-white mb-2">💑 The Couple</h3>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Bride's Name *"
          placeholder="e.g. Priya"
          value={store.brideName}
          onChange={(e) => store.setField("brideName", e.target.value)}
        />
        <Input
          label="Groom's Name *"
          placeholder="e.g. Rahul"
          value={store.groomName}
          onChange={(e) => store.setField("groomName", e.target.value)}
        />
      </div>

      <Input
        label="Bride's Family"
        placeholder="D/O Mr. & Mrs. Sharma"
        value={store.brideFamily}
        onChange={(e) => store.setField("brideFamily", e.target.value)}
      />
      <Input
        label="Groom's Family"
        placeholder="S/O Mr. & Mrs. Verma"
        value={store.groomFamily}
        onChange={(e) => store.setField("groomFamily", e.target.value)}
      />
      <Textarea
        label="Custom Message"
        placeholder="With the blessings of our families..."
        rows={3}
        maxChars={150}
        currentLength={store.customMessage.length}
        value={store.customMessage}
        onChange={(e) => store.setField("customMessage", e.target.value)}
      />
      <Input
        label="Wedding Hashtag"
        placeholder="#RahulWedsPriya"
        value={store.hashtag}
        onChange={(e) => store.setField("hashtag", e.target.value)}
      />

      {/* Language */}
      <div>
        <label className="block font-sans text-[13px] uppercase tracking-wider text-white/65 mb-2">
          Language
        </label>
        <PillRadio
          options={languageOptions}
          value={store.language}
          onChange={(v) => store.setField("language", v as typeof store.language)}
        />
      </div>

      {/* Couple Photo — Upload or Select */}
      <div>
        <label className="block font-sans text-[13px] uppercase tracking-wider text-white/65 mb-1">
          Couple Photo
        </label>
        <p className="font-sans text-[12px] text-white/40 mb-3">
          Upload your own photo or select from our collection
        </p>

        {/* Upload area */}
        <div className="flex items-start gap-4 mb-4">
          <PhotoUpload
            onUpload={(dataUrl) => store.setField("couplePhoto", dataUrl)}
            currentPhoto={isUploaded ? store.couplePhoto : undefined}
            label="Upload Your Photo"
            shape="circle"
            size="lg"
          />
          <div className="flex-1 pt-2">
            <p className="font-sans text-[13px] text-white/70 font-medium">
              {isUploaded ? "✓ Your photo uploaded" : "Upload a photo"}
            </p>
            <p className="font-sans text-[11px] text-white/40 mt-1">
              JPG, PNG up to 10MB. Best: square crop, high resolution.
            </p>
            {isUploaded && (
              <button
                type="button"
                onClick={() => store.setField("couplePhoto", "")}
                className="font-sans text-[11px] text-red-400 mt-2 hover:text-red-300"
              >
                Remove uploaded photo
              </button>
            )}
          </div>
        </div>

        {/* Or divider */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-sans text-[11px] text-white/30 uppercase tracking-wider">or choose</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Preset grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {couplePhotos.map((photo) => {
            const isSelected = store.couplePhoto === photo;
            return (
              <button
                key={photo}
                type="button"
                onClick={() => store.setField("couplePhoto", photo)}
                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${
                  isSelected
                    ? "border-2 border-[#B76E79] ring-2 ring-[#B76E79]/30"
                    : "border border-white/10 hover:border-white/30"
                }`}
              >
                <Image
                  src={photo}
                  alt="Couple photo option"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#B76E79]/30 flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Button
        fullWidth
        size="lg"
        onClick={() => store.setStep(2)}
        disabled={!store.brideName || !store.groomName}
      >
        Next: Wedding Events →
      </Button>
    </div>
  );
}
