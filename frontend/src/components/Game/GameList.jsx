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
  const [gameModal, setGameModal] = useState({
    selectedGame: null,
    editingGame: null,
    deletingGame: null,
  });
  const [loading, setLoading] = useState(false);

  const filteredGames = useFilteredGames(games, filters, search);

  useEffect(() => {
    fetchGames();
  }, []);  


  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await getGames();
      setGames(res.data);
    } catch (error) {
      console.error("Error al obtener juegos:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const toggleCompletion = async (game) => {
    setLoading(true);
    try {
      await updateGame(game._id, { completado: !game.completado });
      fetchGames();  
    } catch (error) {
      console.error("Error al actualizar juego:", error);
      console.error("Detalles del error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Barra de búsqueda */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Filtros */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Indicador de carga */}
      {loading && <p>Cargando...</p>}

      {/* Grilla de Juegos */}
      <GameGrid
        games={filteredGames}
        onToggle={toggleCompletion}
        onSelect={(game) => setGameModal({ ...gameModal, selectedGame: game })}
        onEdit={(game) => setGameModal({ ...gameModal, editingGame: game })}
        onDelete={(game) => setGameModal({ ...gameModal, deletingGame: game })}
      />

      {/* Modales */}
      <GameModals
        selectedGame={gameModal.selectedGame}
        setSelectedGame={(game) => setGameModal({ ...gameModal, selectedGame: game })}
        editingGame={gameModal.editingGame}
        setEditingGame={(game) => setGameModal({ ...gameModal, editingGame: game })}
        deletingGame={gameModal.deletingGame}
        setDeletingGame={(game) => setGameModal({ ...gameModal, deletingGame: game })}
        onUpdate={fetchGames}
      />
    </motion.div>
  );
};

export default GameList;
