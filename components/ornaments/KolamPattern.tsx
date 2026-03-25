interface KolamPatternProps {
  color?: string;
  className?: string;
}

export function KolamPattern({
  color = "#2D5A27",
  className = "",
}: KolamPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${color}26 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}
