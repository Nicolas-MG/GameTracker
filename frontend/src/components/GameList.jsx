import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGames } from "../services/api";
import GameDetail from "./GameDetail";
import Filters from "./Filters";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [filters, setFilters] = useState({
    genero: "",
    plataforma: "",
    completado: "",
  });

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, games]);

  const fetchGames = async () => {
    const res = await getGames();
    setGames(res.data);
    setFilteredGames(res.data);
  };

  const applyFilters = () => {
    let result = [...games];

    if (filters.genero) {
      result = result.filter((g) => g.genero === filters.genero);
    }
    if (filters.plataforma) {
      result = result.filter((g) => g.plataforma === filters.plataforma);
    }
    if (filters.completado) {
      result = result.filter(
        (g) => String(g.completado) === filters.completado
      );
    }

    setFilteredGames(result);
  };

  return (
    <div>
      {/* Filtros */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Lista de juegos */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game._id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col cursor-pointer hover:shadow-xl transition"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedGame(game)}
          >
            <img
              src={game.imagenPortada}
              alt={game.titulo}
              className="rounded-xl h-40 w-full object-cover"
            />
            <h2 className="text-xl font-bold mt-4">{game.titulo}</h2>
            <p className="text-gray-600">
              {game.genero} • {game.plataforma}
            </p>
            <span
              className={`mt-2 px-2 py-1 rounded text-sm ${
                game.completado
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {game.completado ? "Completado" : "Pendiente"}
            </span>
          </motion.div>
        ))}
      </div>

      {selectedGame && (
        <GameDetail game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

export default GameList;
