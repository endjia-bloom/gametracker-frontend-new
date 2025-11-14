import { useState } from "react";
import axios from "axios";

export default function CrearJuego() {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    estado: "pendiente",        // ⭐ nuevo
    horasJugadas: 0,            // ⭐ nuevo
    imagen: ""                  // ⭐ nuevo
  });

  const handleChange = e => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const submitForm = e => {
    e.preventDefault();

    axios.post("http://localhost:4000/api/juegos", form)
      .then(() => {
        alert("Juego agregado ✨");
        window.location.href = "/"   // redirigir a biblioteca
      })
      .catch(err => alert("Error " + err));
  };

  return (
    <div>
      <h2 className="gold" style={{ fontSize: "26px", marginBottom: "20px" }}>
        Agregar Juego
      </h2>

      <form 
        onSubmit={submitForm} 
        style={{ 
          maxWidth: "350px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "12px" 
        }}
      >
        <input name="titulo" placeholder="Título" onChange={handleChange}/>
        <input name="genero" placeholder="Género" onChange={handleChange}/>
        <input name="plataforma" placeholder="Plataforma" onChange={handleChange}/>
        <input name="añoLanzamiento" placeholder="Año" type="number" onChange={handleChange}/>
        <input name="desarrollador" placeholder="Desarrollador" onChange={handleChange}/>

        {/* ⭐ NUEVOS CAMPOS */}
        
        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
        </select>

        <input 
          name="horasJugadas" 
          type="number" 
          placeholder="Horas jugadas"
          value={form.horasJugadas}
          onChange={handleChange}
        />

        <input 
          name="imagen" 
          placeholder="URL de portada (opcional)"
          value={form.imagen}
          onChange={handleChange}
        />

        <button 
          className="gold-bg" 
          style={{ padding: "8px", borderRadius: "8px", border: "none" }}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
