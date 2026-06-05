interface LogoProps {
  /** Fundo coral (nav, CTA) — logo branco */
  onCoral?: boolean;
  /** light = fundos claros (1C) · dark = fundos escuros (2C) · onCoral = branco em coral */
  variant?: "light" | "dark" | "onCoral";
  size?: "sm" | "md" | "lg";
  /** Exibe lockup completo com tagline (só Logo 1C em fundos claros) */
  showTagline?: boolean;
  href?: string;
}

const HEIGHT = { sm: 40, md: 48, lg: 96 } as const;

/** Logo 1C — coral + tagline (fundos claros) */
const LOGO_LIGHT = "/Logo_1C-transparent.png";
/** Logo 2C — coral (fundos escuros; base para versão branca no coral) */
const LOGO_DARK = "/Logo_2C-transparent.png";

export function HeartMark({ color, size = 28 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={{ width: size, height: size, display: "block" }}>
      <path d="M16 24s-9-5.5-9-11a5 5 0 0110 0 5 5 0 0110 0c0 5.5-9 11-9 11Z" fill={color} />
      <path d="M11 15c1-1.5 3-2 4.5-0.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({
  onCoral = false,
  variant,
  size = "md",
  showTagline = false,
  href = "/",
}: LogoProps) {
  const mode = onCoral ? "onCoral" : (variant ?? "light");
  const src = mode === "light" ? LOGO_LIGHT : LOGO_DARK;
  const height = showTagline && mode === "light" ? HEIGHT.lg : HEIGHT[size];
  const cropTagline = mode === "light" && !showTagline;

  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        lineHeight: 0,
        maxWidth: showTagline ? 280 : mode === "dark" || mode === "onCoral" ? 200 : 160,
      }}
      aria-label="Kokoro"
    >
      <span
        style={{
          display: "block",
          height,
          overflow: cropTagline ? "hidden" : "visible",
          borderRadius: 2,
        }}
      >
        <img
          src={src}
          alt="Kokoro"
          width={mode === "light" ? height : Math.round(height * 1.5)}
          height={height}
          style={{
            height: "100%",
            width: "auto",
            maxWidth: "100%",
            display: "block",
            objectFit: "contain",
            objectPosition: cropTagline ? "top center" : "center",
            filter: mode === "onCoral" ? "brightness(0) invert(1)" : "none",
          }}
        />
      </span>
    </a>
  );
}
