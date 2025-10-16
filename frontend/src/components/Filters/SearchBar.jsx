import './SearchBar.css';

const SearchBar = ({ search, setSearch }) => (
  <div className="search-bar-container">
    <div className="search-bar-input-container">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Buscar juego por título, género o plataforma..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  </div>
);

export default SearchBar;
