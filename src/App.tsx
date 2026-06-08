import { Route, Routes } from "react-router-dom";
import BibliotecaMensagensPage from "./pages/BibliotecaMensagensPage";
import ExclusaoDadosPage from "./pages/ExclusaoDadosPage";
import HomePage from "./pages/HomePage";
import MvpPage from "./pages/MvpPage";
import NudgePage from "./pages/NudgePage";
import PrivacidadePage from "./pages/PrivacidadePage";
import TermosPage from "./pages/TermosPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/biblioteca-mensagens" element={<BibliotecaMensagensPage />} />
      <Route path="/nudge" element={<NudgePage />} />
      <Route path="/mvp" element={<MvpPage />} />
      <Route path="/privacidade" element={<PrivacidadePage />} />
      <Route path="/termos" element={<TermosPage />} />
      <Route path="/exclusao-de-dados" element={<ExclusaoDadosPage />} />
    </Routes>
  );
}
