import express from "express";
import { getGames, createGame, getGameById, updateGame, deleteGame } from "../controllers/gameController.js";

const router = express.Router();

// RUTAS PARA MANEJAR LOS JUEGOS

// Obtener todos los juegos
router.get("/", getGames);

// Crear un juego nuevo
router.post("/", createGame);

// Obtener un juego por ID
router.get("/:id", getGameById);

// Actualizar un juego por ID
router.put("/:id", updateGame);

// Eliminar un juego por ID
router.delete("/:id", deleteGame);

export default router;



