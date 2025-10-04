import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getStats } from "../services/api";

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await getStats();
    setStats(res.data);
  };

  if (!stats) return <p className="text-gray-500">Cargando estadísticas...</p>;

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-gray-100 p-4 rounded-xl text-center">
        <h3 className="text-xl font-bold">{stats.totalGames}</h3>
        <p className="text-gray-600">Total Juegos</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-xl text-center">
        <h3 className="text-xl font-bold">{stats.completedGames}</h3>
        <p className="text-gray-600">Completados</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-xl text-center">
        <h3 className="text-xl font-bold">{stats.totalHours}</h3>
        <p className="text-gray-600">Horas Jugadas</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-xl text-center">
        <h3 className="text-xl font-bold">{stats.avgRating}</h3>
        <p className="text-gray-600">Puntuación Promedio</p>
      </div>
    </motion.div>
  );
};

export default Stats;
