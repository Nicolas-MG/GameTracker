import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './HoursBarChart.css';

const HoursBarChart = ({ hoursChart }) => (
  <div className="hours-barchart-container">
    <h3 className="hours-barchart-title">Horas Jugadas por Género</h3>
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
);

export default HoursBarChart;
