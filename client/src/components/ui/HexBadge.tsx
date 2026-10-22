
import type { ReactNode } from "react";

interface HexBadgeProps {
  children: ReactNode;
  size?: number;
}

export default function HexBadge({
  children,
  size = 80,
}: HexBadgeProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size * 1.15,
      }}
    >
      <svg
        viewBox="0 0 100 115"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="50,5 95,28 95,87 50,110 5,87 5,28"
          fill="rgba(232,168,32,0.08)"
          stroke="#e8a820"
          strokeWidth="2"
        />
      </svg>

      <span className="relative z-10 text-[#e8a820]">
        {children}
      </span>
    </div>
  );
}
