"use client";

interface MandalaBgProps {
  color?: string;
  className?: string;
}

export function MandalaBg({
  color = "#D4A574",
  className = "",
}: MandalaBgProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-[600px] md:w-[900px] opacity-[0.07] animate-spin-slow"
        fill="none"
      >
        {/* Outer ring */}
        <circle cx="200" cy="200" r="190" stroke={color} strokeWidth="0.5" />
        <circle cx="200" cy="200" r="170" stroke={color} strokeWidth="0.5" />
        <circle cx="200" cy="200" r="140" stroke={color} strokeWidth="0.5" />
        <circle cx="200" cy="200" r="100" stroke={color} strokeWidth="0.5" />
        <circle cx="200" cy="200" r="60" stroke={color} strokeWidth="0.5" />

        {/* Lotus petals — outer ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <ellipse
              key={`outer-${i}`}
              cx="200"
              cy="30"
              rx="15"
              ry="40"
              fill={color}
              opacity="0.15"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}

        {/* Inner petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <ellipse
              key={`inner-${i}`}
              cx="200"
              cy="80"
              rx="10"
              ry="30"
              fill={color}
              opacity="0.12"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}

        {/* Center flower */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <ellipse
              key={`center-${i}`}
              cx="200"
              cy="150"
              rx="8"
              ry="20"
              fill={color}
              opacity="0.2"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}

        <circle cx="200" cy="200" r="10" fill={color} opacity="0.2" />
      </svg>
    </div>
  );
}
