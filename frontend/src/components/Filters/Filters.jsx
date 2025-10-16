import './Filters.css';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filters-container">
      <select
        name="genero"
        value={filters.genero}
        onChange={handleChange}
        className="filter-select"
      >
        <option value="">Todos los géneros</option>
        <option value="Acción">Acción</option>
        <option value="RPG">RPG</option>
        <option value="Aventura">Aventura</option>
        <option value="Shooter">Shooter</option>
        <option value="Estrategia">Estrategia</option>
      </select>

      <select
        name="plataforma"
        value={filters.plataforma}
        onChange={handleChange}
        className="filter-select"
      >
        <option value="">Todas las plataformas</option>
        <option value="PC">PC</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Xbox">Xbox</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
      </select>

      <select
        name="completado"
        value={filters.completado}
        onChange={handleChange}
        className="filter-select"
      >
        <option value="">Todos</option>
        <option value="true">Completados</option>
        <option value="false">Pendientes</option>
      </select>
    </div>
  );
};

export default Filters;
