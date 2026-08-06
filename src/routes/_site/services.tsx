import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/_site/services")({ component: ServicesPage });

const GROUPS = ["Hair", "Make-up", "Nails", "Hair Removal"] as const;

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
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] hover:border-primary/30 transition-all"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={s.img}
                        alt={`${s.title} at 1st Lady Hair & Beauty Salon`}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-xl text-primary font-medium">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.blurb}</p>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-primary font-medium">
                        Details <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
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
