import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import Dashboard from "./components/Dashboard";

function App() {
  const [view, setView] = useState("games");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">🎮 GameTracker</h1>

        <nav className="flex gap-3">
          <button
            onClick={() => setView("games")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              view === "games"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Juegos
          </button>

          <button
            onClick={() => setView("dashboard")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              view === "dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Dashboard
          </button>
        </nav>
      </header>

      {/* Contenido dinámico */}
      <AnimatePresence mode="wait">
        {view === "games" && (
          <motion.div
            key="games"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <GameList />
            <GameForm onGameAdded={() => setRefresh(!refresh)} />
          </motion.div>
        )}

        {view === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
