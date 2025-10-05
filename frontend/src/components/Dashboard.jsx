import { useEffect, useState } from "react";
import { getStats, getGames } from "../services/api";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resStats = await getStats();
    setStats(resStats.data);

    const resGames = await getGames();
    setGames(resGames.data);
  };

  if (!stats) return <p className="text-center text-gray-600">Cargando estadísticas...</p>;

  // Juegos por género
  const genreData = games.reduce((acc, game) => {
    acc[game.genero] = (acc[game.genero] || 0) + 1;
    return acc;
  }, {});
  const genreChart = Object.keys(genreData).map((g) => ({ name: g, value: genreData[g] }));

  // Juegos por plataforma
  const platformData = games.reduce((acc, game) => {
    acc[game.plataforma] = (acc[game.plataforma] || 0) + 1;
    return acc;
  }, {});
  const platformChart = Object.keys(platformData).map((p) => ({ name: p, value: platformData[p] }));

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Tarjetas de stats */}
      <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-2xl font-bold">{stats.totalGames}</h3>
          <p className="text-gray-500">Total Juegos</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-2xl font-bold">{stats.completedGames}</h3>
          <p className="text-gray-500">Completados</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-2xl font-bold">{stats.totalHours}</h3>
          <p className="text-gray-500">Horas Jugadas</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <h3 className="text-2xl font-bold">{stats.avgRating}</h3>
          <p className="text-gray-500">Promedio Rating</p>
        </div>
      </div>

      {/* Gráfico géneros */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-bold mb-2">Juegos por Género</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={genreChart} dataKey="value" nameKey="name" outerRadius={100} label>
              {genreChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico plataformas */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-bold mb-2">Juegos por Plataforma</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={platformChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#2196F3" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Dashboard;
