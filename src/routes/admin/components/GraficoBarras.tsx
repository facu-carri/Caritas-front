import { ResponsiveContainer, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar, Label } from 'recharts';

const GraficoBarras = ({ nombreEntidades, nombreEjeY, data }) => {
  const renderCustomAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-65)"
          style={{ fontSize: '14px' }}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div>
    <div className="flex flex-col items-center gap-4 mt-36">
        <div className="space-y-2 sticky top-0 py-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{"Información sobre " + nombreEntidades}</h1>
        </div>
    </div>
      {data && data.length !== 0 ? (
        <div style={{ width: '100%', height: 800, marginBottom: 40 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 80, bottom: 250 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                interval={0}
                height={250}
                tick={renderCustomAxisTick}
              />
              <YAxis tick={{ fontSize: 14 }}>
                <Label 
                  value={nombreEjeY} 
                  angle={-90} 
                  position="insideLeft" 
                  style={{ textAnchor: 'middle', fontSize: '16px', fill: '#666' }}
                />
              </YAxis>
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} contentStyle={{ fontSize: '14px' }} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
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
};

export default GraficoBarras;