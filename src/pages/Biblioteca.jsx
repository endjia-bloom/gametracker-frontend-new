import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Biblioteca() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  const [filterEstado, setFilterEstado] = useState("");
  const [filterGenero, setFilterGenero] = useState("");
  const [filterPlataforma, setFilterPlataforma] = useState("");

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

  // ✅ FILTROS COMBINADOS
  const juegosFiltrados = games.filter(game =>
    game.titulo.toLowerCase().includes(search.toLowerCase()) &&
    (filterEstado ? game.estado === filterEstado : true) &&
    (filterGenero ? game.genero === filterGenero : true) &&
    (filterPlataforma ? game.plataforma === filterPlataforma : true)
  );

  return (
    <div>
      <h2 className="gold" style={{ fontSize: "26px", marginBottom: "20px" }}>
        Mi Biblioteca
      </h2>

      {/* 🟣 BÚSQUEDA + FILTROS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* 🔍 Buscar */}
        <input
          type="text"
          placeholder="Buscar juego..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1",
          }}
        />

        {/* Filtro por Estado */}
        <select
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Estado</option>
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
          <option value="pendiente">Pendiente</option>
        </select>

        {/* Filtro por Género */}
        <select
          value={filterGenero}
          onChange={(e) => setFilterGenero(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Género</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Indie">Indie</option>
        </select>

        {/* Filtro por Plataforma */}
        <select
          value={filterPlataforma}
          onChange={(e) => setFilterPlataforma(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Plataforma</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">Switch</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      {/* 🟣 LISTA DE JUEGOS FILTRADOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {juegosFiltrados.map((game) => (
          <div key={game._id} className="card">
            {/* Imagen */}
            {game.imagenPortada ? (
              <img src={game.imagenPortada} alt={game.titulo} />
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

            {/* Botones */}
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
