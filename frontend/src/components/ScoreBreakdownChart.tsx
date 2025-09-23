import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ScoreBreakdown {
  name: string;
  score: number;
  maxScore: number;
}

interface ChartProps {
  data: ScoreBreakdown[];
}

export function ScoreBreakdownChart({ data }: ChartProps) {
  return (
    // This wrapper div with a fixed height is the key to the fix.
    // It creates a stable container for the chart to render in.
    <div className="mt-4 w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10, // Provide enough space for the right-most bar
            left: -20, // Nudge the chart left to see all labels
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 25]} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              color: '#111827',
            }}
          />
          <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}