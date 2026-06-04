import { HeartMark } from "./Logo";
import { COLORS, FONT_SANS } from "../theme";

export interface ChatMessage {
  from: "ai" | "user";
  text: string;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  { from: "ai", text: "Bom dia, Vitória! 🌅 Hoje é dia de tomar o Losartana. Já tomou?" },
  { from: "user", text: "Ainda não, vou tomar agora" },
  {
    from: "ai",
    text: "Ótimo! 💊 Lembre de tomar com água. Seu estoque acaba em 5 dias — quer que eu avise quando for hora de repor?",
  },
  { from: "user", text: "Sim, obrigada!" },
];

export function ChatMock({ messages = DEFAULT_MESSAGES }: { messages?: ChatMessage[] }) {
  return (
    <div
      style={{
        background: "#e5ddd5",
        borderRadius: 20,
        padding: "20px 16px",
        maxWidth: 340,
        width: "100%",
        margin: "0 auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
      }}
    >
      <div
        style={{
          background: "#075E54",
          borderRadius: "12px 12px 0 0",
          padding: "12px 16px",
          margin: "-20px -16px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
            padding: 3,
          }}
        >
          <HeartMark color={COLORS.coral} size={18} />
        </div>
        <div>
          <div style={{ color: "#fff", fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600 }}>Kokoro</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: FONT_SANS }}>online agora</div>
        </div>
      </div>
      {messages.map((m, i) => (
        <div
          key={`${m.from}-${i}-${m.text.slice(0, 24)}`}
          style={{
            display: "flex",
            justifyContent: m.from === "user" ? "flex-end" : "flex-start",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              background: m.from === "user" ? "#dcf8c6" : "#fff",
              borderRadius: m.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              padding: "10px 14px",
              maxWidth: "82%",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: COLORS.ink, fontFamily: FONT_SANS, lineHeight: 1.5 }}>
              {m.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
