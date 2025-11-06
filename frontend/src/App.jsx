import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import GameList from "./components/Game/GameList";
import GameForm from "./components/Game/GameForm";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
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

// import { NavLink } from "react-router-dom";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import GameList from "./components/Game/GameList";
// import GameForm from "./components/Game/GameForm";
// import Dashboard from "./components/Dashboard/Dashboard";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <header className="header">
//           <h1>🎮 GameTracker</h1>

//           <nav className="nav">
//             <Link to="/games" className="nav-button bg-gray">
//               Juegos
//             </Link>

//             <Link to="/dashboard" className="nav-button bg-gray">
//               Dashboard
//             </Link>

//             <Link to="/addGame" className="nav-button bg-gray">
//               ➕ Agregar Juego
//             </Link>
//           </nav>
//         </header>

//         <div className="view-container">
//           <Routes>
//             <Route path="/" element={<GameList />} />
//             <Route path="/games" element={<GameList />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/addGame" element={<GameForm />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import { useState } from "react";
// import GameList from "./components/Game/GameList";
// import GameForm from "./components/Game/GameForm";
// import Dashboard from "./components/Dashboard/Dashboard";
// import "./App.css";

// function App() {
//   const [view, setView] = useState("games");
//   const [games, setGames] = useState([]);

//   const handleAddGame = (newGame) => {
//     setGames([...games, newGame]);
//     setView("games");
//   };

//   return (
//     <div className="app-container">
//       <header className="header">
//         <h1>🎮 GameTracker</h1>

//         <nav className="nav">
//           <button
//             onClick={() => setView("games")}
//             className={`${
//               view === "games" ? "bg-blue" : "bg-gray"
//             }`}
//           >
//             Juegos
//           </button>

//           <button
//             onClick={() => setView("dashboard")}
//             className={`${
//               view === "dashboard" ? "bg-blue" : "bg-gray"
//             }`}
//           >
//             Dashboard
//           </button>

//           {/* Con este botón se abre el formulario */}
//           <button
//             onClick={() => setView("addGame")}
//             className={`${
//               view === "addGame" ? "bg-green" : "bg-gray"
//             }`}
//           >
//             ➕ Agregar Juego
//           </button>
//         </nav>
//       </header>

//       {/* Aca Renderizamos las vistas */}
//       <div className="view-container">
//         {view === "games" && <GameList games={games} />}
//         {view === "dashboard" && <Dashboard />}
//         {view === "addGame" && (
//           <GameForm onSave={handleAddGame} onCancel={() => setView("games")} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
