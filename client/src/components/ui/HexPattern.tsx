import type { CSSProperties } from "react";

interface HexPatternProps {
  opacity?: number;
  id?: string;
}

export default function HexPattern({
  opacity = 0.06,
  id = "hex",
}: HexPatternProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity } as CSSProperties}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="60"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="30,2 58,17 58,47 30,62 2,47 2,17"
            fill="none"
            stroke="#e8a820"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}