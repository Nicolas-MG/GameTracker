import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGames, updateGame } from "../../services/api";
import Filters from "../Filters";
import GameCard from "./GameCard";
import GameDetail from "../GameDetail";
import EditGame from "../EditGame";
import DeleteConfirm from "../DeleteConfirm";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filters, setFilters] = useState({ genero: "", plataforma: "", completado: "" });
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [editingGame, setEditingGame] = useState(null);
  const [deletingGame, setDeletingGame] = useState(null);

  useEffect(() => { fetchGames(); }, []);
  useEffect(() => { applyFilters(); }, [filters, games, search]);
  const fetchGames = async () => {
    const res = await getGames();
    setGames(res.data);
    setFilteredGames(res.data);
  };

  const applyFilters = () => {
    let result = [...games];

    // 🔹 Filtros por género, plataforma y completado
    if (filters.genero) result = result.filter(g => g.genero === filters.genero);
    if (filters.plataforma) result = result.filter(g => g.plataforma === filters.plataforma);
    if (filters.completado) result = result.filter(g => String(g.completado) === filters.completado);

    // 🔍 Filtro de búsqueda (título, género o plataforma)
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(g =>
        [g.titulo, g.genero, g.plataforma].some(field =>
          field.toLowerCase().includes(s)
        )
      );
    }

    setFilteredGames(result);
  };

  const toggleCompletion = async (game) => {
    await updateGame(game._id, { completado: !game.completado });
    fetchGames();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🔹 Barra de búsqueda */}
      <div className="flex justify-center mt-4 mb-2">
        <div className="relative w-full max-w-md">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute left-3 top-2.5 text-gray-400"
          >
            🔍
          </motion.span>
          <input
            type="text"
            placeholder="Buscar juego por título, género o plataforma..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 🔹 Filtros */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* 🔹 Lista de juegos */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
      >
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <motion.div
              key={game._id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GameCard
                game={game}
                onToggle={toggleCompletion}
                onSelect={() => setSelectedGame(game)}
                onEdit={() => setEditingGame(game)}
                onDelete={() => setDeletingGame(game)}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No se encontraron juegos que coincidan.
          </p>
        )}
      </motion.div>

      {/* 🔹 Modales */}
      {selectedGame && (
        <GameDetail game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      {editingGame && (
        <EditGame
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onSave={fetchGames}
        />
      )}

      {deletingGame && (
        <DeleteConfirm
          game={deletingGame}
          onClose={() => setDeletingGame(null)}
          onDeleted={fetchGames}
        />
      )}
    </motion.div>
  );
};

export default GameList;
