import { useEffect, useState } from "react";
import { getStats, getGames } from "../services/api";
import { motion } from "framer-motion";
import SummaryCard from "./Dashboard/SummaryCard";
import GenrePieChart from "./Dashboard/GenrePieChart";
import PlatformBarChart from "./Dashboard/PlatformBarChart";
import CompletionPieChart from "./Dashboard/CompletionPieChart";
import HoursBarChart from "./Dashboard/HoursBarChart";
import RatingBarChart from "./Dashboard/RatingBarChart";
import MonthLineChart from "./Dashboard/MonthLineChart";

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

  // Datos para los gráficos
  const genreData = games.reduce((acc, game) => {
    acc[game.genero] = (acc[game.genero] || 0) + 1;
    return acc;
  }, {});
  const genreChart = Object.keys(genreData).map((g) => ({ name: g, value: genreData[g] }));

  const platformData = games.reduce((acc, game) => {
    acc[game.plataforma] = (acc[game.plataforma] || 0) + 1;
    return acc;
  }, {});
  const platformChart = Object.keys(platformData).map((p) => ({ name: p, value: platformData[p] }));

  const completionChart = [
    { name: "Completados", value: games.filter((g) => g.completado).length },
    { name: "Pendientes", value: games.filter((g) => !g.completado).length },
  ];

  const hoursChart = Object.keys(stats.hoursByGenre || {}).map((g) => ({
    name: g,
    value: stats.hoursByGenre[g],
  }));

  const ratingChart = Object.keys(stats.ratingByGenre || {}).map((g) => ({
    name: g,
    value: parseFloat(stats.ratingByGenre[g]),
  }));

  const monthChart = Object.keys(stats.gamesByMonth || {}).map((m) => ({
    name: m,
    value: stats.gamesByMonth[m],
  }));

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Tarjetas Resumen */}
      <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Juegos" value={stats.totalGames} />
        <SummaryCard title="Completados" value={stats.completedGames} />
        <SummaryCard title="Horas Jugadas" value={stats.totalHours} />
        <SummaryCard title="Promedio Rating" value={stats.avgRating} />
      </div>

      {/* Gráficos */}
      <GenrePieChart genreChart={genreChart} />
      <PlatformBarChart platformChart={platformChart} />
      <CompletionPieChart completionChart={completionChart} />
      <HoursBarChart hoursChart={hoursChart} />
      <RatingBarChart ratingChart={ratingChart} />
      <MonthLineChart monthChart={monthChart} />
    </motion.div>
  );
};

export default Dashboard;
