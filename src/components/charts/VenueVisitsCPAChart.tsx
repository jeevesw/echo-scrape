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

// Sample data from March 2023 to June 2024 (16 points)
const defaultData: DataPoint[] = [
  { month: "March 2023", venue_visits: 1200, cpa: 45 },
  { month: "April 2023", venue_visits: 280, cpa: 78 },
  { month: "May 2023", venue_visits: 350, cpa: 92 },
  { month: "June 2023", venue_visits: 520, cpa: 68 },
  { month: "July 2023", venue_visits: 180, cpa: 42 },
  { month: "August 2023", venue_visits: 420, cpa: 115 },
  { month: "September 2023", venue_visits: 280, cpa: 138 },
  { month: "October 2023", venue_visits: 240, cpa: 125 },
  { month: "November 2023", venue_visits: 180, cpa: 142 },
  { month: "December 2023", venue_visits: 120, cpa: 118 },
  { month: "January 2024", venue_visits: 95, cpa: 98 },
  { month: "February 2024", venue_visits: 110, cpa: 112 },
  { month: "March 2024", venue_visits: 85, cpa: 105 },
  { month: "April 2024", venue_visits: 75, cpa: 118 },
  { month: "May 2024", venue_visits: 65, cpa: 125 },
  { month: "June 2024", venue_visits: 55, cpa: 135 },
];

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
            <span className="text-sm text-muted-foreground">Venue Visits:</span>
            <span className="text-sm font-medium text-foreground ml-auto">
              {cpaData.value.toLocaleString()}
            </span>
          </div>
        )}
        {showVenueVisits && venueVisitsData && (
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm border-2 border-muted-foreground/40 bg-muted/60" 
            />
            <span className="text-sm text-muted-foreground">Cost-Per-Acquisition:</span>
            <span className="text-sm font-medium text-foreground ml-auto">
              £{venueVisitsData.value.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
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
      {/* Legend / Toggle Controls */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <button
          onClick={() => setShowCPA(!showCPA)}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-opacity duration-200",
            !showCPA && "opacity-40"
          )}
        >
          <span className="text-foreground">Venue Visits</span>
          <div 
            className="w-6 h-3 rounded-full"
            style={{ backgroundColor: "hsl(338, 64%, 47%)" }}
          />
        </button>

        <button
          onClick={() => setShowVenueVisits(!showVenueVisits)}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-opacity duration-200",
            !showVenueVisits && "opacity-40"
          )}
        >
          <span className="text-foreground">Cost-Per-Acquisition</span>
          <div 
            className="w-4 h-4 rounded-sm border-2 bg-muted/60"
            style={{ borderColor: "hsl(0, 0%, 70%)" }}
          />
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-[400px] md:h-[450px] bg-background rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
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
            
            {/* Left Y-axis for Venue Visits (stepped area) - hidden labels */}
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={false}
              domain={[0, "auto"]}
            />
            
            {/* Right Y-axis for CPA (line) - hidden labels */}
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
            
            {/* Stepped Area for Cost-Per-Acquisition (grey) */}
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
            
            {/* Smooth Line for Venue Visits (magenta/primary) */}
            {showCPA && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cpa"
                stroke="hsl(338, 64%, 47%)"
                strokeWidth={3}
                dot={false}
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
