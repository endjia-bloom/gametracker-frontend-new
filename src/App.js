import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Biblioteca from "./pages/Biblioteca";
import CrearJuego from "./pages/CrearJuego";
import Reseñas from "./pages/Reseñas";
import EditarJuego from "./pages/EditarJuego";


function App() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    document.body.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <Router>
      <nav style={{
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
        background: dark ? "#1a1a1a" : "white"
      }}>
        <h1 className="gold" style={{ fontSize: "22px", fontWeight: "bold" }}>
          GameTracker ✨
        </h1>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" className="gold">Biblioteca</Link>
          <Link to="/crear">Agregar</Link>

          <button
            onClick={toggleDark}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #d4af37",
              background: "transparent"
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Biblioteca />} />
          <Route path="/crear" element={<CrearJuego />} />
          <Route path="/juego/:id" element={<Reseñas />} />
          <Route path="/editar/:id" element={<EditarJuego />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
