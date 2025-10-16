import { motion, AnimatePresence } from "framer-motion";
import { deleteGame } from "../../../services/api";
import "./DeleteConfirm.css"; // Importamos el archivo CSS

const DeleteConfirm = ({ game, onClose, onDeleted }) => {
  const handleDelete = async () => {
    await deleteGame(game._id);
    onDeleted();
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
          <h2 className="modal-title">¿Eliminar juego?</h2>
          <p className="modal-description">
            Estás a punto de eliminar <strong>{game.titulo}</strong>. <br />
            Esta acción no se puede deshacer.
          </p>

          <div className="modal-actions">
            <button
              onClick={onClose}
              className="modal-button-cancel"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="modal-button-delete"
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
