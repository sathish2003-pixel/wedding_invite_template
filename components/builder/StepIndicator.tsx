"use client";

const steps = [
  { num: 1, label: "Couple" },
  { num: 2, label: "Events" },
  { num: 3, label: "Photos" },
  { num: 4, label: "Design" },
  { num: 5, label: "Publish" },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 py-3">
      {steps.map((step, i) => {
        const isActive = step.num === currentStep;
        const isCompleted = step.num < currentStep;

        return (
          <div key={step.num} className="flex items-center">
            <button
              type="button"
              onClick={() => onStepClick?.(step.num)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-[#B76E79]/20"
                  : "hover:bg-white/5"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-sans font-semibold transition-all ${
                  isActive
                    ? "bg-[#B76E79] text-white"
                    : isCompleted
                      ? "bg-[#B76E79] text-white"
                      : "bg-white/10 text-white/40"
                }`}
              >
                {isCompleted ? "✓" : step.num}
              </div>
              <span
                className={`hidden lg:inline font-sans text-[13px] ${
                  isActive
                    ? "text-white font-semibold"
                    : isCompleted
                      ? "text-white/70"
                      : "text-white/35"
                }`}
              >
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={`w-4 md:w-8 h-px mx-1 ${
                  step.num < currentStep ? "bg-[#B76E79]" : "bg-white/15"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
