import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getReviews, createReview } from "../services/api";

const GameDetail = ({ game, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    usuario: "",
    comentario: "",
    puntuacion: 5,
  });

  useEffect(() => {
    if (game) fetchReviews();
  }, [game]);

  const fetchReviews = async () => {
    const res = await getReviews(game._id);
    setReviews(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(game._id, form);
    setForm({ usuario: "", comentario: "", puntuacion: 5 });
    fetchReviews();
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
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✖
          </button>

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
                Año: {game.añoLanzamiento}
              </p>
            </div>
          </div>

          {/* Reseñas */}
          <h3 className="text-xl font-bold mt-6">Reseñas</h3>
          <div className="space-y-3 mt-2 max-h-40 overflow-y-auto pr-2">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="border rounded-lg p-2 bg-gray-50"
                >
                  <p className="font-semibold">
                    ⭐ {rev.puntuacion} - {rev.usuario}
                  </p>
                  <p className="text-gray-700">{rev.comentario}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aún no hay reseñas</p>
            )}
          </div>

          {/* Formulario reseña */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input
              type="text"
              name="usuario"
              placeholder="Tu nombre"
              value={form.usuario}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
            <textarea
              name="comentario"
              placeholder="Tu reseña"
              value={form.comentario}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
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
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
              Enviar Reseña
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameDetail;
