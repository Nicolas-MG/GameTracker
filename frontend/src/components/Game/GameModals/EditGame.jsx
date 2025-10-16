import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateGame } from "../../../services/api";
import "./EditGame.css";

const EditGame = ({ game, onClose, onSave }) => {
  const [form, setForm] = useState({
    titulo: game.titulo,
    genero: game.genero,
    plataforma: game.plataforma,
    descripcion: game.descripcion,
    desarrollador: game.desarrollador,
    yearLanzamiento: game.yearLanzamiento,
    imagenPortada: game.imagenPortada,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGame(game._id, form);
    onSave();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button
            className="close-button"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="modal-title">Editar Juego</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label className="modal-label" htmlFor={key}>
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="modal-input"
                />
              </div>
            ))}

            <button
              type="submit"
              className="modal-button"
            >
              Guardar Cambios
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditGame;
