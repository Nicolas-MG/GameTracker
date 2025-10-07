import Game from "../models/Game.js";
import Review from "../models/Review.js";


// Este es el controlador que nos permite obtener todos los juegos
export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener juegos", error });
  }
};

// Este es el controlador que nos permite crear un juego
export const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: "Error al crear juego", error });
  }
};

// Este es el controlador que nos permite obtener un juego por ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener juego", error });
  }
};

// Este es el controlador que nos permite actualizar un juego
export const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGame) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar juego", error });
  }
};

// Este es el controlador que nos permite eliminar un juego que ademas elimina las reseñas asociadas al juego
export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el juego existe
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    // Eliminar reseñas asociadas
    const deleteResult = await Review.deleteMany({ juegoId: id });

    // Eliminar juego
    await Game.findByIdAndDelete(id);

    res.json({
      message: `Juego "${game.titulo}" y ${deleteResult.deletedCount} reseñas eliminadas correctamente 💥`,
    });
  } catch (error) {
    console.error("❌ Error al eliminar el juego:", error);
    res.status(500).json({
      message: "Error al eliminar el juego y sus reseñas",
      error: error.message,
    });
  }
};
