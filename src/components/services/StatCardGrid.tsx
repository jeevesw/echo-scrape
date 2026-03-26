interface Stat {
  value: string;
  label: string;
  accent?: boolean;
}

interface StatCardGridProps {
  stats: Stat[];
  columns?: 2 | 3;
}

export function StatCardGrid({ stats, columns = 3 }: StatCardGridProps) {
  return (
    <div className={`grid gap-6 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-muted rounded-2xl p-8 border-t-4 border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <span className="heading-display text-5xl text-primary block mb-2">{stat.value}</span>
          <span className="text-muted-foreground text-sm">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
