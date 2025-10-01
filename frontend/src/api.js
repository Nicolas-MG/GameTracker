const API_URL = "http://localhost:5000/api";

export const getGames = async () => {
  const res = await fetch(`${API_URL}/games`);
  return res.json();
};

export const createGame = async (game) => {
  const res = await fetch(`${API_URL}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return res.json();
};
