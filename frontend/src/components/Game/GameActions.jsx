import './GameActions.css';

const GameActions = ({ game, onToggle, onEdit, onDelete }) => {
  return (
    <div className="game-actions-container">
      {!game.completado && (
        <button
          onClick={() => onToggle(game)}
          className="action-btn completed"
        >
          Marcar como Completado
        </button>
      )}

      {game.completado && (
        <button
          onClick={() => onToggle(game)}
          className="action-btn pending"
        >
          Marcar como Pendiente
        </button>
      )}

      <button
        onClick={onEdit}
        className="action-btn edit"
      >
        ✏️ Editar
      </button>

      {!game.completado && (
        <button
          onClick={onDelete}
          className="action-btn delete"
        >
          🗑️ Eliminar
        </button>
      )}
    </div>
  );
};

export default GameActions;
