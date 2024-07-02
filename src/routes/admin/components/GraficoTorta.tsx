import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#B0E57C', '#FF6666', '#FFCC00'];

const PieChartSection = ({ nombreEntidades, data }) => (
  <div>
    <div className="flex flex-col items-center gap-4 mt-36">
        <div className="space-y-2 sticky top-0 py-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{"Información sobre " + nombreEntidades}</h1>
        </div>
    </div>
    {data && data.length !==0 ? (
    <div style={{ width: '100%', height: 400, marginBottom: 20 }}>
        <ResponsiveContainer>
        <PieChart>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="valor"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
        </ResponsiveContainer>
    </div>
    ) : (
    <div className="flex flex-col items-center gap-4 mt-36">
      <div className="space-y-2 sticky top-0 py-4">
          <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-2xl">{"No hay " + nombreEntidades + " registrados"}</h2>
      </div>
    </div>
    )}
  </div>
);

export default PieChartSection;
