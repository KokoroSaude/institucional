import { useEffect } from "react";
import { Label } from "../components/Label";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { useInView } from "../hooks/useInView";
import { useIsMobile } from "../hooks/useIsMobile";
import { COLORS, FONT_SANS, FONT_SERIF, LOGIN_URL } from "../theme";

const F = FONT_SANS;
const SERIF = FONT_SERIF;
const CORAL = COLORS.coral;

const SUMMARY = [
  { value: "3", label: "aplicações em produção", hint: "Institucional · Portal · API" },
  { value: "Multi-tenant", label: "SaaS com planos", hint: "Freemium · Premium · Enterprise" },
  { value: "100%", label: "via WhatsApp", hint: "Onboarding até reengajamento" },
  { value: "LGPD", label: "by design", hint: "Consentimento · opt-out · auditoria" },
];

const STACK = [
  {
    name: "API & Worker",
    url: "https://api.kokorosaude.com.br",
    stack: ".NET 10 · PostgreSQL · Redis · Railway",
    role: "Webhooks Meta, REST, jobs de lembretes, follow-up e reengajamento",
  },
  {
    name: "Portal",
    url: "https://portal.kokorosaude.com.br",
    stack: "React · Vite · TanStack Query · Vercel",
    role: "Área logada do parceiro e console superadmin",
  },
  {
    name: "Institucional",
    url: "https://kokorosaude.com.br",
    stack: "React · Vite · Vercel",
    role: "Marca, biblioteca de mensagens e materiais de apoio",
  },
];

interface Deliverable {
  title: string;
  detail: string;
}

interface Module {
  id: string;
  icon: string;
  label: string;
  title: string;
  intro: string;
  items: Deliverable[];
}

