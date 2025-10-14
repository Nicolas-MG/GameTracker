import { useEffect, useState } from "react";

export const useFilteredGames = (games, filters, search) => {
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    let result = [...games];

    if (filters.genero) result = result.filter(g => g.genero === filters.genero);
    if (filters.plataforma) result = result.filter(g => g.plataforma === filters.plataforma);
    if (filters.completado) result = result.filter(g => String(g.completado) === filters.completado);

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(g =>
        [g.titulo, g.genero, g.plataforma].some(field =>
          field.toLowerCase().includes(s)
        )
      );
    }

    setFilteredGames(result);
  }, [filters, games, search]);

  return filteredGames;
};
