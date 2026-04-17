import { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  month: string;
  venue_visits: number;
  cpa: number;
}

interface VenueVisitsCPAChartProps {
  data?: DataPoint[];
  showVenueVisits?: boolean;
  showCPA?: boolean;
  className?: string;
}

const defaultData: DataPoint[] = [
  { month: "", venue_visits: 1200, cpa: 45 },
  { month: "", venue_visits: 280, cpa: 78 },
  { month: "", venue_visits: 350, cpa: 92 },
  { month: "", venue_visits: 520, cpa: 68 },
  { month: "", venue_visits: 180, cpa: 42 },
  { month: "", venue_visits: 420, cpa: 115 },
  { month: "", venue_visits: 280, cpa: 138 },
  { month: "", venue_visits: 240, cpa: 125 },
  { month: "", venue_visits: 180, cpa: 142 },
  { month: "", venue_visits: 120, cpa: 118 },
  { month: "", venue_visits: 95, cpa: 98 },
  { month: "", venue_visits: 110, cpa: 112 },
  { month: "", venue_visits: 85, cpa: 105 },
  { month: "", venue_visits: 75, cpa: 118 },
  { month: "", venue_visits: 65, cpa: 125 },
  { month: "", venue_visits: 55, cpa: 135 },
];

// No editorial callout labels — chart speaks for itself
const editorialLabels: { dataIndex: number; label: string; position: "top" }[] = [];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
  showVenueVisits: boolean;
  showCPA: boolean;
}

const CustomTooltip = ({ 
  active, 
  payload, 
  label, 
  showVenueVisits, 
  showCPA 
}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const venueVisitsData = payload.find(p => p.dataKey === "venue_visits");
  const cpaData = payload.find(p => p.dataKey === "cpa");

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-3 min-w-[160px]">
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      <div className="space-y-1.5">
        {showCPA && cpaData && (
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: "hsl(338, 64%, 47%)" }} 
            />
            <span className="text-sm text-muted-foreground">Venue Visits</span>
          </div>
        )}
        {showVenueVisits && venueVisitsData && (
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm border-2 border-muted-foreground/40 bg-muted/60" 
            />
            <span className="text-sm text-muted-foreground">Cost-Per-Acquisition</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom dot renderer that shows editorial labels
const EditorialDot = (props: any) => {
  const { cx, cy, index } = props;
  const editorial = editorialLabels.find(e => e.dataIndex === index);
  
  if (!editorial) return null;

  return (
    <g>
      {/* Callout box */}
      <rect
        x={cx - 52}
        y={cy - 40}
        width={104}
        height={24}
        rx={6}
        fill="hsl(338, 64%, 47%)"
        opacity={0.9}
      />
      {/* Small triangle pointer */}
      <polygon
        points={`${cx - 4},${cy - 16} ${cx + 4},${cy - 16} ${cx},${cy - 10}`}
        fill="hsl(338, 64%, 47%)"
        opacity={0.9}
      />
      {/* Label text */}
      <text
        x={cx}
        y={cy - 24}
        textAnchor="middle"
        fill="white"
        fontSize={11}
        fontWeight={600}
        fontFamily="var(--font-ui)"
      >
        {editorial.label}
      </text>
      {/* Dot on the line */}
      <circle cx={cx} cy={cy} r={4} fill="hsl(338, 64%, 47%)" stroke="white" strokeWidth={2} />
    </g>
  );
};

export function VenueVisitsCPAChart({
  data = defaultData,
  showVenueVisits: initialShowVenueVisits = true,
  showCPA: initialShowCPA = true,
  className,
}: VenueVisitsCPAChartProps) {
  const [showVenueVisits, setShowVenueVisits] = useState(initialShowVenueVisits);
  const [showCPA, setShowCPA] = useState(initialShowCPA);

  return (
    <div className={cn("w-full", className)}>
      {/* Legend (non-interactive) */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-foreground">Venue Visits</span>
          <div
            className="w-6 h-3 rounded-full"
            style={{ backgroundColor: "hsl(338, 64%, 47%)" }}
          />
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-foreground">Cost-Per-Acquisition</span>
          <div
            className="w-4 h-4 rounded-sm border-2"
            style={{ borderColor: "hsl(0, 0%, 75%)", backgroundColor: "hsl(0, 0%, 92%)" }}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[450px] md:h-[500px] bg-background rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 50, right: 20, bottom: 80, left: 20 }}
          >
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="hsl(0, 0%, 90%)" 
              vertical={false}
              horizontalPoints={[0, 25, 50, 75, 100]}
            />
            
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: "hsl(var(--muted-foreground))", 
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "var(--font-ui)",
              }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={false}
              domain={[0, "auto"]}
            />
            
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={false}
              domain={[0, "auto"]}
            />
            
            <Tooltip
              content={
                <CustomTooltip 
                  showVenueVisits={showVenueVisits} 
                  showCPA={showCPA} 
                />
              }
              cursor={{ 
                stroke: "hsl(0, 0%, 80%)", 
                strokeWidth: 1,
                strokeDasharray: "4 4"
              }}
            />
            
            {showVenueVisits && (
              <Area
                yAxisId="left"
                type="stepAfter"
                dataKey="venue_visits"
                fill="hsl(0, 0%, 92%)"
                fillOpacity={0.8}
                stroke="hsl(0, 0%, 75%)"
                strokeWidth={2}
                animationDuration={1000}
              />
            )}
            
            {showCPA && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cpa"
                stroke="hsl(338, 64%, 47%)"
                strokeWidth={3}
                dot={<EditorialDot />}
                activeDot={{ 
                  r: 6, 
                  fill: "hsl(338, 64%, 47%)",
                  stroke: "white",
                  strokeWidth: 2
                }}
                animationDuration={1000}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