const MODULES: Module[] = [
  {
    id: "whatsapp",
    icon: "💬",
    label: "Experiência do paciente",
    title: "Jornada completa no WhatsApp",
    intro:
      "Do primeiro contato ao reengajamento — conversa guiada, lembretes inteligentes e check-ins diários sem app para instalar.",
    items: [
      { title: "Onboarding conversacional", detail: "Coleta de perfil, medicamentos e horários pelo chat, com fluxo adaptativo." },
      { title: "Check-in diário", detail: "Resposta simples (tomou / não tomou) com feedback imediato e registro de adesão." },
      { title: "Lembretes programados", detail: "Scheduler + fila Redis; janela de envio respeitando configuração do tenant." },
      { title: "Follow-up automático", detail: "Segunda tentativa quando o paciente não responde ao lembrete." },
      { title: "Reengajamento", detail: "Pacientes inativos recebem fluxo de retorno; opt-out imediato (sair, parar, cancelar)." },
      { title: "Marcos (milestones)", detail: "Celebração de streaks e marcos de adesão na jornada." },
      { title: "Simulador interno", detail: "Superadmin testa onboarding e mensagens sem disparar para pacientes reais." },
      { title: "Templates versionados", detail: "Mensagens globais da plataforma + customização por tenant (conforme plano)." },
    ],
  },
  {
    id: "portal-tenant",
    icon: "🏪",
    label: "Portal do parceiro",
    title: "Operação da farmácia / rede",
    intro:
      "Dashboard, pacientes, relatórios e configurações — tudo com controle de acesso por plano e papel (admin, operador, viewer).",
    items: [
      { title: "Dashboard", detail: "Visão geral de adesão e atividade do programa no tenant." },
      { title: "Pacientes", detail: "Lista, busca, cadastro manual, detalhe com timeline e exportação CSV." },
      { title: "Relatórios", detail: "Adesão, engajamento, funil, ranking, operação, remetentes e comparativo de períodos." },
      { title: "Exportação PDF", detail: "Relatório completo imprimível com métricas e tabelas do período selecionado." },
      { title: "Jornada visual", detail: "Mapa da experiência do paciente com preview das mensagens em cada etapa." },
      { title: "WhatsApp", detail: "Cadastro de remetentes (número, WABA, phone ID) e checklist de onboarding." },
      { title: "Templates", detail: "Visualização e edição de mensagens do tenant (planos Premium+)." },
      { title: "Configurações", detail: "Plano, usuários do tenant, janela de envio, alteração de senha." },
      { title: "Meu perfil", detail: "Nome, e-mail, foto de perfil e troca de senha." },
      { title: "Guia passo a passo", detail: "Tour interativo para novos usuários do portal." },
      { title: "Cadastro self-service", detail: "Signup de novos tenants com plano Freemium." },
      { title: "Recuperação de senha", detail: "Fluxo por e-mail com token seguro e expiração." },
    ],
  },
  {
    id: "portal-platform",
    icon: "🛡️",
    label: "Console superadmin",
    title: "Gestão da plataforma Kokoro",
    intro:
      "Visão consolidada de todos os tenants, planos, features e operação — incluindo impersonação para suporte.",
    items: [
      { title: "Visão geral", detail: "Métricas de produto: tenants, pacientes, check-ins e saúde da plataforma." },
      { title: "Tenants", detail: "CRUD, ativação/desativação, plano, impersonação e gestão de usuários por tenant." },
      { title: "Relatórios multi-tenant", detail: "Mesmas abas do tenant, filtradas por seleção de tenants + PDF consolidado." },
      { title: "Planos & features", detail: "Freemium / Premium / Enterprise com flags granulares por capability." },
      { title: "Superadmins", detail: "Criação, edição (nome, e-mail, status) e controle de acesso à plataforma." },
      { title: "Onboarding WhatsApp", detail: "Templates globais do fluxo de entrada com editor e categorias." },
      { title: "Mensagens operacionais", detail: "Lembretes, follow-ups, reengajamento e marcos — padrão para todos os tenants." },
      { title: "Simulador", detail: "Teste end-to-end do onboarding conversacional." },
      { title: "Assinatura de e-mail", detail: "Gerador visual com export JPG para comunicações da equipe." },
      { title: "Tenant inativo", detail: "Bloqueio de login, API e workers; lembretes pendentes marcados como ignorados." },
    ],
  },
  {
    id: "api",
    icon: "⚙️",
    label: "Backend & infra",
    title: "API, workers e observabilidade",
    intro:
      "Clean Architecture (.NET 10), deploy independente de API e Worker no Railway, com filas Redis e métricas Prometheus.",
    items: [
      { title: "Arquitetura em camadas", detail: "Domain · Application (MediatR) · Infrastructure · Api · Worker." },
      { title: "Auth JWT", detail: "Escopo tenant vs plataforma, refresh token, impersonação auditável." },
      { title: "Webhooks Meta", detail: "Recebimento de mensagens, verificação de assinatura e processamento inbound." },
      { title: "Multi-tenant isolado", detail: "Middleware de tenant, features por assinatura e dados segregados." },
      { title: "Jobs em background", detail: "Scheduler (1 réplica) + consumers escaláveis para lembretes e fluxos." },
      { title: "Upload de avatares", detail: "Armazenamento local com endpoints dedicados." },
      { title: "Billing & e-mail", detail: "Scaffolding para cobrança e envio transacional (reset de senha)." },
      { title: "Observabilidade", detail: "Serilog JSON, /metrics Prometheus, business_events, alertas Grafana." },
      { title: "CI", detail: "GitHub Actions para build e testes automatizados (API e Portal)." },
      { title: "Docker local", detail: "Postgres + Redis + API + Worker via docker-compose." },
    ],
  },
  {
    id: "lgpd",
    icon: "🔒",
    label: "Segurança & compliance",
    title: "LGPD e confiabilidade desde o dia 1",
    intro: "Princípios aplicados em código, logs e fluxos de consentimento — não só em policy.",
    items: [
      { title: "Consentimento versionado", detail: "Texto aceito pelo paciente armazenado de forma imutável." },
      { title: "Minimização de logs", detail: "Conteúdo de mensagens nunca logado — apenas tipo de resposta (taken/missed)." },
      { title: "Opt-out imediato", detail: "Palavras-chave processadas no webhook; paciente sai do programa na hora." },
      { title: "RBAC", detail: "Papéis admin / operator / viewer no tenant; superadmin separado na plataforma." },
      { title: "Rate limiting", detail: "Proteção de endpoints sensíveis na API." },
      { title: "CORS & HTTPS", detail: "Origens restritas em produção; deploy com TLS em Railway e Vercel." },
    ],
  },
];

const TIMELINE = [
  { phase: "Fundação", desc: "Multi-tenant, auth, webhooks WhatsApp, onboarding e lembretes" },
  { phase: "Portal v1", desc: "Pacientes, dashboard, configurações e primeiros relatórios" },
  { phase: "Plataforma", desc: "Superadmin, planos, features, templates globais e simulador" },
  { phase: "Operação", desc: "Follow-up, reengajamento, milestones, exportações e checklist" },
  { phase: "Maturidade", desc: "Relatórios PDF, avatares, reset de senha, tenant inativo, CI" },
];

