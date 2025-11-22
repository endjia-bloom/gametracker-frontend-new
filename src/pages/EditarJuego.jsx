import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarJuego() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    estado: "pendiente",
    horasJugadas: 0,
    imagen: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/juegos/" + id)
      .then((res) => setForm(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:4000/api/juegos/" + id, form)
      .then(() => {
        alert("Juego actualizado ✨");
        navigate("/");
      })
      .catch((err) => alert("Error: " + err.message));
  };

  return (
    <div>
      <h2 className="gold" style={{ fontSize: "26px", marginBottom: "20px" }}>
        Editar Juego
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          name="titulo"
          value={form.titulo}
          placeholder="Título"
          onChange={handleChange}
        />

        <input
          name="genero"
          value={form.genero}
          placeholder="Género"
          onChange={handleChange}
        />

        <input
          name="plataforma"
          value={form.plataforma}
          placeholder="Plataforma"
          onChange={handleChange}
        />

        <input
          name="añoLanzamiento"
          value={form.añoLanzamiento}
          type="number"
          placeholder="Año"
          onChange={handleChange}
        />

        <input
          name="desarrollador"
          value={form.desarrollador}
          placeholder="Desarrollador"
          onChange={handleChange}
        />

        {/* ⭐ NUEVOS CAMPOS */}

        <select 
          name="estado" 
          value={form.estado} 
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
        </select>

        <input
          name="horasJugadas"
          type="number"
          value={form.horasJugadas}
          placeholder="Horas jugadas"
          onChange={handleChange}
        />

        <input
          name="imagen"
          value={form.imagen}
          placeholder="URL de portada"
          onChange={handleChange}
        />

        <button
          className="gold-bg"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
