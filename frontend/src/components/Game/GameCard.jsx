import { motion } from "framer-motion";
import GameActions from "./GameActions";

const GameCard = ({ game, onToggle, onSelect, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        boxShadow: "0 15px 25px rgba(0,0,0,0.1)",
      }}
      whileTap={{ scale: 0.97 }}
      className="bg-white shadow-lg rounded-2xl p-4 flex flex-col hover:shadow-xl transition-transform duration-300 cursor-pointer"
    >
      {/* Imagen */}
      <motion.img
        src={game.imagenPortada}
        alt={game.titulo}
        className="rounded-xl h-48 w-full object-cover"
        onClick={onSelect}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      {/* Info */}
      <div className="mt-4">
        <h2 className="text-xl font-bold">{game.titulo}</h2>
        <p className="text-gray-600 text-sm">
          {game.genero} • {game.plataforma}
        </p>

        <span
          className={`mt-2 inline-block px-2 py-1 rounded text-sm font-medium ${
            game.completado
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {game.completado ? "Completado ✅" : "Pendiente ⏳"}
        </span>
      </div>

      {/* Botones */}
      <GameActions
        game={game}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </motion.div>
  );
};

export default GameCard;
