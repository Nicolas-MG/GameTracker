const GameActions = ({ game, onToggle, onEdit, onDelete }) => {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {!game.completado && (
        <button
          onClick={() => onToggle(game)}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium"
        >
          Marcar como Completado
        </button>
      )}

      {game.completado && (
        <button
          onClick={() => onToggle(game)}
          className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
        >
          Marcar como Pendiente
        </button>
      )}

      <button
        onClick={onEdit}
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
      >
        ✏️ Editar
      </button>

      {!game.completado && (
        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
        >
          🗑️ Eliminar
        </button>
      )}
    </div>
  );
};

export default GameActions;
