interface LogoProps {
  onCoral?: boolean;
  size?: "sm" | "md";
  href?: string;
}

export function HeartMark({ color, size = 28 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={{ width: size, height: size, display: "block" }}>
      <path d="M16 24s-9-5.5-9-11a5 5 0 0110 0 5 5 0 0110 0c0 5.5-9 11-9 11Z" fill={color} />
      <path d="M11 15c1-1.5 3-2 4.5-0.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ onCoral = false, size = "md", href = "/" }: LogoProps) {
  const height = size === "sm" ? 42 : 56;
  const iconSize = size === "sm" ? 22 : 28;
  const fontSize = size === "sm" ? 20 : 24;

  if (onCoral) {
    return (
      <a
        href={href}
        style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        aria-label="Kokoro"
      >
        <HeartMark color="#fff" size={iconSize} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#fff",
            fontWeight: 700,
            fontSize,
            letterSpacing: 0.6,
            lineHeight: 1,
          }}
        >
          kokoro
        </span>
      </a>
    );
  }

  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }} aria-label="Kokoro">
      <img
        src="/Logo 2C.png"
        alt="Kokoro"
        style={{
          height,
          width: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </a>
  );
}
