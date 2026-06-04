import { useEffect, useRef, useState } from "react";
import bodyHtml from "../biblioteca/biblioteca-body.html?raw";
import "../biblioteca/biblioteca-doc.css";
import { initBiblioteca } from "../biblioteca/initBiblioteca";
import {
  DEFAULT_BIBLIOTECA_VARS,
  substituteVariables,
  type BibliotecaVars,
} from "../biblioteca/variables";
import { BibliotecaPersonalization } from "../components/BibliotecaPersonalization";
import { BibliotecaSidebar } from "../components/BibliotecaSidebar";
import { ChatMock, type ChatMessage } from "../components/ChatMock";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { useIsMobile } from "../hooks/useIsMobile";

const INITIAL_TEMPLATE =
  "Oi, {nome}! 💚 Sou a Kokoro, sua companheira de saúde no WhatsApp. Estou aqui para te ajudar a não esquecer os seus medicamentos. Vamos começar? Responda SIM para continuar.";

function initialPreview(vars: BibliotecaVars): ChatMessage[] {
  return [{ from: "ai", text: substituteVariables(INITIAL_TEMPLATE, vars) }];
}

export default function BibliotecaMensagensPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const bibliotecaApi = useRef<ReturnType<typeof initBiblioteca> | null>(null);
  const varsRef = useRef<BibliotecaVars>(DEFAULT_BIBLIOTECA_VARS);
  const mobile = useIsMobile(1100);

  const [vars, setVars] = useState<BibliotecaVars>(DEFAULT_BIBLIOTECA_VARS);
  const [previewMessages, setPreviewMessages] = useState<ChatMessage[]>(() =>
    initialPreview(DEFAULT_BIBLIOTECA_VARS),
  );

  varsRef.current = vars;

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    bibliotecaApi.current = initBiblioteca(root, setPreviewMessages, () => varsRef.current);
    return () => bibliotecaApi.current?.cleanup();
  }, []);

  useEffect(() => {
    bibliotecaApi.current?.refreshVars(vars);
  }, [vars]);

  return (
    <>
      <SiteNav solid />
      {mobile && (
        <div style={{ padding: "88px 20px 16px", background: "#faf8f6" }}>
          <BibliotecaPersonalization vars={vars} onChange={setVars} variant="light" />
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
            <ChatMock messages={previewMessages} />
          </div>
        </div>
      )}
      <div className="biblioteca-page" style={mobile ? { gridTemplateColumns: "1fr", paddingTop: 0 } : undefined}>
        {!mobile && (
          <div className="biblioteca-sidebar-wrap">
            <BibliotecaSidebar vars={vars} onVarsChange={setVars} />
          </div>
        )}
        <div
          ref={contentRef}
          className="biblioteca-root"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
        {!mobile && (
          <aside className="biblioteca-whatsapp" aria-label="Prévia WhatsApp">
            <ChatMock messages={previewMessages} />
          </aside>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
