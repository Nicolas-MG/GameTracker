import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RatingBarChart = ({ ratingChart }) => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <h3 className="text-lg font-bold mb-2">Promedio de Rating por Género</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={ratingChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#9C27B0" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default RatingBarChart;
