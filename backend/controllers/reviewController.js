import Review from "../models/Review.js";


// Con este controlador podemos obtener todas las reseñas
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("juegoId", "titulo genero plataforma");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error });
  }
};

// con este controlador podemos obtener las reseñas de un juego
export const getReviewsByGame = async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error });
  }
};

// con este controlador nos permite crear reseñas
export const createReview = async (req, res) => {
  try {
    const { juegoId } = req.params;

    const newReview = new Review({
      juegoId,
      ...req.body,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error al crear reseña:", error);
    res.status(400).json({ message: "Error al crear reseña", error });
  }
};


// con este controlador podemos actualizar reseñas
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

// con este controlador podemos eliminar reseñas
export const  deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reseña", error });
  }
};
