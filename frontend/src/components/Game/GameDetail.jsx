import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getReviews, createReview, deleteReview, updateReview } from "../../services/api";

const GameDetail = ({ game, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [form, setForm] = useState({
    puntuacion: 5,
    textoReview: "",
    horasJugadas: "",
    dificultad: "Normal",
    recomendaria: true,
  });

  useEffect(() => {
    if (game) fetchReviews();
  }, [game]);

  const fetchReviews = async () => {
    try {
      const res = await getReviews(game._id);
      setReviews(res.data);
    } catch (err) {
      console.error("Error al obtener reseñas:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        // 🔁 Actualizar reseña existente
        await updateReview(editingReview._id, { ...form, fechaActualizacion: new Date() });
        setEditingReview(null);
      } else {
        // ➕ Crear nueva reseña
        const newReview = {
          ...form,
          juegoId: game._id,
          fechaCreacion: new Date(),
          fechaActualizacion: new Date(),
        };
        await createReview(game._id, newReview);
      }

      setForm({
        puntuacion: 5,
        textoReview: "",
        horasJugadas: "",
        dificultad: "Normal",
        recomendaria: true,
      });

      fetchReviews();
    } catch (err) {
      console.error("Error al guardar reseña:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta reseña?")) return;
    try {
      await deleteReview(id);
      setReviews(reviews.filter((rev) => rev._id !== id));
    } catch (err) {
      console.error("Error al eliminar reseña:", err);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setForm({
      puntuacion: review.puntuacion,
      textoReview: review.textoReview,
      horasJugadas: review.horasJugadas,
      dificultad: review.dificultad,
      recomendaria: review.recomendaria,
    });
  };

  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Botón cerrar */}
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✖
          </button>

          {/* Info del juego */}
          <div className="flex gap-4">
            <img
              src={game.imagenPortada}
              alt={game.titulo}
              className="rounded-lg w-40 h-40 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{game.titulo}</h2>
              <p className="text-gray-600">
                {game.genero} • {game.plataforma}
              </p>
              <p className="mt-2">{game.descripcion}</p>
              <p className="text-sm text-gray-500 mt-1">
                Desarrollador: {game.desarrollador}
              </p>
              <p className="text-sm text-gray-500">
                Año: {game.yearLanzamiento}
              </p>
            </div>
          </div>

          {/* Reseñas */}
          <h3 className="text-xl font-bold mt-6">Reseñas</h3>
          <div className="space-y-3 mt-2 max-h-56 overflow-y-auto pr-2">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <motion.div
                  key={rev._id}
                  className="border rounded-lg p-3 bg-gray-50 relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Botones */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(rev)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Editar reseña"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar reseña"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Info */}
                  <p className="font-semibold">
                    ⭐ {rev.puntuacion} - {rev.dificultad} ({rev.horasJugadas}h)
                  </p>
                  <p className="text-gray-700">{rev.textoReview}</p>
                  <p className="text-sm text-gray-500">
                    {rev.recomendaria ? "✅ Recomendado" : "❌ No recomendado"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(rev.fechaCreacion).toLocaleString()}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">Aún no hay reseñas</p>
            )}
          </div>

          {/* Formulario de crear/editar */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <h4 className="font-semibold">
              {editingReview ? "✏️ Editar reseña" : "📝 Nueva reseña"}
            </h4>

            <textarea
              name="textoReview"
              placeholder="Escribe tu reseña..."
              value={form.textoReview}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600">Puntuación</label>
                <select
                  name="puntuacion"
                  value={form.puntuacion}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} ⭐
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Horas jugadas</label>
                <input
                  type="number"
                  name="horasJugadas"
                  value={form.horasJugadas}
                  onChange={handleChange}
                  placeholder="Ej: 60"
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600">Dificultad</label>
                <select
                  name="dificultad"
                  value={form.dificultad}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                >
                  {["Fácil", "Normal", "Difícil"].map((dif) => (
                    <option key={dif} value={dif}>
                      {dif}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <input
                  type="checkbox"
                  name="recomendaria"
                  checked={form.recomendaria}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-600">
                  Recomendaría este juego
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full ${
                editingReview ? "bg-emerald-500 hover:bg-emerald-600" : "bg-blue-500 hover:bg-blue-600"
              } text-white py-2 px-4 rounded-lg transition-all`}
            >
              {editingReview ? "Guardar cambios" : "Enviar reseña"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameDetail;
