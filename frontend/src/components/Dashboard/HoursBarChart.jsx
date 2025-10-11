import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const HoursBarChart = ({ hoursChart }) => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <h3 className="text-lg font-bold mb-2">Horas Jugadas por Género</h3>
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