function Hero() {
  const mobile = useIsMobile();
  return (
    <section
      style={{
        background: "linear-gradient(155deg,#F57170 0%,#E85F5F 40%,#D94F4F 100%)",
        padding: mobile ? "120px 24px 72px" : "140px clamp(20px,5vw,60px) 88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.18)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#fff", fontSize: 12, fontFamily: F, fontWeight: 600, letterSpacing: 0.4 }}>
            Documento interno · Sócios
          </span>
        </div>

        <h1
          style={{
            fontFamily: SERIF,
            fontSize: mobile ? 38 : "clamp(40px,5vw,64px)",
            lineHeight: 1.08,
            color: "#fff",
            margin: "0 0 20px",
            fontWeight: 400,
            letterSpacing: -1,
          }}
        >
          Kokoro MVP
          <br />
          <span style={{ fontStyle: "italic", opacity: 0.88 }}>tudo o que já temos até agora</span>
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 0 32px",
            fontFamily: F,
          }}
        >
          Tudo o que a Kokoro já tem até agora — plataforma multi-tenant de adesão medicamentosa via
          WhatsApp, portal do parceiro e console de gestão.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#fff",
              color: CORAL,
              padding: "12px 24px",
              borderRadius: 100,
              fontFamily: F,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Abrir portal
          </a>
          <a
            href="#modulos"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 100,
              fontFamily: F,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.45)",
            }}
          >
            Ver entregas
          </a>
        </div>
      </div>
    </section>
  );
}

