import { useState } from "react";
import GameList from "./components/Game/GameList";
import GameForm from "./components/Game/GameForm";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  const [view, setView] = useState("games");
  const [games, setGames] = useState([]);

  const handleAddGame = (newGame) => {
    setGames([...games, newGame]);
    setView("games");
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎮 GameTracker</h1>

        <nav className="nav">
          <button
            onClick={() => setView("games")}
            className={`${
              view === "games" ? "bg-blue" : "bg-gray"
            }`}
          >
            Juegos
          </button>

          <button
            onClick={() => setView("dashboard")}
            className={`${
              view === "dashboard" ? "bg-blue" : "bg-gray"
            }`}
          >
            Dashboard
          </button>

          {/* Con este botón se abre el formulario */}
          <button
            onClick={() => setView("addGame")}
            className={`${
              view === "addGame" ? "bg-green" : "bg-gray"
            }`}
          >
            ➕ Agregar Juego
          </button>
        </nav>
      </header>

      {/* Aca Renderizamos las vistas */}
      <div className="view-container">
        {view === "games" && <GameList games={games} />}
        {view === "dashboard" && <Dashboard />}
        {view === "addGame" && (
          <GameForm onSave={handleAddGame} onCancel={() => setView("games")} />
        )}
      </div>
    </div>
  );
}

export default App;
