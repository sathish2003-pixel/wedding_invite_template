"use client";

type DeviceMode = "phone" | "tablet" | "desktop";

interface DeviceToggleProps {
  mode: DeviceMode;
  onChange: (mode: DeviceMode) => void;
}

const devices = [
  { id: "phone" as DeviceMode, icon: "📱", label: "Phone" },
  { id: "tablet" as DeviceMode, icon: "📟", label: "Tablet" },
  { id: "desktop" as DeviceMode, icon: "💻", label: "Desktop" },
];

export function DeviceToggle({ mode, onChange }: DeviceToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
      {devices.map((d) => (
        <button
          key={d.id}
          onClick={() => onChange(d.id)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-sans text-[12px] transition-all ${
            mode === d.id
              ? "bg-[#B76E79] text-white"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          <span>{d.icon}</span>
          <span className="hidden md:inline">{d.label}</span>
        </button>
      ))}
    </div>
  );
}
