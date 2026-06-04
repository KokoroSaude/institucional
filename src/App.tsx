import { Route, Routes } from "react-router-dom";
import BibliotecaMensagensPage from "./pages/BibliotecaMensagensPage";
import HomePage from "./pages/HomePage";
import NudgePage from "./pages/NudgePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/biblioteca-mensagens" element={<BibliotecaMensagensPage />} />
      <Route path="/nudge" element={<NudgePage />} />
    </Routes>
  );
}
