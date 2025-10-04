import Game from "../models/Game.js";
import Review from "../models/Review.js";

export const getStats = async (req, res) => {
  try {
    // Total de juegos
    const totalGames = await Game.countDocuments();

    // Juegos completados
    const completedGames = await Game.countDocuments({ completado: true });

    // Total de horas jugadas (sumando reviews)
    const reviews = await Review.find();
    const totalHours = reviews.reduce((acc, review) => acc + (review.horasJugadas || 0), 0);

    // Promedio de puntuación
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((acc, review) =>
        acc + (review.puntuacion || 0),
        0) / reviews.length).toFixed(2)
        :0;

    res.json({
      totalGames,
      completedGames,
      totalHours,
      avgRating
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estadísticas", error });
  }
};
