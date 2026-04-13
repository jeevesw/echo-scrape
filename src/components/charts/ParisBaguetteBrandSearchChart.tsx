// TODO: Replace indexed values with real absolute data
// from Google Search Console when available.

import {
  LineChart,
  Line,
  XAxis,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Feb '25", total: 18, mobile: 14 },
  { month: "Mar '25", total: 28, mobile: 24 },
  { month: "Apr '25", total: 44, mobile: 40 },
  { month: "May '25", total: 43, mobile: 40 },
  { month: "Jun '25", total: 46, mobile: 44 },
  { month: "Jul '25", total: 68, mobile: 65 },
  { month: "Aug '25", total: 70, mobile: 67 },
  { month: "Sep '25", total: 70, mobile: 67 },
  { month: "Oct '25", total: 71, mobile: 68 },
  { month: "Nov '25", total: 70, mobile: 67 },
  { month: "Dec '25", total: 69, mobile: 66 },
  { month: "Jan '26", total: 70, mobile: 67 },
  { month: "Feb '26", total: 60, mobile: 54 },
];

const ParisBaguetteBrandSearchChart = () => {
  return (
    <div className="w-full bg-background border border-border rounded-xl p-6 my-8">
      <p className="text-xs text-muted-foreground mb-4">
        Branded search volume — "Paris Baguette Canary Wharf" (London) · Feb 2025–Feb 2026 · Source: Google Search Console
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 12 }}
          />
          <ReferenceLine
            x="Apr '25"
            stroke="#aaa"
            strokeDasharray="4 4"
            label={{ value: "Phase 1 impact", position: "top", fill: "#888", fontSize: 11 }}
          />
          <ReferenceLine
            x="Jul '25"
            stroke="#aaa"
            strokeDasharray="4 4"
            label={{ value: "Video creative launched", position: "top", fill: "#888", fontSize: 11 }}
          />
          <Legend
            align="right"
            verticalAlign="top"
            iconType="line"
            wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
          />
          <Line
            type="monotone"
            dataKey="total"
            name="Total"
            stroke="#60a5fa"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="mobile"
            name="Mobile"
            stroke="#f87171"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParisBaguetteBrandSearchChart;
