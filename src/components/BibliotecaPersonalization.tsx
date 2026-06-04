import { useCallback, useEffect, useId, useState, type CSSProperties, type FocusEvent } from "react";
import { COLORS, FONT_SANS } from "../theme";
import {
  BIBLIOTECA_VAR_FIELDS,
  BIBLIOTECA_VAR_GROUPS,
  getBibliotecaVarGroupLabel,
  resolvedBibliotecaVars,
  type BibliotecaVars,
} from "../biblioteca/variables";

interface BibliotecaPersonalizationProps {
  vars: BibliotecaVars;
  onChange: (vars: BibliotecaVars) => void;
  variant?: "dark" | "light";
}

function VarsFormFields({
  vars,
  onChange,
}: {
  vars: BibliotecaVars;
  onChange: (vars: BibliotecaVars) => void;
}) {
  const formId = useId();

  const inputStyle: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1.5px solid #f0ece8",
    background: "#fff",
    color: COLORS.ink,
    fontFamily: FONT_SANS,
    fontSize: 14,
    outline: "none",
  };

  const labelStyle: CSSProperties = {
    fontSize: 10,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: COLORS.coral,
    marginBottom: 4,
    display: "block",
    fontWeight: 700,
  };

  const hintStyle: CSSProperties = {
    fontSize: 11,
    color: "#888",
    margin: "0 0 8px",
    lineHeight: 1.35,
    fontFamily: FONT_SANS,
  };

  const groupStyle: CSSProperties = {
    fontSize: 9,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: "#aaa",
    margin: "18px 0 10px",
    fontFamily: FONT_SANS,
  };

  const focusBorder = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = COLORS.coral;
  };
  const blurBorder = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#f0ece8";
  };

  return (
    <div>
      {BIBLIOTECA_VAR_GROUPS.map((group) => (
        <div key={group}>
          <p style={groupStyle}>{getBibliotecaVarGroupLabel(group)}</p>
          {BIBLIOTECA_VAR_FIELDS.filter((f) => f.group === group).map((field) => (
            <div key={field.key} style={{ marginBottom: 12 }}>
              <label htmlFor={`${formId}-${field.key}`} style={labelStyle}>
                {field.label}
              </label>
              {field.hint && <p style={hintStyle}>{field.hint}</p>}
              <input
                id={`${formId}-${field.key}`}
                type="text"
                inputMode={field.type === "number" ? "numeric" : "text"}
                value={vars[field.key]}
                placeholder={field.placeholder}
                onChange={(e) => onChange({ ...vars, [field.key]: e.target.value })}
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
                autoComplete="off"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function BibliotecaVarsModal({
  draft,
  onDraftChange,
  onSave,
  onClose,
}: {
  draft: BibliotecaVars;
  onDraftChange: (vars: BibliotecaVars) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const resolved = resolvedBibliotecaVars(draft);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="bib-vars-modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bib-vars-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bib-vars-modal-header">
          <div>
            <h2 id={titleId} className="bib-vars-modal-title">
              Variáveis dinâmicas
            </h2>
            <p className="bib-vars-modal-sub">
              Preencha os dados do paciente para personalizar todas as mensagens de uma vez.
            </p>
          </div>
          <button type="button" className="bib-vars-modal-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <div className="bib-vars-modal-body">
          <VarsFormFields vars={draft} onChange={onDraftChange} />
        </div>

        <div className="bib-vars-modal-preview">
          <span className="bib-vars-modal-preview-label">Prévia nas mensagens</span>
          <span>
            <strong>{resolved.nome}</strong>
            {resolved.medicamento !== "seu medicamento" ? ` · ${resolved.medicamento}` : ""}
            {` · ${resolved.horario}`}
            {` · ${resolved.nTomados}/${resolved.nTotal}`}
          </span>
        </div>

        <div className="bib-vars-modal-footer">
          <button type="button" className="bib-vars-modal-btn bib-vars-modal-btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="bib-vars-modal-btn bib-vars-modal-btn-primary" onClick={onSave}>
            Aplicar nas mensagens
          </button>
        </div>
      </div>
    </div>
  );
}

export function BibliotecaPersonalization({ vars, onChange, variant = "dark" }: BibliotecaPersonalizationProps) {
  const light = variant === "light";
  const resolved = resolvedBibliotecaVars(vars);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(vars);

  const openModal = useCallback(() => {
    setDraft(vars);
    setOpen(true);
  }, [vars]);

  const closeModal = useCallback(() => setOpen(false), []);

  const saveModal = useCallback(() => {
    onChange(draft);
    setOpen(false);
  }, [draft, onChange]);

  const hasCustom =
    vars.nome.trim() !== "" ||
    vars.medicamento.trim() !== "" ||
    vars.medicamento1.trim() !== "" ||
    vars.medicamento2.trim() !== "";

  return (
    <>
      <div
        className="sb-personalize"
        style={{
          padding: light ? "0" : "12px 20px 16px",
          borderBottom: light ? "none" : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          style={{
            fontSize: light ? 11 : 10,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: light ? COLORS.coral : "rgba(255,255,255,0.35)",
            marginBottom: 10,
            fontWeight: 700,
            fontFamily: FONT_SANS,
          }}
        >
          Variáveis dinâmicas
        </p>

        <div
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            background: light ? "#faf8f6" : "rgba(255,255,255,0.06)",
            border: light ? "1.5px solid #f0ece8" : "1px solid rgba(255,255,255,0.1)",
            marginBottom: 10,
          }}
        >
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.5,
              color: light ? COLORS.inkMuted : "rgba(255,255,255,0.7)",
              fontFamily: FONT_SANS,
              margin: "0 0 4px",
            }}
          >
            {hasCustom ? (
              <>
                <strong style={{ color: light ? COLORS.ink : "#fff" }}>{resolved.nome}</strong>
                {resolved.medicamento !== "seu medicamento" ? ` · ${resolved.medicamento}` : ""}
                {` · ${resolved.horario}`}
              </>
            ) : (
              "Usando valores padrão (ex.: “você”, 8h…)"
            )}
          </p>
          <p style={{ fontSize: 11, color: light ? "#888" : "rgba(255,255,255,0.35)", margin: 0, fontFamily: FONT_SANS }}>
            {resolved.nTomados}/{resolved.nTotal} tomados · {resolved.pct}% norma social
          </p>
        </div>

        <button
          type="button"
          className={light ? "bib-vars-open-btn bib-vars-open-btn-light" : "bib-vars-open-btn"}
          onClick={openModal}
        >
          Personalizar variáveis
        </button>

        <p
          style={{
            fontSize: 11,
            color: light ? "#666" : "rgba(255,255,255,0.35)",
            marginTop: 10,
            lineHeight: 1.45,
            fontFamily: FONT_SANS,
            marginBottom: 0,
          }}
        >
          Clique numa mensagem para ver no WhatsApp.
        </p>
      </div>

      {open && (
        <BibliotecaVarsModal
          draft={draft}
          onDraftChange={setDraft}
          onSave={saveModal}
          onClose={closeModal}
        />
      )}
    </>
  );
}
