import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Feb", value: 18 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 44 },
  { month: "May", value: 43 },
  { month: "Jun", value: 46 },
  { month: "Jul", value: 68 },
];

const ParisBaguetteBrandSearchChart = () => {
  return (
    <div className="w-full bg-background border border-border rounded-xl p-6 my-8">
      <p className="text-sm font-semibold text-foreground mb-1">
        Brand Search Volume — "Paris Baguette Canary Wharf"
      </p>
      <p className="text-xs text-muted-foreground mb-6">
        Since Trapeze Media joined · Source: Google Search Console
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            name="Brand Search Volume"
            stroke="hsl(338, 64%, 47%)"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Brand searches for Paris Baguette Canary Wharf increased sharply from the month we launched.
      </p>
    </div>
  );
};

export default ParisBaguetteBrandSearchChart;
