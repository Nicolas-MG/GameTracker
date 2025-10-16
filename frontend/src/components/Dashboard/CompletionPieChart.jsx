import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import './CompletionPieChart.css';

const CompletionPieChart = ({ completionChart }) => {
  const COLORS = ["#4CAF50", "#E91E63"];

  return (
    <div className="completion-piechart-container">
      <h3 className="completion-title">Completados vs Pendientes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={completionChart}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {completionChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletionPieChart;