function SummaryStats() {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: COLORS.ink, padding: mobile ? "48px 24px" : "64px clamp(20px,5vw,60px)" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4,1fr)",
          gap: mobile ? 24 : 32,
        }}
      >
        {SUMMARY.map((s, i) => (
          <div
            key={s.label}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`,
            }}
          >
            <div style={{ fontFamily: SERIF, fontSize: mobile ? 28 : 36, color: CORAL, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ color: "#eee", fontSize: 14, fontFamily: F, marginTop: 6, fontWeight: 600 }}>{s.label}</div>
            <div style={{ color: "#666", fontSize: 12, fontFamily: F, marginTop: 4 }}>{s.hint}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Architecture() {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  return (
    <section style={{ background: COLORS.cream, padding: mobile ? "64px 24px" : "88px clamp(20px,5vw,60px)" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label text="Arquitetura" />
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 30 : 42, color: COLORS.ink, margin: "0 0 12px", lineHeight: 1.15 }}>
          Três apps, um ecossistema
        </h2>
        <p style={{ color: COLORS.inkMuted, fontSize: 16, fontFamily: F, maxWidth: 560, margin: "0 0 40px", lineHeight: 1.65 }}>
          Cada camada com deploy e escala independentes — prontos para piloto com farmácias e expansão nacional.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
          {STACK.map((app, i) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "#fff",
                borderRadius: 16,
                padding: mobile ? 22 : 28,
                border: "1.5px solid #f0ece8",
                textDecoration: "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ${i * 0.12}s, transform 0.5s ${i * 0.12}s, border-color 0.2s, box-shadow 0.2s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = CORAL;
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(242,107,91,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#f0ece8";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontFamily: SERIF, fontSize: 22, color: COLORS.ink, marginBottom: 6 }}>{app.name}</div>
              <div style={{ fontSize: 12, color: CORAL, fontFamily: F, fontWeight: 600, marginBottom: 12 }}>{app.stack}</div>
              <div style={{ fontSize: 14, color: COLORS.inkMuted, fontFamily: F, lineHeight: 1.6, marginBottom: 16 }}>{app.role}</div>
              <div style={{ fontSize: 13, color: "#999", fontFamily: F, wordBreak: "break-all" }}>{app.url.replace("https://", "")}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  return (
    <section style={{ background: "#fff", padding: mobile ? "64px 24px" : "88px clamp(20px,5vw,60px)" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label text="Evolução" />
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 30 : 42, color: COLORS.ink, margin: "0 0 40px", lineHeight: 1.15 }}>
          Do zero ao MVP operacional
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE.map((t, i) => (
            <div
              key={t.phase}
              style={{
                display: "grid",
                gridTemplateColumns: mobile ? "80px 1fr" : "140px 1fr",
                gap: mobile ? 16 : 32,
                padding: "20px 0",
                borderBottom: i < TIMELINE.length - 1 ? "1px solid #f0ece8" : "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`,
              }}
            >
              <div style={{ fontFamily: SERIF, fontSize: mobile ? 18 : 20, color: CORAL }}>{t.phase}</div>
              <div style={{ fontSize: 15, color: COLORS.inkMuted, fontFamily: F, lineHeight: 1.6, paddingTop: 2 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleSection({ module, index }: { module: Module; index: number }) {
  const { ref, inView } = useInView();
  const mobile = useIsMobile();
  const dark = index % 2 === 1;

  return (
    <section
      id={module.id}
      ref={ref}
      style={{
        background: dark ? COLORS.ink : COLORS.cream,
        padding: mobile ? "64px 24px" : "88px clamp(20px,5vw,60px)",
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p
          style={{
            color: CORAL,
            fontFamily: F,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            margin: "0 0 14px",
          }}
        >
          {module.icon} {module.label}
        </p>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: mobile ? 28 : 38,
            color: dark ? "#fff" : COLORS.ink,
            margin: "0 0 16px",
            lineHeight: 1.15,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
        >
          {module.title}
        </h2>
        <p
          style={{
            color: dark ? "#aaa" : COLORS.inkMuted,
            fontSize: 16,
            fontFamily: F,
            maxWidth: 640,
            margin: "0 0 36px",
            lineHeight: 1.65,
          }}
        >
          {module.intro}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2,1fr)", gap: 16 }}>
          {module.items.map((item, i) => (
            <div
              key={item.title}
              style={{
                background: dark ? "#262626" : "#fff",
                borderRadius: 14,
                padding: mobile ? "18px 16px" : "22px 20px",
                border: dark ? "1px solid #333" : "1.5px solid #f0ece8",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.45s ${i * 0.04}s, transform 0.45s ${i * 0.04}s`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                <span style={{ color: "#10B981", fontSize: 14, lineHeight: 1.4, flexShrink: 0 }}>✓</span>
                <span
                  style={{
                    fontFamily: F,
                    fontSize: 15,
                    fontWeight: 700,
                    color: dark ? "#fff" : COLORS.ink,
                    lineHeight: 1.35,
                  }}
                >
                  {item.title}
                </span>
              </div>
              <p style={{ margin: 0, paddingLeft: 24, fontSize: 13, color: dark ? "#888" : "#666", fontFamily: F, lineHeight: 1.6 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessCta() {
  const mobile = useIsMobile();
  return (
    <section style={{ background: "linear-gradient(135deg,#F57170 0%,#D94F4F 100%)", padding: mobile ? "72px 24px" : "88px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? 32 : 40, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
          Quer ver ao vivo?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, fontFamily: F, lineHeight: 1.65, margin: "0 0 28px" }}>
          Acesse o portal com as credenciais de demonstração compartilhadas pela equipe. API documentada em{" "}
          <a href="https://api.kokorosaude.com.br/scalar" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 600 }}>
            /scalar
          </a>{" "}
          (ambiente de produção).
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#fff",
              color: CORAL,
              padding: "14px 28px",
              borderRadius: 100,
              fontFamily: F,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            portal.kokorosaude.com.br
          </a>
          <a
            href="/"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 100,
              fontFamily: F,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.35)",
            }}
          >
            Voltar ao site
          </a>
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: F, marginTop: 28 }}>
          Atualizado em junho/2026 · Kokoro Saúde
        </p>
      </div>
    </section>
  );
}

export default function MvpPage() {
  useEffect(() => {
    document.title = "Kokoro MVP — tudo o que já temos até agora";
    const meta = document.querySelector('meta[name="robots"]');
    if (meta) {
      meta.setAttribute("content", "noindex, nofollow");
    } else {
      const el = document.createElement("meta");
      el.name = "robots";
      el.content = "noindex, nofollow";
      document.head.appendChild(el);
    }
    return () => {
      document.title = "Kokoro — Mais adesão. Mais vida.";
    };
  }, []);

  return (
    <>
      <SiteNav solid />
      <Hero />
      <SummaryStats />
      <Architecture />
      <Timeline />
      <div id="modulos">
        {MODULES.map((m, i) => (
          <ModuleSection key={m.id} module={m} index={i} />
        ))}
      </div>
      <AccessCta />
      <SiteFooter />
    </>
  );
}
