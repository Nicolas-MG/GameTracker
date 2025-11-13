import { motion } from "framer-motion";
import GameActions from "./GameActions";
import styles from './GameCard.module.css'; 

const GameCard = ({ game, onToggle, onSelect, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={styles['game-card']}
      
    >
      {/* Imagen con badge de estado superpuesto */}
      <div className={styles['game-image-container']} >
        <img
          onClick={onSelect}
          src={game.imagenPortada}
          alt={game.titulo}
          className={styles['game-image']}
          loading="lazy"
        />
        <div className={`${styles['game-status-badge']} ${game.completado ? styles.completed : styles.pending}`}>
          {game.completado ? "✓ COMPLETADO" : "⏳ PENDIENTE"}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className={styles['game-content']}>
        <h2 className={styles['game-title']}>{game.titulo}</h2>
        
        <div className={styles['game-meta']}>
          <div className={styles['game-meta-item']}>
            🎮 {game.genero}
          </div>
          <div className={styles['game-meta-item']}>
            {game.plataforma}
          </div>
        </div>

        {/* Botones de accion */}
        <GameActions
          game={game}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </motion.div>
  );
};

export default GameCard;