import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { ArrowLeft } from "lucide-react";

const savingsData = [
  { month: 1, savings: 10000, total: 10000 },
  { month: 5, savings: 10000, total: 50000 },
  { month: 10, savings: 10000, total: 100000 },
  { month: 15, savings: 10000, total: 150000 },
  { month: 20, savings: 10000, total: 200000 },
  { month: 25, savings: 10000, total: 250000 },
];

const chartData = Array.from({ length: 25 }, (_, i) => ({
  month: i + 1,
  savings: 10000,
  total: (i + 1) * 10000,
}));

export function StatsScreen() {
  return (
    <div className="min-h-screen bg-white pt-12 pb-32">
      {/* Status Bar */}
      <div className="px-6 flex justify-between items-center mb-8">
        <span>13:39</span>
        <div className="flex gap-2">
          <span>••••</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-32 h-32 mb-4">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="40" fill="white" stroke="#744c34" strokeWidth="8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#744c34" strokeWidth="4" />
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const x1 = 100 + 70 * Math.cos(angle);
              const y1 = 100 + 70 * Math.sin(angle);
              const x2 = 100 + 90 * Math.cos(angle);
              const y2 = 100 + 90 * Math.sin(angle);
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${100 + 85 * Math.cos(angle)} ${100 + 85 * Math.sin(angle)} ${x2} ${y2}`}
                  fill="none"
                  stroke="#744c34"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>
        <h1 className="text-primary mb-2">Мандал Хуримтлал</h1>
        <p className="text-muted-foreground text-sm">Хуримтлалын хүчийг мэдэр</p>
      </div>

      {/* Chart Section */}
      <div className="px-6">
        <h3 className="mb-2">Хуримтлалын Хүч</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Хуримтлалын хүч гэдэг нь таны хуримтлуулсан мөнгө геометр прогрессоор өсөхийг хэлнэ
        </p>

        <div className="mb-4 text-right">
          <span className="text-sm">817 сая</span>
        </div>

        {/* Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                interval={4}
              />
              <YAxis hide />
              <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index < 10 ? "#e5d4d0" : "#744c34"}
                    opacity={index < 10 ? 0.5 : Math.min(0.5 + (index - 10) * 0.05, 1)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-sm">Хуримтлал</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm">Хуримтлалын хүч</span>
          </div>
        </div>

        {/* Summary */}
        <div className="text-sm text-muted-foreground">
          <p>Өдөр бүр: 10 мянган төгрөг</p>
          <p>Хугацаа: 25 жиил</p>
        </div>
      </div>
    </div>
  );
}