import { useState } from "react";
import GameList from "./components/Game/GameList";
import GameForm from "./components/Game/GameForm";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [view, setView] = useState("games");
  const [games, setGames] = useState([]);

  const handleAddGame = (newGame) => {
    setGames([...games, newGame]);
    setView("games");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎮 GameTracker</h1>

        <nav className="space-x-4">
          <button
            onClick={() => setView("games")}
            className={`px-4 py-2 rounded-lg ${
              view === "games" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Juegos
          </button>

          <button
            onClick={() => setView("dashboard")}
            className={`px-4 py-2 rounded-lg ${
              view === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Dashboard
          </button>

          {/* Con este botón se abre el formulario */}
          <button
            onClick={() => setView("addGame")}
            className={`px-4 py-2 rounded-lg ${
              view === "addGame" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            ➕ Agregar Juego
          </button>
        </nav>
      </header>

      {/* Aca Renderizamos las vistas */}
      {view === "games" && <GameList games={games} />}
      {view === "dashboard" && <Dashboard />}
      {view === "addGame" && (
        <GameForm onSave={handleAddGame} onCancel={() => setView("games")} />
      )}
    </div>
  );
}

export default App;
