import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/news-and-events")({ component: NewsPage });

const items = [
  { date: "Ongoing", tag: "Academy", title: "New Beauty Academy batches now enrolling", body: "Certificate, diploma and advanced batches are open for admission. Limited seats per batch — enquire early to reserve your place." },
  { date: "Seasonal", tag: "Offer", title: "Bridal season packages", body: "Book your complete bridal make-over package in advance and enjoy priority appointments through the wedding season." },
  { date: "Weekly", tag: "Salon", title: "Midweek pampering specials", body: "Treat yourself midweek with our spa and facial specials — relax, refresh and glow." },
];

function NewsPage() {
  return (
    <>
      <PageHero eyebrow="What's happening" title="News &" script="Events" crumbs={[{ label: "News & Events" }]}
        subtitle="Latest updates, offers and academy announcements from 1st Lady." />
      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-6 max-w-4xl">
          {items.map((n) => (
            <article key={n.title} className="rounded-2xl border border-border bg-card p-7 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
                <CalendarDays className="size-4" /> {n.date} <span className="h-px w-6 bg-border" /> {n.tag}
              </div>
              <h2 className="mt-3 text-2xl">{n.title}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{n.body}</p>
            </article>
          ))}
          <div className="text-center pt-4">
            <Link to="/appointment" className="btn-primary">Book an Appointment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
