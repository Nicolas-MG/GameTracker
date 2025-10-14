import GameDetail from "../GameDetail";
import EditGame from "./EditGame";
import DeleteConfirm from "./DeleteConfirm";

const GameModals = ({
  selectedGame,
  setSelectedGame,
  editingGame,
  setEditingGame,
  deletingGame,
  setDeletingGame,
  onUpdate,
}) => (
  <>
    {selectedGame && (
      <GameDetail game={selectedGame} onClose={() => setSelectedGame(null)} />
    )}
    {editingGame && (
      <EditGame game={editingGame} onClose={() => setEditingGame(null)} onSave={onUpdate} />
    )}
    {deletingGame && (
      <DeleteConfirm game={deletingGame} onClose={() => setDeletingGame(null)} onDeleted={onUpdate} />
    )}
  </>
);

export default GameModals;
