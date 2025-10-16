import { motion } from "framer-motion";
import GameCard from "./GameCard";
import './GameGrid.css';

const GameGrid = ({ games, onToggle, onSelect, onEdit, onDelete }) => (
  <motion.div layout className="game-grid">
    {games.length > 0 ? (
      games.map((game, index) => (
        <motion.div
          key={game._id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="game-grid-item"
        >
          <GameCard
            game={game}
            onToggle={onToggle}
            onSelect={() => onSelect(game)}
            onEdit={() => onEdit(game)}
            onDelete={() => onDelete(game)}
          />
        </motion.div>
      ))
    ) : (
      <p className="no-games-message">No se encontraron juegos que coincidan.</p>
    )}
  </motion.div>
);

export default GameGrid;
