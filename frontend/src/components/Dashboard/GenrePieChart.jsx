import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import './GenrePieChart.css';

const GenrePieChart = ({ genreChart }) => {
  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#00BCD4"];

  return (
    <div className="genre-piechart-container">
      <h3 className="genre-piechart-title">Juegos por Género</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={genreChart}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {genreChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenrePieChart;
