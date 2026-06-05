import { useState } from "react";
import { ChatMock } from "../components/ChatMock";
import { Label } from "../components/Label";
import { Logo } from "../components/Logo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { useInView } from "../hooks/useInView";
import { useIsMobile } from "../hooks/useIsMobile";
import { COLORS, FONT_SANS, FONT_SERIF } from "../theme";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stat    { value: string; label: string; source: string }
interface Feature { icon: string; title: string; desc: string }

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: Stat[] = [
  { value: "83MM",    label: "brasileiros com doença crônica",     source: "IBGE 2020" },
  { value: "50%",     label: "não tomam medicação corretamente",   source: "OMS 2019"  },
  { value: "R$1,68B", label: "custo anual de internações evitáveis", source: "UFF 2019" },
];

const FEATURES: Feature[] = [
  { icon: "💬", title: "100% no WhatsApp",      desc: "Sem app para baixar. O paciente já está lá — a Kokoro chega até ele." },
  { icon: "🧠", title: "Jornada personalizada", desc: "Perfil comportamental com base na Teoria do Comportamento Planejado (Ajzen)." },
  { icon: "🔔", title: "Lembretes inteligentes",desc: "Não é só um alarme. São nudges contextuais que respeitam a rotina de cada pessoa." },
  { icon: "📊", title: "Portal para parceiros", desc: "Acompanhe adesão, interações e indicadores em tempo real por farmácia." },
  { icon: "🔒", title: "LGPD by design",        desc: "Consentimento versionado, dados minimizados e trilha de auditoria desde o primeiro dia." },
  { icon: "🤝", title: "IA com guardrails",     desc: "IA para empatia e linguagem. Fluxos críticos sempre determinísticos e auditáveis." },
];

