interface MughalArchProps {
  color?: string;
  size?: number;
  className?: string;
}

export function MughalArch({
  color = "#C9A84C",
  size = 200,
  className = "",
}: MughalArchProps) {
  const h = size * 1.2;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 200 240"
      fill="none"
      className={className}
    >
      {/* Outer arch */}
      <path
        d="M20 240 V100 Q20 20 100 20 Q180 20 180 100 V240"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Inner arch */}
      <path
        d="M40 240 V110 Q40 40 100 40 Q160 40 160 110 V240"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      {/* Point at top */}
      <path
        d="M95 22 L100 10 L105 22"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {/* Geometric stars */}
      {[
        [100, 80],
        [70, 130],
        [130, 130],
        [100, 180],
      ].map(([cx, cy], i) => (
        <g key={i} opacity="0.3">
          <polygon
            points={`${cx},${cy - 8} ${cx + 4},${cy - 2} ${cx + 8},${cy - 2} ${cx + 5},${cy + 2} ${cx + 6},${cy + 8} ${cx},${cy + 4} ${cx - 6},${cy + 8} ${cx - 5},${cy + 2} ${cx - 8},${cy - 2} ${cx - 4},${cy - 2}`}
            fill={color}
          />
        </g>
      ))}
    </svg>
  );
}
