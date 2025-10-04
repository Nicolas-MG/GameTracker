import { useState } from "react";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import Stats from "./components/Stats";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">🎮 GameTracker</h1>
      <Stats />
      <GameForm onGameAdded={() => setRefresh(!refresh)} />
      <GameList key={refresh} />
    </div>
  );
}

export default App;

