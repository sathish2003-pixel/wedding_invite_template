"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBuilderStore } from "@/store/useBuilderStore";
import { StepIndicator } from "./StepIndicator";
import { Step1Couple } from "./steps/Step1Couple";
import { Step2Events } from "./steps/Step2Events";
import { Step3Gallery } from "./steps/Step3Gallery";
import { Step4Design } from "./steps/Step4Design";
import { Step5Publish } from "./steps/Step5Publish";

const steps: Record<number, React.ComponentType> = {
  1: Step1Couple,
  2: Step2Events,
  3: Step3Gallery,
  4: Step4Design,
  5: Step5Publish,
};

export function FormPanel() {
  const currentStep = useBuilderStore((s) => s.currentStep);
  const setStep = useBuilderStore((s) => s.setStep);
  const StepComponent = steps[currentStep] || Step1Couple;

  return (
    <div className="h-full bg-[#1A1A1A] text-white overflow-y-auto">
      <div className="p-4 border-b border-white/[0.08]">
        <StepIndicator
          currentStep={currentStep}
          onStepClick={(s) => setStep(s as 1 | 2 | 3 | 4 | 5)}
        />
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 25, duration: 0.25 }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
