"use client";

interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-3 cursor-pointer"
    >
      <div
        className={`
          relative w-14 h-7 rounded-full transition-colors duration-300
          ${enabled ? "bg-[#B76E79]" : "bg-gray-600"}
        `}
      >
        <div
          className={`
            absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md
            transition-transform duration-300
            ${enabled ? "translate-x-7" : "translate-x-0"}
          `}
        />
      </div>
      {label && (
        <span className="font-sans text-[15px] text-white/80">{label}</span>
      )}
    </button>
  );
}
