import { useEffect, useRef, useState } from "react";
import { Label } from "../components/Label";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { useInView } from "../hooks/useInView";
import { useIsMobile } from "../hooks/useIsMobile";
import { COLORS, FONT_SANS, FONT_SERIF } from "../theme";

const F = FONT_SANS;
const SERIF = FONT_SERIF;
const CORAL = COLORS.coral;

const PRINCIPLES = [
  { num: "01", icon: "🔔", title: "Feedback imediato", sub: "Tornar visível o progresso que a biologia esconde" },
  { num: "02", icon: "👥", title: "Normas sociais", sub: "O que pessoas parecidas com você fazem" },
  { num: "03", icon: "⏱", title: "Decisão difícil", sub: "Por que medicação crônica é o pior caso — e o mais importante" },
  { num: "04", icon: "✂️", title: "Simplificação radical", sub: "Reduzir o custo cognitivo de responder" },
  { num: "05", icon: "🏆", title: "Comprometimento", sub: "Tornar a meta visível e próxima — o streak como âncora" },
  { num: "06", icon: "😊", title: "Sinal emocional", sub: "O emoticon que eliminou o efeito bumerangue" },
];

const RULES = [
  {
    n: "01",
    t: "Norma social só no sentido ascendente",
    d: 'Nunca diga "muita gente esquece". Isso valida o comportamento ruim. Só use comparação com quem está indo bem.',
  },
  {
    n: "02",
    t: "Uma pergunta por mensagem",
    d: "Cada pergunta adicional divide a atenção e reduz a taxa de resposta. O check-in deve ser a coisa mais fácil do dia do paciente.",
  },
  {
    n: "03",
    t: "Varie o reforço positivo",
    d: 'A mesma mensagem de parabéns todo dia vira ruído em duas semanas. Mínimo de 6 variações do "Ótimo!", rotacionadas aleatoriamente.',
  },
];

type DetailCard = {
  num: string;
  title: string;
  pull: string;
  why: string;
  good: string[];
  bad: string[];
  warn?: string;
};

const DETAILS: DetailCard[] = [
  {
    num: "01",
    title: "Feedback imediato — o maior gap na adesão",
    pull: '"A melhor forma de ajudar a melhorar o desempenho dos humanos é dando feedback. Sistemas bem projetados informam às pessoas o que estão fazendo certo e quando estão cometendo erros."',
    why: "Tomar medicamento tem custo imediato e benefício invisível no longo prazo. O Kokoro fecha esse gap com feedback positivo instantâneo a cada check-in.",
    good: ["Metformina tomada! ✓ Dia 12 seguido. Seu corpo agradece.", "Check-in registrado. Você está no caminho certo, João."],
    bad: ["Não esqueça de tomar seu remédio hoje."],
  },
  {
    num: "02",
    title: "Normas sociais — cuidado com o efeito bumerangue",
    pull: '"Nunca deixe que as pessoas saibam que já estão se comportando melhor do que a norma social — ou haverá efeito bumerangue."',
    why: "Mostrar que a maioria dos pacientes toma consistentemente ativa conformidade social. Combine o dado social com reforço positivo sempre.",
    good: [
      "9 em cada 10 pacientes que chegaram ao D30 continuam na rotina. Você está no D14 — metade do caminho!",
      "A maioria dos pacientes retoma em até 2 dias após uma pausa. Consegue voltar amanhã?",
    ],
    bad: ["Muita gente esquece de tomar. Tudo bem se você também esquecer."],
    warn: '⚠️ Nunca use norma social descendente. Só use norma ascendente — o que os bem-sucedidos fazem.',
  },
  {
    num: "03",
    title: "Decisão difícil — por que medicação crônica é o caso mais crítico",
    pull: '"As pessoas precisam de nudges para tomar decisões difíceis cujo feedback não é sentido imediatamente."',
    why: "Medicamento crônico é o caso clássico. O Kokoro cria o feedback artificial que não existe na biologia.",
    good: [
      "João, 30 dias de Metformina! Seu médico vai adorar ver essa consistência na próxima consulta.",
      "Semana 2 completa. Esse tipo de regularidade é o que faz o medicamento funcionar de verdade.",
    ],
    bad: ["Não esqueça de tomar seu remédio."],
  },
  {
    num: "04",
    title: "Simplificação radical — uma pergunta, uma palavra",
    pull: '"Facilitamos a vida das pessoas enviando lembretes e minimizando os custos para quem acaba esquecendo as coisas."',
    why: 'Pedir uma única palavra — SIM ou NÃO — é mais eficaz que pedir "como você está se sentindo".',
    good: ["Hora do Metformina, João. Tomou? SIM ou NÃO", "Bom dia! Conseguiu tomar? Responda 1 (sim) ou 2 (não)"],
    bad: ["Como você está se sentindo hoje? Tomou seu medicamento? Teve algum efeito colateral? Precisa de algo?"],
    warn: "⚠️ Uma pergunta por mensagem, sempre — sem exceção.",
  },
  {
    num: "05",
    title: "Comprometimento e progressão — o streak como âncora",
    pull: '"O compromisso é a vantagem, não a desvantagem."',
    why: "Mostrar progresso acumulado cria comprometimento retroativo. Marcos D7, D14, D30 transformam a meta abstrata em conquistas concretas.",
    good: [
      "7 dias seguidos, João! Você está construindo um hábito real. Continue mais 7 dias para chegar ao D14.",
      "Você está a 3 dias do seu primeiro mês. Não pare agora!",
    ],
    bad: ["Continue tomando seus medicamentos todos os dias para sempre."],
  },
  {
    num: "06",
    title: "Sinal emocional — o emoticon que eliminou o efeito bumerangue",
    pull: '"O emoticon sorridente nos abaixo da média eliminou o efeito bumerangue por completo."',
    why: 'Aprovação emocional simples — um emoji ou "Ótimo!" — amplifica o efeito do feedback sem parecer paternalista.',
    good: ["Registrado! 💊✓", "Perfeito, João! 🎯", "Esse é o caminho. 👏"],
    bad: ["Confirmamos o recebimento da sua resposta. Obrigado."],
    warn: "⚠️ Varie os reforços positivos — mínimo de 6–8 variações, rodadas aleatoriamente.",
  },
];

