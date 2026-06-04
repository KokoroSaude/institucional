import type { ChatMessage } from "../components/ChatMock";
import { substituteVariables, type BibliotecaVars } from "./variables";

export type BibliotecaPreviewHandler = (messages: ChatMessage[]) => void;

const TONE_BADGES = {
  acolhedor: { label: "💚 Acolhedor", cls: "acolhedor" },
  motivacional: { label: "🎯 Motivacional", cls: "motivacional" },
  direto: { label: "📋 Direto", cls: "direto" },
} as const;

const TITLES: Record<string, string> = {
  intro: "Introdução",
  onboarding: "Onboarding",
  lembrete: "Lembretes",
  lembrete_multi: "Múltiplos Medicamentos",
  followup: "Follow-up",
  reengajamento: "Reengajamento",
  marcos: "Marcos D7/D14/D30",
  pausa: "Pausa e Retomada",
  optout: "Opt-out",
};

let previewHandler: BibliotecaPreviewHandler | undefined;
let bibliotecaRoot: HTMLElement | null = null;
let getVars: () => BibliotecaVars = () => ({
  nome: "",
  medicamento: "",
  medicamento1: "",
  medicamento2: "",
  horario: "8h",
  nDias: "3",
  nTomados: "2",
  nTotal: "2",
  data: "",
  pct: "87",
});

function cacheTemplates(root: HTMLElement) {
  root.querySelectorAll(".bubble").forEach((el) => {
    const bubble = el as HTMLElement;
    if (bubble.classList.contains("system")) return;
    if (!bubble.dataset.template) {
      bubble.dataset.template = bubble.textContent?.trim() ?? "";
    }
  });

  root.querySelectorAll(".copy-btn").forEach((btn) => {
    const button = btn as HTMLElement;
    const bubble = button.closest(".msg-content")?.querySelector(".bubble:not(.system)") as HTMLElement | null;
    if (bubble?.dataset.template) {
      button.dataset.copyTemplate = bubble.dataset.template;
    }
  });
}

export function applyVarsToDom(root: HTMLElement, vars: BibliotecaVars) {
  root.querySelectorAll(".bubble").forEach((el) => {
    const bubble = el as HTMLElement;
    if (bubble.classList.contains("system")) return;
    const template = bubble.dataset.template;
    if (template) bubble.textContent = substituteVariables(template, vars);
  });
}

function getSelectedBubble(): HTMLElement | null {
  return bibliotecaRoot?.querySelector(".bubble-preview-selected:not(.system)") as HTMLElement | null;
}

function buildPreviewFromBubble(bubble: HTMLElement): ChatMessage[] {
  const template = bubble.dataset.template ?? bubble.textContent?.trim() ?? "";
  const text = substituteVariables(template, getVars());
  const label =
    bubble.closest(".msg-row")?.querySelector(".msg-label")?.textContent?.trim() ?? "";

  const fromUser =
    label.startsWith("Se ") ||
    label.toLowerCase().includes("resposta do paciente") ||
    /^✗/.test(label);

  if (fromUser) {
    return [{ from: "user", text }];
  }

  const messages: ChatMessage[] = [{ from: "ai", text }];
  if (/SIM ou NÃO/i.test(text)) {
    messages.push({ from: "user", text: "SIM" });
  }
  return messages;
}

function selectBubble(bubble: HTMLElement) {
  if (!bibliotecaRoot || bubble.classList.contains("system")) return;

  bibliotecaRoot.querySelectorAll(".bubble").forEach((b) => b.classList.remove("bubble-preview-selected"));
  bubble.classList.add("bubble-preview-selected");
  previewHandler?.(buildPreviewFromBubble(bubble));
}

function refreshPreview() {
  const selected = getSelectedBubble();
  if (selected) {
    previewHandler?.(buildPreviewFromBubble(selected));
    return;
  }
  previewFirstVisibleBubble(bibliotecaRoot!);
}

function previewFirstVisibleBubble(root: HTMLElement) {
  const first = root.querySelector(
    ".tone-content.visible .bubble:not(.system)",
  ) as HTMLElement | null;
  if (first) selectBubble(first);
}

function setTone(tone: keyof typeof TONE_BADGES) {
  document.querySelectorAll(".tone-btn").forEach((b) =>
    b.classList.toggle("active", (b as HTMLElement).dataset.tone === tone),
  );

  document.querySelectorAll(".tone-content").forEach((el) =>
    el.classList.toggle("visible", (el as HTMLElement).dataset.tone === tone),
  );

  const badge = document.getElementById("active-tone-badge");
  if (badge) {
    badge.textContent = TONE_BADGES[tone].label;
    badge.className = `tone-badge ${TONE_BADGES[tone].cls}`;
  }

  if (bibliotecaRoot) previewFirstVisibleBubble(bibliotecaRoot);
}

function bibliotecaScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

  document.querySelectorAll(".nav-item").forEach((b) => {
    const el = b as HTMLElement;
    el.classList.toggle("active", el.dataset.section === id);
  });
}

function copy(btn: HTMLElement, _text: string) {
  const bubble = btn.closest(".msg-content")?.querySelector(".bubble:not(.system)") as HTMLElement | null;
  if (bubble) selectBubble(bubble);

  const template = btn.dataset.copyTemplate ?? bubble?.dataset.template ?? _text;
  const resolved = substituteVariables(template, getVars());

  navigator.clipboard.writeText(resolved).then(() => {
    btn.textContent = "✓ copiado";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = "⎘ copiar";
      btn.classList.remove("copied");
    }, 1800);
  });
}

declare global {
  interface Window {
    setTone: typeof setTone;
    bibliotecaScrollTo: typeof bibliotecaScrollTo;
    copy: typeof copy;
  }
}

window.setTone = setTone;
window.bibliotecaScrollTo = bibliotecaScrollTo;
window.copy = copy;

export function initBiblioteca(
  root: HTMLElement,
  onPreview?: BibliotecaPreviewHandler,
  varsGetter?: () => BibliotecaVars,
) {
  bibliotecaRoot = root;
  previewHandler = onPreview;
  if (varsGetter) getVars = varsGetter;

  cacheTemplates(root);
  applyVarsToDom(root, getVars());

  const onBubbleClick = (event: MouseEvent) => {
    const bubble = (event.target as HTMLElement).closest(".bubble");
    if (!bubble || !root.contains(bubble)) return;
    selectBubble(bubble as HTMLElement);
  };

  root.addEventListener("click", onBubbleClick);
  previewFirstVisibleBubble(root);

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.07 },
  );

  root.querySelectorAll(".reveal").forEach((el, i) => {
    (el as HTMLElement).style.transitionDelay = `${(i % 4) * 60}ms`;
    revealObs.observe(el);
  });

  const titleEl = root.querySelector("#tb-section-title");
  const sections = root.querySelectorAll(".etapa-section, .hero, .how-section");

  let scrollObs: IntersectionObserver | undefined;

  if (titleEl && sections.length) {
    scrollObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = (e.target as HTMLElement).id;
          if (TITLES[id]) titleEl.textContent = TITLES[id];

          document.querySelectorAll(".nav-item").forEach((b) => {
            const el = b as HTMLElement;
            el.classList.toggle("active", el.dataset.section === id);
          });
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((s) => scrollObs!.observe(s));
  }

  return {
    cleanup: () => {
      root.removeEventListener("click", onBubbleClick);
      bibliotecaRoot = null;
      previewHandler = undefined;
      revealObs.disconnect();
      scrollObs?.disconnect();
    },
    refreshVars: (vars: BibliotecaVars) => {
      applyVarsToDom(root, vars);
      refreshPreview();
    },
  };
}
