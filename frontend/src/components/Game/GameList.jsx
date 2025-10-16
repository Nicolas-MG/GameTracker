import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getGames, updateGame } from "../../services/api";
import Filters from "../Filters/Filters";
import SearchBar from "../Filters/SearchBar";
import GameGrid from "./GameGrid";
import GameModals from "./GameModals/GameModals";
import { useFilteredGames } from "../../hooks/useFilteredGames";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({ genero: "", plataforma: "", completado: "" });
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [editingGame, setEditingGame] = useState(null);
  const [deletingGame, setDeletingGame] = useState(null);

  const filteredGames = useFilteredGames(games, filters, search);

  useEffect(() => { fetchGames(); }, []);

  const fetchGames = async () => {
    const res = await getGames();
    setGames(res.data);
  };

  const toggleCompletion = async (game) => {
    await updateGame(game._id, { completado: !game.completado });
    fetchGames();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Barra de búsqueda */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Filtros */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Grilla de Juegos */}
      <GameGrid
        games={filteredGames}
        onToggle={toggleCompletion}
        onSelect={setSelectedGame}
        onEdit={setEditingGame}
        onDelete={setDeletingGame}
      />

      {/* Modales */}
      <GameModals
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        editingGame={editingGame}
        setEditingGame={setEditingGame}
        deletingGame={deletingGame}
        setDeletingGame={setDeletingGame}
        onUpdate={fetchGames}
      />
    </motion.div>
  );
};

export default GameList;
