import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useIsMobile } from "../hooks/useIsMobile";
import { COLORS, FONT_SANS, NAV_ITEMS } from "../theme";

interface SiteNavProps {
  /** Nav sempre coral (páginas internas sem hero) */
  solid?: boolean;
}

export function SiteNav({ solid = false }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!mobile) setOpen(false);
  }, [mobile]);

  const filled = solid || scrolled || open;
  const bg = filled ? "rgba(242,107,91,0.97)" : "transparent";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: bg,
        backdropFilter: filled ? "blur(14px)" : "none",
        boxShadow: filled ? "0 2px 20px rgba(0,0,0,0.15)" : "none",
        transition: "background 0.3s, box-shadow 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px,5vw,48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <Logo onCoral href="/" />

        {!mobile && (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={{
                  color: "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontFamily: FONT_SANS,
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.88)")}
              >
                {n.label}
              </a>
            ))}
            <a
              href="/#contato"
              style={{
                background: "#fff",
                color: COLORS.coral,
                padding: "8px 20px",
                borderRadius: 100,
                fontFamily: FONT_SANS,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              Falar com a equipe
            </a>
          </div>
        )}

        {mobile && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                  transition: "transform 0.25s, opacity 0.25s",
                  transform: open
                    ? i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : i === 2
                        ? "rotate(-45deg) translate(5px,-5px)"
                        : ""
                    : "",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        )}
      </div>

      {mobile && (
        <div
          style={{
            maxHeight: open ? 400 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease",
            background: "rgba(242,107,91,0.97)",
            borderTop: open ? "1px solid rgba(255,255,255,0.15)" : "none",
          }}
        >
          <div style={{ padding: "12px 24px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  color: "#fff",
                  fontFamily: FONT_SANS,
                  fontSize: 18,
                  fontWeight: 500,
                  padding: "12px 0",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/#contato"
              onClick={() => setOpen(false)}
              style={{
                marginTop: 16,
                background: "#fff",
                color: COLORS.coral,
                padding: "14px 24px",
                borderRadius: 100,
                fontFamily: FONT_SANS,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Falar com a equipe
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