function Reveal({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DetailAccordion({ card }: { card: DetailCard }) {
  const [open, setOpen] = useState(false);
  const mobile = useIsMobile();

  return (
    <Reveal>
      <div style={{ background: COLORS.cream, border: "1.5px solid #f0ece8", borderRadius: 14, overflow: "hidden" }}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "32px 1fr 24px",
            alignItems: "center",
            gap: 20,
            padding: "26px 28px",
            border: "none",
            background: open ? "#f5f2ec" : COLORS.cream,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: F,
          }}
        >
          <span style={{ fontFamily: SERIF, fontSize: 13, color: "#7a7a7a" }}>{card.num}</span>
          <span style={{ fontFamily: SERIF, fontSize: 19, color: COLORS.ink, lineHeight: 1.2 }}>{card.title}</span>
          <span style={{ fontSize: 16, color: "#7a7a7a", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
            ↓
          </span>
        </button>
        {open && (
          <div
            style={{
              padding: mobile ? "20px 20px 28px" : "28px 28px 32px",
              borderTop: "1px solid #f0ece8",
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
              gap: 28,
            }}
          >
            <p
              style={{
                gridColumn: "1 / -1",
                background: "#f5f2ec",
                borderLeft: `3px solid ${CORAL}`,
                padding: "16px 20px",
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.65,
                color: COLORS.inkMuted,
                fontStyle: "italic",
                margin: 0,
              }}
            >
              {card.pull}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.inkMuted, lineHeight: 1.75, fontFamily: F }}>{card.why}</p>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "#7a7a7a", margin: "0 0 8px", fontFamily: F }}>
                ✓ Mensagens que aplicam
              </p>
              {card.good.map((t) => (
                <div
                  key={t}
                  style={{
                    background: "rgba(245,113,112,0.12)",
                    color: "#7a2a28",
                    padding: "9px 13px",
                    borderRadius: "16px 16px 16px 4px",
                    fontSize: 13,
                    lineHeight: 1.5,
                    marginBottom: 6,
                    fontFamily: F,
                  }}
                >
                  {t}
                </div>
              ))}
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "#7a7a7a", margin: "16px 0 8px", fontFamily: F }}>
                ✗ O que evitar
              </p>
              {card.bad.map((t) => (
                <div
                  key={t}
                  style={{
                    background: "#fff0ee",
                    color: "#7a1a0a",
                    padding: "9px 13px",
                    borderRadius: "16px 16px 16px 4px",
                    fontSize: 13,
                    lineHeight: 1.5,
                    marginBottom: 6,
                    opacity: 0.75,
                    textDecoration: "line-through",
                    fontFamily: F,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            {card.warn && (
              <p
                style={{
                  gridColumn: "1 / -1",
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.65,
                  padding: "10px 14px",
                  background: "rgba(245,113,112,0.1)",
                  color: "#7a2a28",
                  borderRadius: 8,
                  fontFamily: F,
                }}
              >
                {card.warn}
              </p>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function NudgePage() {
  const mobile = useIsMobile();
  const { ref: principlesRef, inView: principlesInView } = useInView();

  return (
    <>
      <SiteNav solid />
      <section
        style={{
          minHeight: "70vh",
          background: `linear-gradient(155deg,${CORAL} 0%,${COLORS.coralMid} 40%,${COLORS.coralDark} 100%)`,
          padding: mobile ? "100px 24px 60px" : "100px clamp(20px,5vw,60px) 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 820, position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: F,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              margin: "0 0 14px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Design de mensagens
          </p>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: mobile ? 40 : "clamp(40px,6vw,72px)",
              lineHeight: 1.08,
              color: "#fff",
              margin: "0 0 20px",
              fontWeight: 400,
            }}
          >
            Como as mensagens
            <br />
            certas <span style={{ fontStyle: "italic", opacity: 0.9 }}>mudam</span>
            <br />o comportamento
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.75, maxWidth: 540, margin: "0 0 32px", fontFamily: F }}>
            Princípios de economia comportamental aplicados às mensagens do Kokoro — para aumentar adesão medicamentosa com respeito total à autonomia do paciente.
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              ["6", "Princípios"],
              ["3", "Regras de ouro"],
              ["∞", "Impacto em saúde"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: SERIF, fontSize: 28, color: "#fff" }}>{n}</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.65)", fontFamily: F }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: COLORS.dark, padding: mobile ? "60px 24px" : "80px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 52, alignItems: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: mobile ? 22 : 26, lineHeight: 1.45, color: "#fff", margin: 0 }}>
            "As pessoas precisam de nudges para decisões cujo feedback <span style={{ color: CORAL }}>não é sentido imediatamente.</span>"
          </p>
          <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.75, borderLeft: `3px solid ${CORAL}`, paddingLeft: 24, margin: 0, fontFamily: F }}>
            Tomar medicamento crônico é o exemplo perfeito: custo imediato diário, benefício difuso e tardio. O Kokoro cria feedback artificial onde a biologia não oferece.
          </p>
        </div>
      </section>

      <section ref={principlesRef} style={{ background: "#fff", padding: mobile ? "64px 24px" : "100px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label text="Os seis princípios" />
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 30 : 42, color: COLORS.ink, margin: "0 0 14px", lineHeight: 1.15 }}>
            O que o livro ensina que realmente funciona
          </h2>
          <p style={{ color: COLORS.inkMuted, fontSize: 15, maxWidth: 520, margin: "0 0 48px", lineHeight: 1.7, fontFamily: F }}>
            Cada princípio tem base empírica sólida — não é intuição.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))",
              gap: 20,
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.num}
                style={{
                  padding: "28px 24px",
                  borderRadius: 14,
                  border: "1.5px solid #f0ece8",
                  opacity: principlesInView ? 1 : 0,
                  transform: principlesInView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ${i * 0.08}s, transform 0.5s ${i * 0.08}s`,
                }}
              >
                <div style={{ fontSize: 11, color: "#aaa", fontFamily: F, marginBottom: 8 }}>{p.num}</div>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontFamily: SERIF, fontSize: 19, color: COLORS.ink, margin: "0 0 8px" }}>{p.title}</h3>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.5, margin: 0, fontFamily: F }}>{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: COLORS.cream, padding: mobile ? "64px 24px" : "80px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          <Label text="Em detalhe" />
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 28 : 36, color: COLORS.ink, margin: "0 0 32px" }}>Como aplicar na prática</h2>
          {DETAILS.map((card) => (
            <DetailAccordion key={card.num} card={card} />
          ))}
        </div>
      </section>

      <section style={{ background: COLORS.dark, padding: mobile ? "64px 24px" : "100px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Label text="Regras de ouro" />
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 28 : 40, color: "#fff", margin: "0 0 44px", lineHeight: 1.18, maxWidth: 520 }}>
            O que você nunca pode esquecer ao escrever uma mensagem
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
            {RULES.map((r) => (
              <div key={r.n} style={{ background: "#262626", borderRadius: 12, padding: "28px 24px" }}>
                <div style={{ fontFamily: SERIF, fontSize: 30, color: "rgba(255,255,255,0.12)", marginBottom: 12 }}>{r.n}</div>
                <div style={{ fontFamily: SERIF, fontSize: 16, color: "#fff", marginBottom: 8 }}>{r.t}</div>
                <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.65, fontFamily: F }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