const F = FONT_SANS;
const SERIF = FONT_SERIF;
const CORAL = COLORS.coral;

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const mobile = useIsMobile();
  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(155deg,#F57170 0%,#E85F5F 40%,#D94F4F 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: mobile ? "100px 24px 60px" : "100px clamp(20px,5vw,60px) 60px",
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div style={{ position: "absolute", top: -120, right: -100, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 720, position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#fff", fontSize: 12, fontFamily: F, fontWeight: 500, letterSpacing: 0.3 }}>Saúde é mais que um lembrete</span>
        </div>

        <h1 style={{ fontFamily: SERIF, fontSize: mobile ? 42 : "clamp(44px,6vw,76px)", lineHeight: 1.1, color: "#fff", margin: "0 0 20px", fontWeight: 400, letterSpacing: -1.5 }}>
          Mais adesão.<br />
          <span style={{ fontStyle: "italic", opacity: 0.85 }}>Mais vida.</span>
        </h1>

        <p style={{ color: "rgba(255,255,255,0.82)", fontSize: mobile ? 16 : "clamp(16px,2vw,20px)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto 36px", fontFamily: F }}>
          A Kokoro acompanha pacientes crônicos pelo WhatsApp — com jornadas personalizadas, lembretes inteligentes e reengajamento ativo. Para farmácias e redes de saúde que querem resultados reais.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contato" style={{ background: "#fff", color: CORAL, padding: mobile ? "13px 28px" : "14px 32px", borderRadius: 100, fontFamily: F, fontWeight: 700, fontSize: mobile ? 15 : 16, textDecoration: "none", transition: "transform 0.15s, box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            Quero ser parceiro
          </a>
          <a href="#solucao" style={{ background: "transparent", color: "#fff", padding: mobile ? "13px 28px" : "14px 32px", borderRadius: 100, fontFamily: F, fontWeight: 600, fontSize: mobile ? 15 : 16, textDecoration: "none", border: "2px solid rgba(255,255,255,0.5)", transition: "border-color 0.2s, background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}>
            Ver como funciona
          </a>
        </div>

        {/* chat bubble */}
        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "18px 18px 18px 4px", padding: "14px 20px", maxWidth: mobile ? "100%" : 340, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", textAlign: "left" }}>
            <p style={{ margin: 0, fontSize: 14, color: "#333", fontFamily: F, lineHeight: 1.55 }}>
              Oi, João! 👋 Vi que você precisa tomar seus remédios todos os dias. Me conta: como você se sente em relação ao seu tratamento?
            </p>
            <span style={{ fontSize: 11, color: "#aaa", display: "block", marginTop: 6, fontFamily: F }}>Kokoro · agora</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  return (
    <section id="problema" ref={ref} style={{ background: "#1a1a1a", padding: mobile ? "60px 24px" : "80px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label text="O problema" />
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 28 : "clamp(28px,4vw,48px)", color: "#fff", margin: "0 0 40px", lineHeight: 1.2, maxWidth: 560 }}>
          Metade dos pacientes crônicos não segue o tratamento
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: mobile ? 28 : 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              borderLeft: "3px solid " + CORAL, paddingLeft: 20,
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ${i * 0.15}s, transform 0.6s ${i * 0.15}s`,
            }}>
              <div style={{ fontFamily: SERIF, fontSize: mobile ? 44 : "clamp(36px,4vw,56px)", color: CORAL, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "#ccc", fontSize: 15, fontFamily: F, margin: "8px 0 4px", lineHeight: 1.4 }}>{s.label}</div>
              <div style={{ color: "#555", fontSize: 12, fontFamily: F }}>{s.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solution ─────────────────────────────────────────────────────────────────
function Solution() {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  return (
    <section id="solucao" ref={ref} style={{ background: "#faf8f6", padding: mobile ? "64px 24px" : "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 48 : 80, alignItems: "center" }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)", transition: "opacity 0.7s, transform 0.7s" }}>
            <Label text="Como funciona" />
            <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 30 : "clamp(28px,3.5vw,44px)", color: "#1a1a1a", margin: "0 0 20px", lineHeight: 1.2 }}>
              Uma jornada inteligente, direto no WhatsApp
            </h2>
            <p style={{ color: "#555", fontSize: mobile ? 15 : 17, lineHeight: 1.7, fontFamily: F, margin: "0 0 28px" }}>
              A Kokoro não manda só lembretes. Ela constrói um perfil comportamental do paciente e adapta os nudges à realidade de cada um — respeitando hábitos, barreiras e o momento de vida.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Convite → Onboarding → Rotina ativa", "Check-in diário adaptativo", "Reengajamento inteligente ao sair do trilho", "Portal de acompanhamento para o parceiro"].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: CORAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: F, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ color: "#333", fontSize: 15, fontFamily: F, lineHeight: 1.4 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)", transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s" }}>
            <ChatMock />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  return (
    <section id="diferenciais" ref={ref} style={{ background: "#fff", padding: mobile ? "64px 24px" : "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label text="Diferenciais" />
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 30 : "clamp(28px,3.5vw,44px)", color: "#1a1a1a", margin: "0 0 48px", lineHeight: 1.2, maxWidth: 480 }}>
          Por que a Kokoro é diferente
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: mobile ? "24px 20px" : "28px 24px", borderRadius: 14, border: "1.5px solid #f0ece8",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ${i * 0.08}s, transform 0.5s ${i * 0.08}s`,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = CORAL; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 28px rgba(242,107,91,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#f0ece8"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: SERIF, fontSize: 19, color: "#1a1a1a", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.65, fontFamily: F, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────
function Partners() {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  return (
    <section id="parceiros" ref={ref} style={{ background: "#1a1a1a", padding: mobile ? "64px 24px" : "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 48 : 80, alignItems: "center" }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s, transform 0.7s" }}>
            <Label text="Para parceiros" />
            <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 30 : "clamp(28px,3.5vw,44px)", color: "#fff", margin: "0 0 20px", lineHeight: 1.2 }}>
              Sua farmácia, com a inteligência da Kokoro
            </h2>
            <p style={{ color: "#aaa", fontSize: mobile ? 15 : 16, lineHeight: 1.7, fontFamily: F, margin: "0 0 28px" }}>
              White label completo, onboarding padronizado, número de WhatsApp dedicado ou compartilhado — e um portal para acompanhar cada paciente em tempo real.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                ["Número dedicado",  "WhatsApp exclusivo da sua marca"],
                ["Onboarding rápido","Ativo em dias, não meses"],
                ["RBAC por tenant",  "Controle total de usuários"],
                ["SLA garantido",    "Disponibilidade e suporte"],
              ].map(([t, d], i) => (
                <div key={i} style={{ background: "#262626", borderRadius: 12, padding: "18px 16px" }}>
                  <div style={{ color: CORAL, fontFamily: F, fontSize: 13, fontWeight: 700, marginBottom: 5 }}>{t}</div>
                  <div style={{ color: "#777", fontFamily: F, fontSize: 12, lineHeight: 1.4 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(32px)", transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s" }}>
            <div style={{ background: "#262626", borderRadius: 20, padding: mobile ? 24 : 32, border: "1px solid #333" }}>
              <div style={{ color: "#666", fontFamily: F, fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 20 }}>Dashboard · Farmácia Piloto</div>
              {[
                ["Taxa de onboarding",    "87%", "+12% vs mês anterior"],
                ["Check-in diário",       "74%", "acima da meta"],
                ["Pacientes ativos",      "312", "de 358 cadastrados"],
                ["Reengajados este mês",  "28",  "voltaram ao trilho"],
              ].map(([l, v, s], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: i < 3 ? "1px solid #333" : "none" }}>
                  <span style={{ color: "#aaa", fontSize: 14, fontFamily: F }}>{l}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: CORAL, fontFamily: SERIF, fontSize: 22 }}>{v}</div>
                    <div style={{ color: "#555", fontSize: 11, fontFamily: F }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [company, setCompany] = useState("");
  const [sent, setSent]       = useState(false);
  const mobile = useIsMobile();

  return (
    <section id="contato" style={{ background: "linear-gradient(135deg,#F57170 0%,#D94F4F 100%)", padding: mobile ? "72px 24px" : "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 8 }}>
          <Logo onCoral size="lg" />
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 34 : "clamp(32px,4vw,52px)", color: "#fff", margin: "16px 0", lineHeight: 1.1 }}>
          Pronto para começar?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.82)", fontSize: mobile ? 16 : 18, fontFamily: F, lineHeight: 1.6, margin: "0 0 36px" }}>
          Fale com a equipe Kokoro e veja como podemos levar mais adesão para os seus pacientes.
        </p>

        {sent ? (
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 16, padding: "32px 24px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <p style={{ color: "#fff", fontFamily: F, fontSize: 17, margin: 0 }}>Recebemos seu contato! A equipe vai falar com você em breve.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {([
              { val: name,    set: setName,    ph: "Seu nome",           type: "text"  },
              { val: email,   set: setEmail,   ph: "Seu e-mail",         type: "email" },
              { val: company, set: setCompany, ph: "Farmácia ou empresa", type: "text"  },
            ] as { val: string; set: (v: string) => void; ph: string; type: string }[]).map(({ val, set, ph, type }, i) => (
              <input key={i} type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph}
                style={{
                  background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.35)",
                  borderRadius: 12, padding: "14px 18px", fontSize: 15, color: "#fff",
                  fontFamily: F, outline: "none", width: "100%", boxSizing: "border-box",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#fff")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}
              />
            ))}
            <button onClick={() => { if (name && email) setSent(true); }}
              style={{ background: "#fff", color: CORAL, border: "none", borderRadius: 100, padding: "15px 32px", fontSize: 16, fontWeight: 700, fontFamily: F, cursor: "pointer", marginTop: 4, transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.boxShadow = ""; }}>
              Entrar em contato
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <Hero />
      <Stats />
      <Solution />
      <Features />
      <Partners />
      <CTA />
      <SiteFooter />
    </>
  );
}
