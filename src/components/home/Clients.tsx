import { Link } from "react-router-dom";

export function Clients() {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <Link to="/case-studies" className="block group">
          <h3 className="heading-display text-xl text-center text-foreground group-hover:text-primary transition-colors">
            Who we've worked with
          </h3>
        </Link>
        <p className="mt-6 text-center text-muted-foreground max-w-3xl mx-auto">
          For more than a decade, we've been helping clients reach new audiences by managing and optimising{" "}
          <Link to="/services" className="text-primary hover:underline">paid social ads</Link>,{" "}
          <Link to="/services" className="text-primary hover:underline">paid search ads</Link>, and{" "}
          <Link to="/services" className="text-primary hover:underline">organic social</Link>, plus{" "}
          <Link to="/services" className="text-primary hover:underline">web design and optimisation</Link>.
        </p>
        <p className="mt-4 text-center text-muted-foreground max-w-3xl mx-auto">
          Our successes include campaigns in the hospitality, tourism, and events sectors, with renowned food, drink, and experience brands like including Various Eateries, Hakkasan, and Brighton Fringe.
        </p>
      </div>
    </section>
  );
}
