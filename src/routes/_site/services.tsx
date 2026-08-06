import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/_site/services")({ component: ServicesPage });

const GROUPS = ["Hair", "Make-up", "Nails", "Skin & Spa", "Hair Removal"] as const;

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Our"
        script="Services"
        subtitle="From everyday styling to complete bridal transformations — a curated menu delivered with care in our ladies-only salon."
        crumbs={[{ label: "Services" }]}
      />

      {GROUPS.map((group) => {
        const list = SERVICES.filter((s) => s.group === group);
        return (
          <section key={group} className="py-14 border-b border-border">
            <div className="container-x">
              <h2 className="text-3xl md:text-4xl">{group}</h2>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((s) => (
                  <Link
                    key={s.slug}
                    to="/service/$slug"
                    params={{ slug: s.slug }}
                    className="group rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] hover:border-primary/40 transition-all"
                  >
                    <h3 className="text-xl group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Details <ChevronRight className="size-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

    </>
  );
}
