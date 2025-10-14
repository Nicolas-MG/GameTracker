const SearchBar = ({ search, setSearch }) => (
  <div className="flex justify-center mt-4 mb-2">
    <div className="relative w-full max-w-md">
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
      <input
        type="text"
        placeholder="Buscar juego por título, género o plataforma..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default SearchBar;
