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
        <div className="juegos-list">
          {juegos.map((juego) => (
            <div key={juego._id} className="juego-card">
              <h3>{juego.titulo}</h3>
              <p><strong>Género:</strong> {juego.genero}</p>
              <Link to={`/juegos/editar/${juego._id}`} className="edit-link">
                Editar/Ver
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default HomePage;