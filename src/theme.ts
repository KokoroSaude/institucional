export const FONT_SANS = "'DM Sans', sans-serif";
export const FONT_SERIF = "'DM Serif Display', Georgia, serif";

export const COLORS = {
  coral: "#F57170",
  coralMid: "#E85F5F",
  coralDark: "#D94F4F",
  white: "#fff",
  ink: "#1a1a1a",
  inkMuted: "#555",
  cream: "#faf8f6",
  dark: "#1a1a1a",
  footer: "#111",
} as const;

export const NAV_ITEMS = [
  { label: "Problema", href: "/#problema" },
  { label: "Solução", href: "/#solucao" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Para parceiros", href: "/#parceiros" },
] as const;

/** Portal do parceiro / área logada (defina VITE_LOGIN_URL no .env) */
export const LOGIN_URL =
  (import.meta.env.VITE_LOGIN_URL as string | undefined)?.trim() || "https://portal.kokorosaude.com.br/login";
