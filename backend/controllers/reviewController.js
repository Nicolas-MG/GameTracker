import Review from "../models/Review.js";

// Obtener reseñas de un juego
export const getReviewsByGame = async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error });
  }
};

// Crear reseña
export const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error al crear reseña", error });
  }
};

// Actualizar reseña
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ message: "Reseña no encontrada" });
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar reseña", error });
  }
};

// Eliminar reseña
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reseña", error });
  }
};
