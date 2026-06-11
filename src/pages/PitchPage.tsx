import { useEffect } from "react";

/** Redireciona para o deck estático em /pitch/ (HTML standalone). */
export default function PitchPage() {
  useEffect(() => {
    window.location.replace("/pitch/");
  }, []);

  return null;
}
