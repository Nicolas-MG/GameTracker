import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Games
export const getGames = () => API.get("/games");
export const createGame = (game) => API.post("/games", game);
export const deleteGame = (id) => API.delete(`/games/${id}`);

// Stats
export const getStats = () => API.get("/stats");

// Reviews ( Reseñas)
// Este nos permite obtener las reseñas de un juego específico
export const getReviews = (gameId) => API.get(`/reviews/${gameId}`);

// Este nos permite crear una nueva reseña
export const createReview = (gameId, review) => 
  API.post(`/reviews/${gameId}`, review);


// Este nos permite actualizar una reseña existente
export const updateGame = (id, data) => API.put(`/games/${id}`, data);



// Este nos sirve para eliminar las reseñas que no queremos
export const deleteReview = async (id) => {
  return await API.delete(`/reviews/${id}`);

  
};



export default API;