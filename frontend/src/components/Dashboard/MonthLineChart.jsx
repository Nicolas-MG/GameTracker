import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MonthLineChart = ({ monthChart }) => (
  <div className="bg-white rounded-xl shadow-md p-4 col-span-2">
    <h3 className="text-lg font-bold mb-2">Juegos Agregados por Mes</h3>
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
