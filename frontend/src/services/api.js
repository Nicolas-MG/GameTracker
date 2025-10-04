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

// Reviews
export const getReviews = (gameId) => API.get(`/reviews/${gameId}`);
export const createReview = (gameId, review) => API.post(`/reviews/${gameId}`, review);


export default API;
