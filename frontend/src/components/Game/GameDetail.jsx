import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getReviews, createReview, deleteReview, updateReview } from "../../services/api";
import styles from './GameDetail.module.css';

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
        await updateReview(editingReview._id, { ...form, fechaActualizacion: new Date() });
        setEditingReview(null);
      } else {
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
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.gameDetailContainer}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Botón cerrar */}
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>

          {/* Info del juego */}
          <div className={styles.gameInfo}>
            <img
              src={game.imagenPortada}
              alt={game.titulo}
              className={styles.gameImage}
            />
            <div>
              <h2 className={styles.gameTitle}>{game.titulo}</h2>
              <p className={styles.gameMeta}>
                {game.genero} • {game.plataforma}
              </p>
              <p className={styles.gameDescription}>{game.descripcion}</p>
              <p className={styles.gameDeveloper}>
                Desarrollador: {game.desarrollador}
              </p>
              <p className={styles.gameYear}>
                Año: {game.yearLanzamiento}
              </p>
            </div>
          </div>

          {/* Reseñas */}
          <h3 className={styles.reviewsTitle}>Reseñas</h3>
          <div className={styles.reviewsContainer}>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <motion.div
                  key={rev._id}
                  className={styles.reviewCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Botones */}
                  <div className={styles.reviewButtons}>
                    <button
                      onClick={() => handleEdit(rev)}
                      className={styles.editButton}
                      title="Editar reseña"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className={styles.deleteButton}
                      title="Eliminar reseña"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Info */}
                  <p className={styles.reviewInfo}>
                    ⭐ {rev.puntuacion} - {rev.dificultad} ({rev.horasJugadas}h)
                  </p>
                  <p className={styles.reviewText}>{rev.textoReview}</p>
                  <p className={styles.reviewRecommendation}>
                    {rev.recomendaria ? "✅ Recomendado" : "❌ No recomendado"}
                  </p>
                  <p className={styles.reviewDate}>
                    {new Date(rev.fechaCreacion).toLocaleString()}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className={styles.noReviews}>Aún no hay reseñas</p>
            )}
          </div>

          {/* Formulario de crear/editar */}
          <form onSubmit={handleSubmit} className={styles.reviewForm}>
            <h4 className={styles.formTitle}>
              {editingReview ? "✏️ Editar reseña" : "📝 Nueva reseña"}
            </h4>

            <textarea
              name="textoReview"
              placeholder="Escribe tu reseña..."
              value={form.textoReview}
              onChange={handleChange}
              className={styles.reviewTextarea}
              required
            />

            <div className={styles.formFields}>
              <div>
                <label className={styles.formLabel}>Puntuación</label>
                <select
                  name="puntuacion"
                  value={form.puntuacion}
                  onChange={handleChange}
                  className={styles.formSelect}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} ⭐
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={styles.formLabel}>Horas jugadas</label>
                <input
                  type="number"
                  name="horasJugadas"
                  value={form.horasJugadas}
                  onChange={handleChange}
                  placeholder="Ej: 60"
                  className={styles.formInput}
                  required
                />
              </div>
            </div>

            <div className={styles.formFields}>
              <div>
                <label className={styles.formLabel}>Dificultad</label>
                <select
                  name="dificultad"
                  value={form.dificultad}
                  onChange={handleChange}
                  className={styles.formSelect}
                >
                  {["Fácil", "Normal", "Difícil"].map((dif) => (
                    <option key={dif} value={dif}>
                      {dif}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="recomendaria"
                  checked={form.recomendaria}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <label className={styles.checkboxLabel}>Recomendaría este juego</label>
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.submitButton} ${editingReview ? styles.editing : styles.new}`}
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