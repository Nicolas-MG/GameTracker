import axios from "axios";

const API = axios.create({
  baseURL: "https://gametracker-l0aj.onrender.com/api"
});

// Games
// Este nos permite obtener todas los Games
export const getGames = () => API.get("/games");

// Este nos permite crear un nuevo Games
export const createGame = (game) => API.post("/games", game);

// Este nos permite obtener un Games con un id especifico
export const updateGame = (id, data) => API.put(`/games/${id}`, data);

// Este nos permite eliminar un Game con un id especifico
export const deleteGame = (id) => API.delete(`/games/${id}`);



// Reviews ( Reseñas)
// Este nos permite obtener todas las reseñas
export const getAllReviews = () => API.get("/reviews");

// Este nos permite obtener las reseñas de un juego específico
export const getReviews = (gameId) => API.get(`/reviews/${gameId}`);

// Este nos permite crear una nueva reseña
export const createReview = (gameId, review) => 
  API.post(`/reviews/${gameId}`, review);


// Este nos permite actualizar una reseña existente
export const updateReview = (id, reviewData) => {
  return API.put(`/reviews/${id}`, reviewData);
};

// Este nos sirve para eliminar las reseñas que no queremos
export const deleteReview = async (id) => {
  return await API.delete(`/reviews/${id}`);
};


// Stats ( Estadisticas )
export const getStats = () => API.get("/stats");


export default API;