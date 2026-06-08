import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { useIsMobile } from "../hooks/useIsMobile";
import { COLORS, FONT_SANS, FONT_SERIF } from "../theme";

interface LegalPageLayoutProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, updatedAt, children }: LegalPageLayoutProps) {
  const mobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream }}>
      <SiteNav solid />
      <main
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: mobile ? "100px 24px 64px" : "120px clamp(24px,5vw,48px) 80px",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13,
            color: COLORS.inkMuted,
            margin: "0 0 8px",
          }}
        >
          Atualizado em {updatedAt}
        </p>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: mobile ? 32 : 40,
            fontWeight: 400,
            color: COLORS.ink,
            margin: "0 0 32px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <article
          className="legal-prose"
          style={{
            fontFamily: FONT_SANS,
            fontSize: 16,
            lineHeight: 1.75,
            color: COLORS.ink,
          }}
        >
          {children}
        </article>
      </main>
      <SiteFooter />
      <style>{`
        .legal-prose h2 {
          font-family: ${FONT_SERIF};
          font-size: 1.35rem;
          font-weight: 400;
          margin: 2rem 0 0.75rem;
          color: ${COLORS.ink};
        }
        .legal-prose p { margin: 0 0 1rem; }
        .legal-prose ul, .legal-prose ol { margin: 0 0 1rem; padding-left: 1.25rem; }
        .legal-prose li { margin-bottom: 0.5rem; }
        .legal-prose a { color: ${COLORS.coralDark}; }
      `}</style>
    </div>
  );
}
