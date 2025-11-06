import { Link, useLocation } from "react-router-dom";
import Router from "./Router";

export default function App() {
  const location = useLocation();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <Link to="/" className="text-3xl font-bold hover:text-blue-600 transition-colors">
          🎮 GameTracker
        </Link>

        <nav className="space-x-4 flex items-center">
          <Link 
            to="/dashboard" 
            className={`px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/dashboard' 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/games" 
            className={`px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/games' 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            Games
          </Link>
          <Link 
            to="/games/new" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Game
          </Link>
        </nav>
      </header>

      <main className="mt-8">
        <Router />
      </main>
    </div>
  );
}
