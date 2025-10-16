import { motion } from "framer-motion";
import './GameCard.css';

const GameCard = ({ game, onToggle, onSelect, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="game-card"
    >
      {/* Imagen con badge de estado superpuesto */}
      <div className="game-image-container" onClick={onSelect}>
        <img
          src={game.imagenPortada}
          alt={game.titulo}
          className="game-image"
          loading="lazy"
        />
        <div className={`game-status-badge ${game.completado ? "completed" : "pending"}`}>
          {game.completado ? "✓ COMPLETADO" : "⏳ PENDIENTE"}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="game-content">
        <h2 className="game-title">{game.titulo}</h2>
        
        <div className="game-meta">
          <div className="game-meta-item">
            🎮 {game.genero}
          </div>
          <div className="game-meta-item">
            {game.plataforma}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="game-actions">
          <button
            onClick={onToggle}
            className={`btn-toggle ${game.completado ? "completed" : ""}`}
            title={game.completado ? "Marcar como pendiente" : "Marcar como completado"}
          >
            {game.completado ? "⏳" : "✓"}
          </button>

          <button
            onClick={onEdit}
            className="btn-edit"
            title="Editar juego"
          >
            ✏️
          </button>

          <button
            onClick={onDelete}
            className="btn-delete"
            title="Eliminar juego"
          >
            🗑️
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;