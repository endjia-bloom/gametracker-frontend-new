// gametracker-frontend/src/pages/AddGamePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JuegoService } from '../services/JuegoService';

function AddGamePage() {
  const [formData, setFormData] = useState({
    titulo: '', genero: '', plataforma: '', añoLanzamiento: '', desarrollador: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, añoLanzamiento: Number(formData.añoLanzamiento) };

    try {
      await JuegoService.createJuego(dataToSend);
      setSuccessMessage('✅ Juego añadido correctamente!');
      setTimeout(() => { navigate('/'); }, 2000); // Redirige después de 2 segundos
      
    } catch (err) {
      setError("Error al crear el juego. Revisa los campos.");
    }
  };

  return (
    <div className="form-container">
      <h1>➕ Añadir Nuevo Juego</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="game-form">
        <label>Título:</label><input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
        <label>Género:</label><input type="text" name="genero" value={formData.genero} onChange={handleChange} required />
        <label>Plataforma:</label><input type="text" name="plataforma" value={formData.plataforma} onChange={handleChange} required />
        <label>Año de Lanzamiento:</label><input type="number" name="añoLanzamiento" value={formData.añoLanzamiento} onChange={handleChange} required />
        <label>Desarrollador:</label><input type="text" name="desarrollador" value={formData.desarrollador} onChange={handleChange} required />

        <button type="submit" className="submit-button">Crear Juego</button>
      </form>
    </div>
  );
}
export default AddGamePage;