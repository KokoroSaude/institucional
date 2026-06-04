import { COLORS, FONT_SANS } from "../theme";

export function Label({ text }: { text: string }) {
  return (
    <p
      style={{
        color: COLORS.coral,
        fontFamily: FONT_SANS,
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        margin: "0 0 14px",
      }}
    >
      {text}
    </p>
  );
}
