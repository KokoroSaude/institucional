import { Logo } from "./Logo";
import { useIsMobile } from "../hooks/useIsMobile";
import { COLORS, FONT_SANS, NAV_ITEMS } from "../theme";

export function SiteFooter() {
  const mobile = useIsMobile();

  return (
    <footer
      style={{
        background: COLORS.footer,
        padding: mobile ? "32px 24px" : "36px clamp(20px,5vw,60px)",
        borderTop: "1px solid #1f1f1f",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: mobile ? "flex-start" : "center",
          gap: 20,
        }}
      >
        <Logo variant="dark" href="/" size="sm" />
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {NAV_ITEMS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              style={{
                color: "#555",
                textDecoration: "none",
                fontSize: 13,
                fontFamily: FONT_SANS,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#aaa")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              {n.label}
            </a>
          ))}
        </div>
        <span style={{ color: "#3a3a3a", fontSize: 12, fontFamily: FONT_SANS }}>
          © 2025 Kokoro · Todos os direitos reservados
        </span>
      </div>
    </footer>
  );
}
