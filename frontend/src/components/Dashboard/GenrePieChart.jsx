import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const GenrePieChart = ({ genreChart }) => {
  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#00BCD4"];

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-bold mb-2">Juegos por Género</h3>
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
