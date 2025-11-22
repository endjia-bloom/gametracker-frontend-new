// gametracker-frontend/src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { JuegoService } from '../services/JuegoService';

function HomePage() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const data = await JuegoService.getAllJuegos();
        setJuegos(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los juegos. Asegúrate que el Backend esté en :4000.");
        setLoading(false);
      }
    };
    fetchJuegos();
  }, []);

  if (loading) return <h2>Cargando lista de juegos...</h2>;
  if (error) return <h2 className="error-message">{error}</h2>;

  return (
    <div>
      <h1>🕹️ Mis Juegos (GameTracker)</h1>
      
      {juegos.length === 0 ? (
        <p>Aún no hay juegos. ¡Añade uno!</p>
      ) : (
        <div className="juegos-list" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px"
        }}>
          {juegos.map((juego) => (
            <div key={juego._id} className="juego-card" style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#fafafa"
            }}>

              {/* 🖼️ IMAGEN DE PORTADA */}
              {juego.imagenPortada ? (
                <img 
                  src={juego.imagenPortada} 
                  alt={juego.titulo}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              ) : (
                <div 
                  style={{
                    width: "100%",
                    height: "180px",
                    background: "#ddd",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#555",
                    fontSize: "14px"
                  }}
                >
                  Sin imagen
                </div>
              )}

              {/* 🎮 TÍTULO */}
              <h3 style={{ marginTop: "10px" }}>{juego.titulo}</h3>

              {/* 📌 ESTADO */}
              <p>
                <strong>Estado:</strong> {juego.estado}
              </p>

              {/* ⏱ HORAS JUGADAS */}
              <p>
                <strong>Horas jugadas:</strong> {juego.horasJugadas ?? 0} h
              </p>

              {/* GENERO */}
              <p><strong>Género:</strong> {juego.genero}</p>

              {/* BOTÓN EDITAR */}
              <Link 
                to={`/juegos/editar/${juego._id}`} 
                className="edit-link"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "8px 12px",
                  background: "#ff4da6",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none"
                }}
              >
                Editar / Ver
              </Link>

              {/* ⭐ BOTÓN RESEÑAS */}
              <Link 
                to={`/juegos/${juego._id}/reviews`} 
                className="edit-link"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  marginLeft: "10px",
                  padding: "8px 12px",
                  background: "#6b5bff",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none"
                }}
              >
                Reseñas ⭐
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default HomePage;

