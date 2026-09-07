/** A family of engraved signal studies, shared by the observatory's rooms. */
export default function SignalStudy({
  variant = 0,
  className = "",
}: {
  variant?: number;
  className?: string;
}) {
  return (
    <svg
      className={`signal-study ${className}`}
      viewBox="0 0 300 260"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M150 8v12m0 220v12M18 130h12m240 0h12"
        stroke="currentColor"
        opacity=".35"
      />
      <g
        stroke="currentColor"
        transform={`translate(150 130) rotate(${[-28, 0, 24, -15, 0][variant % 5]})`}
      >
        {Array.from({ length: 22 }, (_, i) => {
          const angle = (i / 22) * Math.PI * 2;
          return (
            <ellipse
              key={i}
              cx={variant === 4 ? Math.cos(angle) * 30 : 0}
              cy={variant === 0 ? Math.sin(angle) * 31 : 0}
              rx={variant === 1 ? 105 : 74 + Math.cos(angle) * 27}
              ry={
                variant === 1
                  ? Math.max(4, Math.abs(Math.cos(angle)) * 94)
                  : 48 + Math.cos(angle) * 22
              }
              transform={`rotate(${variant === 2 ? i * 8 : variant === 3 ? i * 3 : 0})`}
              opacity={0.2 + (i / 22) * 0.35}
            />
          );
        })}
      </g>
      <circle cx="150" cy="130" r="2" fill="currentColor" opacity=".6" />
    </svg>
  );
}
