import Game from "../models/Game.js";
import Review from "../models/Review.js";

export const getStats = async (req, res) => {
  try {
    const games = await Game.find();
    const reviews = await Review.find();

    const totalGames = games.length;
    const completedGames = games.filter((g) => g.completado).length;

    // 🔹 Total horas jugadas (sumadas de reviews)
    const totalHours = reviews.reduce((sum, r) => sum + (r.horasJugadas || 0), 0);

    // 🔹 Promedio de rating global
    const ratings = reviews.map((r) => r.puntuacion);
    const avgRating = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

    // 🔹 Juegos por género
    const gamesByGenre = games.reduce((acc, g) => {
      acc[g.genero] = (acc[g.genero] || 0) + 1;
      return acc;
    }, {});

    // 🔹 Juegos por plataforma
    const gamesByPlatform = games.reduce((acc, g) => {
      const plataformas = Array.isArray(g.plataforma)
        ? g.plataforma
        : [g.plataforma];
      plataformas.forEach((p) => {
        acc[p] = (acc[p] || 0) + 1;
      });
      return acc;
    }, {});

    // 🔹 Horas jugadas por género (desde reviews)
    const hoursByGenre = {};
    for (const review of reviews) {
      const game = games.find((g) => g._id.equals(review.juegoId));
      if (game && review.horasJugadas) {
        hoursByGenre[game.genero] =
          (hoursByGenre[game.genero] || 0) + review.horasJugadas;
      }
    }

    // 🔹 Promedio de rating por género
    const ratingByGenre = {};
    for (const review of reviews) {
      const game = games.find((g) => g._id.equals(review.juegoId));
      if (game) {
        if (!ratingByGenre[game.genero]) {
          ratingByGenre[game.genero] = { total: 0, count: 0 };
        }
        ratingByGenre[game.genero].total += review.puntuacion;
        ratingByGenre[game.genero].count++;
      }
    }
    for (const genero in ratingByGenre) {
      ratingByGenre[genero] = (
        ratingByGenre[genero].total / ratingByGenre[genero].count
      ).toFixed(1);
    }

    // 🔹 Juegos creados por mes
    const gamesByMonth = games.reduce((acc, g) => {
      const date = new Date(g.fechaCreacion);
      const month = date.toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalGames,
      completedGames,
      totalHours,
      avgRating,
      gamesByGenre,
      gamesByPlatform,
      hoursByGenre,
      ratingByGenre,
      gamesByMonth,
    });
  } catch (error) {
    console.error("Error en getStats:", error);
    res.status(500).json({ message: "Error al obtener estadísticas", error });
  }
};

