import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './RatingBarChart.css';

const RatingBarChart = ({ ratingChart }) => (
  <div className="rating-barchart-container">
    <h3 className="rating-barchart-title">Promedio de Rating por Género</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={ratingChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} /> {/* Asumiendo que el rating va de 0 a 10 */}
        <Tooltip />
        <Bar dataKey="value" fill="#9C27B0" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default RatingBarChart;
