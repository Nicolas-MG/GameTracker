import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './PlatformBarChart.css';

const PlatformBarChart = ({ platformChart }) => (
  <div className="platform-barchart-container">
    <h3 className="platform-barchart-title">Juegos por Plataforma</h3>
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
);

export default PlatformBarChart;
