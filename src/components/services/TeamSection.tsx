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
}

export function TeamSection({ serviceName }: TeamSectionProps) {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const nameOrder = ["Kitty", "Dani", "Lily", "Ashley", "Jeeves"];
    supabase
      .from("authors")
      .select("id, name, role, avatar_url")
      .then(({ data }) => {
        if (data) {
          const sorted = [...data].sort((a, b) => {
            const aIdx = nameOrder.findIndex(n => a.name.startsWith(n));
            const bIdx = nameOrder.findIndex(n => b.name.startsWith(n));
            return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
          });
          setAuthors(sorted);
        }
      });
  }, []);

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
              <div key={author.id} className="flex flex-col items-center text-center w-40">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-background mb-4">
                  {author.avatar_url ? (
                    <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
                <h3 className="heading-display text-base text-foreground mb-1">{author.name}</h3>
                {author.role && <p className="text-muted-foreground text-sm">{author.role}</p>}
              </div>
            ))}
          </div>
          {secondRow.length > 0 && (
            <div className="flex justify-center gap-8 lg:gap-12 flex-wrap">
              {secondRow.map((author) => (
                <div key={author.id} className="flex flex-col items-center text-center w-40">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-background mb-4">
                    {author.avatar_url ? (
                      <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="heading-display text-base text-foreground mb-1">{author.name}</h3>
                  {author.role && <p className="text-muted-foreground text-sm">{author.role}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
