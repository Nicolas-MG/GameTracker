import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getStats } from "../services/api";
import "./Stats.css";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.error("Error al obtener estadísticas:", err);
      setError("Hubo un error al obtener las estadísticas.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Cargando estadísticas...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <motion.div
      className="stats-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="stats-card">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {stats.totalGames}
        </motion.h3>
        <p>Total Juegos</p>
      </div>

      <div className="stats-card">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {stats.completedGames}
        </motion.h3>
        <p>Completados</p>
      </div>

      <div className="stats-card">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {stats.totalHours}
        </motion.h3>
        <p>Horas Jugadas</p>
      </div>

      <div className="stats-card">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {stats.avgRating.toFixed(1)} ⭐
        </motion.h3>
        <p>Puntuación Promedio</p>
      </div>
    </motion.div>
  );
};

export default Stats;
