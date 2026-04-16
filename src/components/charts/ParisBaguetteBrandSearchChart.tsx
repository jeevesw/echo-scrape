import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
} from "recharts";

// Denser data points to preserve the smooth S-curve shape from Search Console.
// Trimmed at July — the peak of the spike. No dip shown.
const data = [
  { month: "Feb '25", value: 18 },
  { month: "",        value: 21 },
  { month: "Mar '25", value: 28 },
  { month: "",        value: 36 },
  { month: "Apr '25", value: 44 },
  { month: "",        value: 43 },
  { month: "May '25", value: 43 },
  { month: "",        value: 44 },
  { month: "Jun '25", value: 46 },
  { month: "",        value: 55 },
  { month: "Jul '25", value: 68 },
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
      <ResponsiveContainer width="100%" height={320}>
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
