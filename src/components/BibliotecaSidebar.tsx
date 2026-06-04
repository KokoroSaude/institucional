import { BibliotecaPersonalization } from "./BibliotecaPersonalization";
import type { BibliotecaVars } from "../biblioteca/variables";

interface BibliotecaSidebarProps {
  vars: BibliotecaVars;
  onVarsChange: (vars: BibliotecaVars) => void;
}

const ETAPAS = [
  { id: "intro", num: "—", label: "Introdução" },
  { id: "onboarding", num: "01", label: "Onboarding" },
  { id: "lembrete", num: "02", label: "Lembretes" },
  { id: "lembrete_multi", num: "02b", label: "Múltiplos medic." },
  { id: "followup", num: "03", label: "Follow-up" },
  { id: "reengajamento", num: "04", label: "Reengajamento" },
  { id: "marcos", num: "05", label: "Marcos D7/D14/D30" },
  { id: "pausa", num: "06", label: "Pausa e Retomada" },
  { id: "optout", num: "07", label: "Opt-out" },
] as const;

export function BibliotecaSidebar({ vars, onVarsChange }: BibliotecaSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <span className="sb-logo">Kokoro</span>
        <span className="sb-sub">Biblioteca de Mensagens</span>
      </div>

      <BibliotecaPersonalization vars={vars} onChange={onVarsChange} />

      <div className="sb-tone-picker">
        <div className="sb-tone-label">Tom de voz ativo</div>
        <button type="button" className="tone-btn active" data-tone="acolhedor" onClick={() => window.setTone("acolhedor")}>
          <span className="tone-dot acolhedor" /> Acolhedor
        </button>
        <button type="button" className="tone-btn" data-tone="motivacional" onClick={() => window.setTone("motivacional")}>
          <span className="tone-dot motivacional" /> Motivacional
        </button>
        <button type="button" className="tone-btn" data-tone="direto" onClick={() => window.setTone("direto")}>
          <span className="tone-dot direto" /> Direto
        </button>
      </div>

      <nav className="sb-nav">
        <div className="sb-nav-label">Etapas</div>
        {ETAPAS.map((e) => (
          <button
            key={e.id}
            type="button"
            className="nav-item"
            data-section={e.id}
            onClick={() => window.bibliotecaScrollTo(e.id)}
          >
            <span className="nav-num">{e.num}</span> {e.label}
          </button>
        ))}
      </nav>

      <div className="sb-footer">
        <div className="sb-footer-note">
          Baseado em Nudge
          <br />
          Thaler &amp; Sunstein
        </div>
      </div>
    </aside>
  );
}
