import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PlatformBarChart = ({ platformChart }) => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <h3 className="text-lg font-bold mb-2">Juegos por Plataforma</h3>
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
