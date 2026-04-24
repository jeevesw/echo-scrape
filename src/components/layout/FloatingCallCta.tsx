import { useState } from "react";
import { Phone, X } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/trapezemedia/discovery-call";

export function FloatingCallCta() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Schedule a call"
        className={`group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground ring-2 ring-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 ${
          collapsed
            ? "h-12 w-12 md:h-14 md:w-14 justify-center p-0"
            : "h-12 md:h-14 pl-4 pr-5 md:pl-5 md:pr-6"
        }`}
      >
        <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
        {!collapsed && (
          <span className="text-sm md:text-base font-semibold whitespace-nowrap">
            Schedule a Call
          </span>
        )}
      </a>

      {!collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse schedule a call button"
          className="h-10 w-10 md:h-11 md:w-11 inline-flex items-center justify-center rounded-full bg-background/90 text-foreground border border-border shadow-md hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}