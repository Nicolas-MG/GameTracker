import { motion } from "framer-motion";
import GameCard from "./GameCard";

const GameGrid = ({ games, onToggle, onSelect, onEdit, onDelete }) => (
  <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    {games.length > 0 ? (
      games.map((game, index) => (
        <motion.div
          key={game._id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
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
      <p className="text-gray-500 text-center col-span-full">
        No se encontraron juegos que coincidan.
      </p>
    )}
  </motion.div>
);

export default GameGrid;
