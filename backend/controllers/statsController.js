import Game from "../models/Game.js";
import Review from "../models/Review.js";


// Funciones auxiliares para cada cálculo
const calculateTotalGames = (games) => games.length;
const calculateCompletedGames = (games) => games.filter((g) => g.completado).length;
const calculateTotalHours = (reviews) => reviews.reduce((sum, r) => sum + (r.horasJugadas || 0), 0);
const calculateAvgRating = (reviews) => {
  const ratings = reviews.map((r) => r.puntuacion);
  return ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : 0;
};

const calculateGamesByGenre = (games) => {
  return games.reduce((acc, g) => {
    acc[g.genero] = (acc[g.genero] || 0) + 1;
    return acc;
  }, {});
};

const calculateGamesByPlatform = (games) => {
  return games.reduce((acc, g) => {
    const plataformas = Array.isArray(g.plataforma) ? g.plataforma : [g.plataforma];
    plataformas.forEach((p) => {
      acc[p] = (acc[p] || 0) + 1;
    });
    return acc;
  }, {});
};

const calculateHoursByGenre = (reviews, games) => {
  const hoursByGenre = {};
  for (const review of reviews) {
    const game = games.find((g) => g._id.equals(review.juegoId));
    if (game && review.horasJugadas) {
      hoursByGenre[game.genero] = (hoursByGenre[game.genero] || 0) + review.horasJugadas;
    }
  }
  return hoursByGenre;
};

const calculateRatingByGenre = (reviews, games) => {
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
  return ratingByGenre;
};

const calculateGamesByDay = (games) => {
  return games.reduce((acc, g) => {
    const date = new Date(g.fechaCreacion);
    const day = date.toLocaleDateString("default", { year: 'numeric', month: 'numeric', day: 'numeric' }); // 'YYYY/MM/DD'
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
};

// Función principal para obtener las estadísticas
export const getStats = async (req, res) => {
  try {
    const games = await Game.find();
    const reviews = await Review.find();

    // Calcular estadísticas usando las funciones auxiliares
    const totalGames = calculateTotalGames(games);
    const completedGames = calculateCompletedGames(games);
    const totalHours = calculateTotalHours(reviews);
    const avgRating = calculateAvgRating(reviews);
    const gamesByGenre = calculateGamesByGenre(games);
    const gamesByPlatform = calculateGamesByPlatform(games);
    const hoursByGenre = calculateHoursByGenre(reviews, games);
    const ratingByGenre = calculateRatingByGenre(reviews, games);
    const gamesByDay = calculateGamesByDay(games);

    res.json({
      totalGames,
      completedGames,
      totalHours,
      avgRating,
      gamesByGenre,
      gamesByPlatform,
      hoursByGenre,
      ratingByGenre,
      gamesByDay,
    });
  } catch (error) {
    console.error("Error en getStats:", error);
    res.status(500).json({ message: "Error al obtener estadísticas", error });
  }
};
