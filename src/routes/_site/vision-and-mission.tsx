import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/vision-and-mission")({ component: VisionPage });

const cards = [
  { i: Eye, t: "Our Vision", d: "To be the most loved and respected ladies' salon and beauty academy in the region — where every guest leaves feeling beautiful, confident and cared for." },
  { i: Target, t: "Our Mission", d: "To consistently deliver high customer satisfaction through excellent service, quality products and a welcoming atmosphere at fair, honest prices." },
  { i: Heart, t: "Our Values", d: "Respect, integrity and creativity — a friendly, fair work environment that values diversity, fresh ideas and hard work." },
];

function VisionPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Vision &" script="Mission" crumbs={[{ label: "Vision & Mission" }]}
        subtitle="What drives us every day at 1st Lady Hair & Beauty Salon." />
      <section className="py-16 lg:py-24">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {cards.map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-8 text-center hover:shadow-[var(--shadow-soft)] transition-all">
              <span className="mx-auto grid place-items-center size-16 rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-rose)" }}>
                <Icon className="size-7" />
              </span>
              <h2 className="mt-6 text-2xl">{t}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
