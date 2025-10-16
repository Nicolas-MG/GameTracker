import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './MonthLineChart.css';

const MonthLineChart = ({ monthChart }) => (
  <div className="month-linechart-container">
    <h3 className="month-linechart-title">Juegos Agregados por Mes</h3>
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
);

export default MonthLineChart;
