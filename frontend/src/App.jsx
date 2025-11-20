import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import GameList from "./components/Game/GameList";
import GameForm from "./components/Game/GameForm";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>🎮 GameTracker</h1>

          <nav className="nav">
            <NavLink
              to="/games"
              className={({ isActive }) =>
                `nav-button ${isActive ? "bg-blue" : "bg-gray"}`
              }
            >
              Juegos
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-button ${isActive ? "bg-blue" : "bg-gray"}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/addGame"
              className={({ isActive }) =>
                `nav-button ${isActive ? "bg-green" : "bg-gray"}`
              }
            >
              ➕ Agregar Juego
            </NavLink>

            <button
              aria-label="Cambiar tema"
              className="nav-button theme-toggle"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
            </button>
          </nav>
        </header>

        <div className="view-container">
          <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addGame" element={<GameForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;