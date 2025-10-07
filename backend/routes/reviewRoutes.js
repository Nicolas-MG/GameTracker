import express from "express";
import { getReviewsByGame, createReview, updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

// RUTAS PARA MANEJAR LAS RESEÑAS

// Obtener todas las reseñas de un juego
router.get("/:juegoId", getReviewsByGame);

// Crear una reseña para un juego
router.post("/:juegoId", createReview);

// Actualizar una reseña de un juego
router.put("/:id", updateReview);

// Elimina una reseña de un juego
router.delete("/:id", deleteReview);

export default router;

