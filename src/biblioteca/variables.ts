export interface BibliotecaVars {
  nome: string;
  medicamento: string;
  medicamento1: string;
  medicamento2: string;
  horario: string;
  nDias: string;
  nTomados: string;
  nTotal: string;
  data: string;
  pct: string;
}

function defaultPauseDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export const DEFAULT_BIBLIOTECA_VARS: BibliotecaVars = {
  nome: "",
  medicamento: "",
  medicamento1: "",
  medicamento2: "",
  horario: "8h",
  nDias: "3",
  nTomados: "2",
  nTotal: "2",
  data: defaultPauseDate(),
  pct: "87",
};

export const BIBLIOTECA_VAR_FIELDS: {
  key: keyof BibliotecaVars;
  label: string;
  placeholder: string;
  hint?: string;
  group: "paciente" | "rotina" | "metricas" | "jornada";
  type?: "text" | "number";
}[] = [
  { key: "nome", label: "Nome do paciente", placeholder: "Ex.: Maria", group: "paciente" },
  {
    key: "medicamento",
    label: "{medicamento}",
    placeholder: "Ex.: Metformina",
    hint: "Rotina com um medicamento",
    group: "rotina",
  },
  {
    key: "medicamento1",
    label: "{medicamento_1}",
    placeholder: "Ex.: Metformina",
    hint: "Primeiro medicamento (rotina múltipla)",
    group: "rotina",
  },
  {
    key: "medicamento2",
    label: "{medicamento_2}",
    placeholder: "Ex.: Losartana",
    hint: "Segundo medicamento (opcional)",
    group: "rotina",
  },
  { key: "horario", label: "{horário}", placeholder: "Ex.: 8h", group: "rotina" },
  {
    key: "nDias",
    label: "{n_dias}",
    placeholder: "Ex.: 3",
    hint: "Dias sem check-in (reengajamento)",
    group: "jornada",
    type: "number",
  },
  {
    key: "nTomados",
    label: "{n_tomados}",
    placeholder: "Ex.: 2",
    hint: "Medicamentos tomados no dia",
    group: "metricas",
    type: "number",
  },
  {
    key: "nTotal",
    label: "{n_total}",
    placeholder: "Ex.: 2",
    hint: "Total de medicamentos no dia",
    group: "metricas",
    type: "number",
  },
  {
    key: "data",
    label: "{data}",
    placeholder: "Ex.: 15/06/2026",
    hint: "Data de retomada da pausa",
    group: "jornada",
  },
  {
    key: "pct",
    label: "{pct}",
    placeholder: "Ex.: 87",
    hint: "Percentual em normas sociais (%)",
    group: "jornada",
    type: "number",
  },
];

const GROUP_LABELS: Record<(typeof BIBLIOTECA_VAR_FIELDS)[number]["group"], string> = {
  paciente: "Paciente",
  rotina: "Medicamentos e horário",
  metricas: "Resumo do dia",
  jornada: "Reengajamento e pausa",
};

export const BIBLIOTECA_VAR_GROUPS = ["paciente", "rotina", "metricas", "jornada"] as const;

export function getBibliotecaVarGroupLabel(group: (typeof BIBLIOTECA_VAR_GROUPS)[number]): string {
  return GROUP_LABELS[group];
}

export function resolvedBibliotecaVars(vars: BibliotecaVars): BibliotecaVars {
  const medicamento1 = vars.medicamento1.trim() || vars.medicamento.trim() || "seu medicamento";
  const medicamento2 = vars.medicamento2.trim() || medicamento1;
  return {
    nome: vars.nome.trim() || "você",
    medicamento: vars.medicamento.trim() || medicamento1,
    medicamento1,
    medicamento2,
    horario: vars.horario.trim() || "8h",
    nDias: vars.nDias.trim() || "3",
    nTomados: vars.nTomados.trim() || "2",
    nTotal: vars.nTotal.trim() || "2",
    data: vars.data.trim() || defaultPauseDate(),
    pct: vars.pct.trim() || "87",
  };
}

export function substituteVariables(template: string, vars: BibliotecaVars): string {
  const r = resolvedBibliotecaVars(vars);

  return template
    .replace(/\{nome\}/g, r.nome)
    .replace(/\{medicamento_1\}/g, r.medicamento1)
    .replace(/\{medicamento_2\}/g, r.medicamento2)
    .replace(/\{medicamento\}/g, r.medicamento)
    .replace(/\{horário\}/g, r.horario)
    .replace(/\{n_dias\}/g, r.nDias)
    .replace(/\{n_tomados\}/g, r.nTomados)
    .replace(/\{n_total\}/g, r.nTotal)
    .replace(/\{data\}/g, r.data)
    .replace(/\{pct\}/g, r.pct);
}
