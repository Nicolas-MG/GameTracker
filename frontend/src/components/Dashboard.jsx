import { useEffect, useState } from "react";
import { getStats, getGames } from "../services/api";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#00BCD4"];

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

  // --- 🎮 Juegos por género ---
  const genreData = games.reduce((acc, game) => {
    acc[game.genero] = (acc[game.genero] || 0) + 1;
    return acc;
  }, {});
  const genreChart = Object.keys(genreData).map((g) => ({ name: g, value: genreData[g] }));

  // --- 🕹️ Juegos por plataforma ---
  const platformData = games.reduce((acc, game) => {
    acc[game.plataforma] = (acc[game.plataforma] || 0) + 1;
    return acc;
  }, {});
  const platformChart = Object.keys(platformData).map((p) => ({ name: p, value: platformData[p] }));

  // --- ✅ Completados vs Pendientes ---
  const completionChart = [
    { name: "Completados", value: games.filter(g => g.completado).length },
    { name: "Pendientes", value: games.filter(g => !g.completado).length },
  ];

  // --- ⏱️ Horas por género (si tienes `horasJugadas`) ---
  const hoursByGenre = games.reduce((acc, g) => {
    if (g.horasJugadas) acc[g.genero] = (acc[g.genero] || 0) + g.horasJugadas;
    return acc;
  }, {});
  const hoursChart = Object.keys(hoursByGenre).map((g) => ({ name: g, value: hoursByGenre[g] }));

  // --- ⭐ Promedio de rating por género ---
  const ratingByGenre = games.reduce((acc, g) => {
    if (g.rating) {
      if (!acc[g.genero]) acc[g.genero] = { total: 0, count: 0 };
      acc[g.genero].total += g.rating;
      acc[g.genero].count++;
    }
    return acc;
  }, {});
  const ratingChart = Object.keys(ratingByGenre).map((g) => ({
    name: g,
    value: (ratingByGenre[g].total / ratingByGenre[g].count).toFixed(1),
  }));

  // --- 📅 Juegos agregados por mes ---
  const gamesByMonth = games.reduce((acc, g) => {
    if (g.createdAt) {
      const date = new Date(g.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});
  const monthChart = Object.keys(gamesByMonth).map((m) => ({ name: m, value: gamesByMonth[m] }));

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 🔹 Tarjetas resumen */}
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

      {/* 🥧 Juegos por género */}
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

      {/* 🕹️ Juegos por plataforma */}
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

      {/* ✅ Completados vs Pendientes */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-bold mb-2">Completados vs Pendientes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={completionChart} dataKey="value" nameKey="name" outerRadius={100} label>
              {completionChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ⏱️ Horas jugadas por género */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-bold mb-2">Horas Jugadas por Género</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hoursChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#FF9800" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ⭐ Promedio de rating por género */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-bold mb-2">Promedio de Rating por Género</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#9C27B0" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📅 Juegos agregados por mes */}
      <div className="bg-white rounded-xl shadow-md p-4 col-span-2">
        <h3 className="text-lg font-bold mb-2">Juegos Agregados por Mes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Dashboard;
