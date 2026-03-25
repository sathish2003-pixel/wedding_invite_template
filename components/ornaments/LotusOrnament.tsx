interface LotusOrnamentProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LotusOrnament({
  size = 48,
  color = "#B76E79",
  className = "",
}: LotusOrnamentProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 80 48"
      fill="none"
      className={className}
    >
      {/* Center petal */}
      <ellipse cx="40" cy="28" rx="8" ry="20" fill={color} opacity="0.9" />
      {/* Left petals */}
      <ellipse
        cx="28"
        cy="30"
        rx="7"
        ry="16"
        fill={color}
        opacity="0.7"
        transform="rotate(-20 28 30)"
      />
      <ellipse
        cx="18"
        cy="34"
        rx="6"
        ry="12"
        fill={color}
        opacity="0.5"
        transform="rotate(-40 18 34)"
      />
      {/* Right petals */}
      <ellipse
        cx="52"
        cy="30"
        rx="7"
        ry="16"
        fill={color}
        opacity="0.7"
        transform="rotate(20 52 30)"
      />
      <ellipse
        cx="62"
        cy="34"
        rx="6"
        ry="12"
        fill={color}
        opacity="0.5"
        transform="rotate(40 62 34)"
      />
      {/* Base */}
      <ellipse cx="40" cy="42" rx="14" ry="4" fill={color} opacity="0.3" />
    </svg>
  );
}
