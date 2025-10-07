import { motion, AnimatePresence } from "framer-motion";
import { deleteGame } from "../services/api";

const DeleteConfirm = ({ game, onClose, onDeleted }) => {
  const handleDelete = async () => {
    await deleteGame(game._id);
    onDeleted();
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
          className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ¿Eliminar juego?
          </h2>
          <p className="text-gray-700 mb-6">
            Estás a punto de eliminar <strong>{game.titulo}</strong>. <br />
            Esta acción no se puede deshacer.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Eliminar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirm;
