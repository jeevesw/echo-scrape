import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

interface Author {
  id: string;
  name: string;
  role: string | null;
  avatar_url: string | null;
}

interface TeamSectionProps {
  serviceName: string;
  /** If provided, only show authors whose name starts with one of these strings (in this order). */
  memberNames?: string[];
}

export function TeamSection({ serviceName, memberNames }: TeamSectionProps) {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    supabase
      .from("authors")
      .select("id, name, role, avatar_url")
      .then(({ data }) => {
        if (data) {
          const order = memberNames ?? ["Kitty", "Dani", "Lily", "Ashley", "Jeeves"];
          const sorted = [...data]
            .filter((a) => order.some((n) => a.name.startsWith(n)))
            .sort((a, b) => {
              const aIdx = order.findIndex((n) => a.name.startsWith(n));
              const bIdx = order.findIndex((n) => b.name.startsWith(n));
              return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
            });
          setAuthors(sorted);
        }
      });
  }, [memberNames]);

  if (authors.length === 0) return null;

  const firstRow = authors.slice(0, 3);
  const secondRow = authors.slice(3);

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">
          Meet Your {serviceName} Team
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-8 lg:gap-12 mb-8 flex-wrap">
            {firstRow.map((author) => (
              <div key={author.id} className="group flex flex-col items-center text-center w-40 cursor-default">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-background mb-4 ring-0 ring-primary/0 transition-all duration-300 ease-out group-hover:ring-2 group-hover:ring-primary/40">
                  {author.avatar_url ? (
                    <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
                <h3 className="heading-display text-base text-foreground mb-1">{author.name}</h3>
                {author.role && <p className="text-muted-foreground text-sm transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-primary">{author.role}</p>}
              </div>
            ))}
          </div>
          {secondRow.length > 0 && (
            <div className="flex justify-center gap-8 lg:gap-12 flex-wrap">
              {secondRow.map((author) => (
                <div key={author.id} className="group flex flex-col items-center text-center w-40 cursor-default">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-background mb-4 ring-0 ring-primary/0 transition-all duration-300 ease-out group-hover:ring-2 group-hover:ring-primary/40">
                    {author.avatar_url ? (
                      <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="heading-display text-base text-foreground mb-1">{author.name}</h3>
                  {author.role && <p className="text-muted-foreground text-sm transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-primary">{author.role}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
