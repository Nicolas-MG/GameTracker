import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateGame } from "../services/api";

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
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative"
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

          <h2 className="text-2xl font-bold mb-4">Editar Juego</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-2"
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
