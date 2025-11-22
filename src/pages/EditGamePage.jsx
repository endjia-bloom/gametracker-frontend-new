// gametracker-frontend/src/pages/EditGamePage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JuegoService } from '../services/JuegoService';

function EditGamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    horasJugadas: '',
    estado: '',
    imagenPortada: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchJuego = async () => {
      try {
        const data = await JuegoService.getJuegoById(id);

        setFormData({
          titulo: data.titulo,
          genero: data.genero,
          plataforma: data.plataforma,
          añoLanzamiento: String(data.añoLanzamiento),
          desarrollador: data.desarrollador,
          horasJugadas: String(data.horasJugadas || 0),
          estado: data.estado || "",
          imagenPortada: data.imagenPortada || "",
        });

        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos.");
        setLoading(false);
      }
    };

    fetchJuego();
  }, [id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await JuegoService.updateJuego(id, {
        ...formData,
        añoLanzamiento: Number(formData.añoLanzamiento),
        horasJugadas: Number(formData.horasJugadas),
      });

      setSuccessMessage("✅ Juego actualizado correctamente.");
    } catch (err) {
      setError("Error al actualizar.");
    }
  };


  const handleDelete = async () => {
    if (window.confirm("¿Seguro de que quieres eliminar este juego?")) {
      try {
        await JuegoService.deleteJuego(id);
        alert("🗑️ Juego eliminado.");
        navigate("/");
      } catch (err) {
        setError("Error al eliminar.");
      }
    }
  };


  if (loading) return <h2>Cargando datos...</h2>;
  if (error) return <h2 className="error-message">{error}</h2>;


  return (
    <div className="form-container">
      <h1>✏️ Editar Juego: {formData.titulo}</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleUpdate} className="game-form">

        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <label>Género:</label>
        <input
          type="text"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        />

        <label>Plataforma:</label>
        <input
          type="text"
          name="plataforma"
          value={formData.plataforma}
          onChange={handleChange}
          required
        />

        <label>Año de Lanzamiento:</label>
        <input
          type="number"
          name="añoLanzamiento"
          value={formData.añoLanzamiento}
          onChange={handleChange}
          required
        />

        <label>Desarrollador:</label>
        <input
          type="text"
          name="desarrollador"
          value={formData.desarrollador}
          onChange={handleChange}
          required
        />

        <label>Horas Jugadas:</label>
        <input
          type="number"
          name="horasJugadas"
          value={formData.horasJugadas}
          onChange={handleChange}
          required
        />

        <label>Estado:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>
          <option value="pendiente">Pendiente</option>
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
        </select>

        <label>Imagen (URL):</label>
        <input
          type="text"
          name="imagenPortada"
          value={formData.imagenPortada}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit" className="submit-button update-button">
            Guardar Cambios
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="submit-button delete-button"
          >
            Eliminar Juego
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGamePage;
