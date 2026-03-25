"use client";

interface PillOption {
  value: string;
  label: string;
}

interface PillRadioProps {
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "dark" | "light";
}

export function PillRadio({
  options,
  value,
  onChange,
  variant = "dark",
}: PillRadioProps) {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              px-4 py-2 rounded-full font-sans text-[14px] min-h-[44px]
              transition-all duration-200 border
              ${
                isActive
                  ? isDark
                    ? "bg-[#B76E79] text-white border-[#B76E79] font-semibold"
                    : "bg-white text-[#B76E79] border-white font-semibold"
                  : isDark
                    ? "bg-transparent text-white/50 border-white/20 hover:border-white/40"
                    : "bg-transparent text-white/60 border-white/25 hover:border-white/40"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
