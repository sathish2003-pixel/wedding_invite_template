interface FloralBorderProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export function FloralBorder({
  color = "#D4A574",
  flip = false,
  className = "",
}: FloralBorderProps) {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 80"
        fill="none"
        className="w-full h-[60px] md:h-[80px]"
        preserveAspectRatio="none"
      >
        {/* Vine line */}
        <path
          d="M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        {/* Leaf clusters */}
        {[150, 450, 750, 1050].map((x) => (
          <g key={x}>
            <ellipse
              cx={x}
              cy="35"
              rx="12"
              ry="6"
              fill={color}
              opacity="0.3"
              transform={`rotate(-30 ${x} 35)`}
            />
            <ellipse
              cx={x + 10}
              cy="38"
              rx="10"
              ry="5"
              fill={color}
              opacity="0.25"
              transform={`rotate(20 ${x + 10} 38)`}
            />
            <circle cx={x + 5} cy="40" r="3" fill={color} opacity="0.4" />
          </g>
        ))}
        {/* Small dots along vine */}
        {[75, 225, 375, 525, 675, 825, 975, 1125].map((x) => (
          <circle key={x} cx={x} cy="40" r="2" fill={color} opacity="0.25" />
        ))}
      </svg>
    </div>
  );
}
