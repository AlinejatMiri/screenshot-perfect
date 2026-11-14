import { Link } from "@tanstack/react-router";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex shrink-0 items-center gap-2"
      aria-label="Poor Women Support Organization home"
    >
      <svg
        viewBox="0 0 78 52"
        role="img"
        aria-label="PWSO emblem"
        className="h-10 w-[60px] shrink-0 sm:h-12 sm:w-[70px]"
      >
        <circle cx="22" cy="26" r="19" fill="#f7f8fa" stroke="#d8e1ea" strokeWidth="1.5" />
        <circle
          cx="22"
          cy="26"
          r="16"
          fill="none"
          stroke="#159447"
          strokeWidth="4"
          strokeDasharray="19 82"
          transform="rotate(-90 22 26)"
        />
        <circle
          cx="22"
          cy="26"
          r="16"
          fill="none"
          stroke="#f2c230"
          strokeWidth="4"
          strokeDasharray="19 82"
          transform="rotate(0 22 26)"
        />
        <circle
          cx="22"
          cy="26"
          r="16"
          fill="none"
          stroke="#ef6b32"
          strokeWidth="4"
          strokeDasharray="19 82"
          transform="rotate(90 22 26)"
        />
        <circle
          cx="22"
          cy="26"
          r="16"
          fill="none"
          stroke="#2183c4"
          strokeWidth="4"
          strokeDasharray="19 82"
          transform="rotate(180 22 26)"
        />
        <circle cx="22" cy="20" r="3" fill="#25345c" />
        <path
          d="M16 33c1.4-5 3.4-7 6-7s4.6 2 6 7M22 27v9m-5-5 5 3 5-3"
          fill="none"
          stroke="#25345c"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <rect x="47" y="4" width="13" height="20" rx="1.5" fill="#1769aa" />
        <rect x="61" y="4" width="13" height="20" rx="1.5" fill="#1769aa" />
        <rect x="47" y="26" width="13" height="20" rx="1.5" fill="#1769aa" />
        <rect x="61" y="26" width="13" height="20" rx="1.5" fill="#1769aa" />
        <g
          fill="white"
          fontFamily="Arial, sans-serif"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
        >
          <text x="53.5" y="18">
            P
          </text>
          <text x="67.5" y="18">
            W
          </text>
          <text x="53.5" y="40">
            S
          </text>
          <text x="67.5" y="40">
            O
          </text>
        </g>
      </svg>
      <span
        className={`max-w-40 font-display leading-tight sm:max-w-48 ${inverted ? "text-navy-foreground" : "text-heading"}`}
      >
        <span className="block text-xs font-bold sm:text-sm">Poor Women</span>
        <span className="block text-xs font-bold sm:text-sm">Support Organization</span>
        <span
          className={`mt-0.5 block text-[10px] font-medium ${inverted ? "text-navy-foreground/70" : "text-muted-foreground"}`}
        >
          Since 2017
        </span>
      </span>
    </Link>
  );
}
