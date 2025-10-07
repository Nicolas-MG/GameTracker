import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Games
export const getGames = () => API.get("/games");
export const createGame = (game) => API.post("/games", game);
export const updateGame = (id, data) => API.put(`/games/${id}`, data);
export const deleteGame = (id) => API.delete(`/games/${id}`);





// Reviews ( Reseñas)
// Este nos permite obtener las reseñas de un juego específico
export const getReviews = (gameId) => API.get(`/reviews/${gameId}`);

// Este nos permite crear una nueva reseña
export const createReview = (gameId, review) => 
  API.post(`/reviews/${gameId}`, review);


// Este nos permite actualizar una reseña existente



// Este nos sirve para eliminar las reseñas que no queremos
export const deleteReview = async (id) => {
  return await API.delete(`/reviews/${id}`);
};

// Stats
export const getStats = () => API.get("/stats");


export default API;