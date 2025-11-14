import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Biblioteca() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 ESTO ES NUEVO

  useEffect(() => {
    axios.get("http://localhost:4000/api/juegos")
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  const eliminarJuego = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este juego?")) return;

    axios
      .delete(`http://localhost:4000/api/juegos/${id}`)
      .then(() => {
        setGames(games.filter(g => g._id !== id));
        alert("Juego eliminado ✔️");
      })
      .catch(err => {
        console.error(err);
        alert("Error al eliminar el juego ❌");
      });
  };

  // 🔍 FILTRO DE BÚSQUEDA
  const filteredGames = games.filter(game =>
    game.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="gold" style={{ fontSize: "26px", marginBottom: "20px" }}>
        Mi Biblioteca
      </h2>

      {/* 🔍 INPUT DE BUSQUEDA */}
      <input
        type="text"
        placeholder="Buscar juego..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px 14px",
          margin: "0 auto 25px auto",
          display: "block",
          borderRadius: "10px",
          background: "#111",
          color: "white",
          border: "1px solid #333",
          fontSize: "15px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredGames.map((game) => (
          <div key={game._id} className="card">
            {/* Imagen */}
            {game.imagen ? (
              <img src={game.imagen} alt={game.titulo} />
            ) : (
              <div
                style={{
                  height: "140px",
                  background: "#ddd",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555",
                }}
              >
                Sin portada
              </div>
            )}

            {/* Título */}
            <h3>{game.titulo}</h3>
            <p style={{ opacity: 0.7 }}>
              {game.genero} • {game.plataforma}
            </p>

            {/* Estado */}
            <span className={`estado-tag estado-${game.estado}`}>
              {game.estado}
            </span>

            {/* Horas jugadas */}
            <p style={{ opacity: 0.7, marginTop: "6px" }}>
              ⏱ {game.horasJugadas} horas
            </p>

            <div className="btn-group">
              <Link to={`/juego/${game._id}`} className="btn-rose">
                Reseñas
              </Link>

              <Link to={`/editar/${game._id}`} className="btn-rose">
                Editar
              </Link>
            </div>

            <button
              style={{
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => eliminarJuego(game._id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
