// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { getGames, updateGame } from "../services/api";
// import GameDetail from "./GameDetail";
// import Filters from "./Filters";
// import EditGame from "./EditGame";
// import DeleteConfirm from "./DeleteConfirm";

// const GameList = () => {
//   const [games, setGames] = useState([]);
//   const [filteredGames, setFilteredGames] = useState([]);
//   const [selectedGame, setSelectedGame] = useState(null);
//   const [editingGame, setEditingGame] = useState(null);
//   const [deletingGame, setDeletingGame] = useState(null);
//   const [filters, setFilters] = useState({
//     genero: "",
//     plataforma: "",
//     completado: "",
//   });

//   useEffect(() => {
//     fetchGames();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [filters, games]);

//   const fetchGames = async () => {
//     const res = await getGames();
//     setGames(res.data);
//     setFilteredGames(res.data);
//   };

//   const applyFilters = () => {
//     let result = [...games];

//     if (filters.genero) {
//       result = result.filter((g) => g.genero === filters.genero);
//     }
//     if (filters.plataforma) {
//       result = result.filter((g) => g.plataforma === filters.plataforma);
//     }
//     if (filters.completado) {
//       result = result.filter(
//         (g) => String(g.completado) === filters.completado
//       );
//     }

//     setFilteredGames(result);
//   };

//   const toggleCompletion = async (game) => {
//     try {
//       await updateGame(game._id, { completado: !game.completado });
//       fetchGames();
//     } catch (error) {
//       console.error("Error al actualizar el estado:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Filtros */}
//       <Filters filters={filters} setFilters={setFilters} />

//       {/* Lista de juegos */}
//       <div className="grid md:grid-cols-3 gap-6 mt-6">
//         {filteredGames.map((game, index) => (
//           <motion.div
//             key={game._id}
//             className="bg-white shadow-lg rounded-2xl p-4 flex flex-col hover:shadow-xl transition"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <img
//               src={game.imagenPortada}
//               alt={game.titulo}
//               className="rounded-xl h-40 w-full object-cover cursor-pointer"
//               onClick={() => setSelectedGame(game)}
//             />
//             <h2 className="text-xl font-bold mt-4">{game.titulo}</h2>
//             <p className="text-gray-600">
//               {game.genero} • {game.plataforma}
//             </p>

//             <span
//               className={`mt-2 px-2 py-1 rounded text-sm w-fit ${
//                 game.completado
//                   ? "bg-green-100 text-green-700"
//                   : "bg-yellow-100 text-yellow-700"
//               }`}
//             >
//               {game.completado ? "Completado ✅" : "Pendiente ⏳"}
//             </span>

//             <div className="mt-3 flex flex-wrap gap-2">
//               <button
//                 onClick={() => toggleCompletion(game)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                   game.completado
//                     ? "bg-yellow-500 hover:bg-yellow-600 text-white"
//                     : "bg-green-500 hover:bg-green-600 text-white"
//                 }`}
//               >
//                 {game.completado ? "Marcar como Pendiente" : "Marcar como Completado"}
//               </button>

//               <button
//                 onClick={() => setEditingGame(game)}
//                 className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
//               >
//                 ✏️ Editar
//               </button>

//               <button
//                 onClick={() => setDeletingGame(game)}
//                 className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
//               >
//                 🗑️ Eliminar
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {selectedGame && (
//         <GameDetail game={selectedGame} onClose={() => setSelectedGame(null)} />
//       )}

//       {editingGame && (
//         <EditGame
//           game={editingGame}
//           onClose={() => setEditingGame(null)}
//           onSave={fetchGames}
//         />
//       )}

//       {deletingGame && (
//         <DeleteConfirm
//           game={deletingGame}
//           onClose={() => setDeletingGame(null)}
//           onDeleted={fetchGames}
//         />
//       )}
//     </div>
//   );
// };

// export default GameList;
