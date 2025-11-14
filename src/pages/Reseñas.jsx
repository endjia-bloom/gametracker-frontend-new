import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Reseñas() {
  const { id } = useParams(); // id del juego
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Form crear reseña
  const [newReview, setNewReview] = useState({
    usuario: "",
    comentario: "",
    calificacion: 5
  });

  // Edición inline
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({
    usuario: "",
    comentario: "",
    calificacion: 5
  });

  // Cargar juego y reseñas
  const loadData = async () => {
    try {
      const [gRes, rRes] = await Promise.all([
        axios.get(`http://localhost:4000/api/juegos/${id}`),
        axios.get(`http://localhost:4000/api/resenas/${id}`)
      ]);
      setGame(gRes.data);
      setReviews(rRes.data);
    } catch (err) {
      console.error("Error cargando datos:", err);
      alert("Error cargando datos. Revisa la consola.");
    }
  };

  useEffect(() => {
    if (!id) return;
    loadData();
    // eslint-disable-next-line
  }, [id]);

  // Cambios en formulario crear
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  // Enviar nueva reseña
  const submitNewReview = async (e) => {
    e.preventDefault();
    // Validación simple
    if (!newReview.usuario.trim() || !newReview.comentario.trim()) {
      alert("Completa tu nombre y comentario.");
      return;
    }
    if (isNaN(Number(newReview.calificacion)) || newReview.calificacion < 1 || newReview.calificacion > 5) {
      alert("La calificación debe ser entre 1 y 5.");
      return;
    }

    try {
      const payload = { ...newReview, juego: id };
      const res = await axios.post("http://localhost:4000/api/resenas", payload);
      // añadir al estado local
      setReviews(prev => [res.data, ...prev]);
      // limpiar form
      setNewReview({ usuario: "", comentario: "", calificacion: 5 });
    } catch (err) {
      console.error("Error creando reseña:", err);
      alert("No se pudo crear la reseña. Revisa la consola.");
    }
  };

  // Borrar reseña
  const handleDelete = async (reviewId) => {
    if (!window.confirm("¿Eliminar esta reseña?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/resenas/${reviewId}`);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
    } catch (err) {
      console.error("Error eliminando reseña:", err);
      alert("No se pudo eliminar la reseña.");
    }
  };

  // Iniciar edición
  const startEdit = (r) => {
    setEditingId(r._id);
    setEditingValues({ usuario: r.usuario, comentario: r.comentario, calificacion: r.calificacion });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingValues({ usuario: "", comentario: "", calificacion: 5 });
  };

  // Cambios en edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingValues(prev => ({ ...prev, [name]: value }));
  };

  // Guardar edición
  const saveEdit = async (reviewId) => {
    if (!editingValues.usuario.trim() || !editingValues.comentario.trim()) {
      alert("Completa tu nombre y comentario.");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:4000/api/resenas/${reviewId}`, editingValues);
      setReviews(prev => prev.map(r => (r._id === reviewId ? res.data : r)));
      cancelEdit();
    } catch (err) {
      console.error("Error actualizando reseña:", err);
      alert("No se pudo actualizar la reseña.");
    }
  };

  return (
    <div>
      {game ? (
        <>
          <h2 className="gold" style={{ fontSize: "26px" }}>{game.titulo}</h2>
          <p style={{ opacity: 0.7 }}>{game.genero} • {game.plataforma}</p>
        </>
      ) : (
        <p>Cargando juego...</p>
      )}

      <section style={{ marginTop: 24 }}>
        <h3>Agregar reseña</h3>
        <form onSubmit={submitNewReview} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480, marginTop: 8 }}>
          <input
            name="usuario"
            placeholder="Tu nombre"
            value={newReview.usuario}
            onChange={handleNewChange}
          />
          <textarea
            name="comentario"
            placeholder="Tu reseña"
            value={newReview.comentario}
            onChange={handleNewChange}
            rows={4}
          />
          <input
            type="number"
            name="calificacion"
            min="1"
            max="5"
            value={newReview.calificacion}
            onChange={handleNewChange}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="gold-bg" style={{ padding: "8px 12px", borderRadius: 8, border: "none" }}>Enviar reseña</button>
            <button type="button" onClick={() => setNewReview({ usuario: "", comentario: "", calificacion: 5 })}>Limpiar</button>
          </div>
        </form>
      </section>

      <section style={{ marginTop: 28 }}>
        <h3>Reseñas ({reviews.length})</h3>

        {reviews.length === 0 && <p>No hay reseñas aún.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          {reviews.map(r => (
            <div key={r._id} className="card" style={{ padding: 12 }}>
              {editingId === r._id ? (
                <>
                  <input name="usuario" value={editingValues.usuario} onChange={handleEditChange} />
                  <textarea name="comentario" value={editingValues.comentario} onChange={handleEditChange} rows={3} />
                  <input type="number" name="calificacion" min="1" max="5" value={editingValues.calificacion} onChange={handleEditChange} />
                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <button onClick={() => saveEdit(r._id)} className="gold-bg" style={{ padding: "6px 10px", border: "none", borderRadius: 6 }}>Guardar</button>
                    <button onClick={cancelEdit} style={{ padding: "6px 10px", borderRadius: 6 }}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>{r.usuario}</strong>
                    <span className="gold">⭐ {r.calificacion}</span>
                  </div>
                  <p style={{ marginTop: 6 }}>{r.comentario}</p>

                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <button onClick={() => startEdit(r)} style={{ fontSize: 14, color: "#d4af37", background: "transparent", border: "none", cursor: "pointer" }}>Editar</button>
                    <button onClick={() => handleDelete(r._id)} style={{ fontSize: 14, color: "#ff4d4f", background: "transparent", border: "none", cursor: "pointer" }}>Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
