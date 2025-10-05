import express from "express";
import { getReviewsByGame, createReview, updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/:juegoId", getReviewsByGame);
router.post("/:juegoId", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;

