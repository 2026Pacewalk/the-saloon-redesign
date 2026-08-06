import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  script,
  subtitle,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-border" style={{ background: "var(--gradient-blush)" }}>
      <div className="container-x py-16 lg:py-20 text-center">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
          {title}{" "}
          {script && <span className="script text-primary text-5xl md:text-6xl lg:text-7xl">{script}</span>}
        </h1>
        {subtitle && <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}

        <nav className="mt-7 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="size-3.5" />
              {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
