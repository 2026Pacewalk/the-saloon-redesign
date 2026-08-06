import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/_site/service/$slug")({ component: ServiceDetailPage });

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <PageHero title="Service not found" crumbs={[{ label: "Services", to: "/services" }]} />
        <div className="container-x py-20 text-center">
          <Link to="/services" className="btn-primary">Back to services</Link>
        </div>
      </>
    );
  }

  const related = SERVICES.filter((s) => s.group === service.group && s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.group}
        title={service.title}
        subtitle={service.blurb}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <img
              src={service.img}
              alt={`${service.title} at 1st Lady Hair & Beauty Salon`}
              width={800}
              height={600}
              className="w-full aspect-[16/9] object-cover rounded-2xl border border-border shadow-[var(--shadow-soft)] mb-10"
            />
            <h2 className="text-3xl md:text-4xl">About this service</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our {service.title.toLowerCase()} is performed by trained specialists using premium, skin-friendly
              products in a relaxing, private, ladies-only environment. Every appointment begins with a quick
              consultation so the finish is tailored exactly to you.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {["Expert, trained therapists", "Premium quality products", "Hygienic, sanitised tools", "Personalised consultation"].map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="grid place-items-center size-6 rounded-full bg-blush text-primary shrink-0"><Check className="size-3.5" /></span>
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sticky top-28 text-center">
              <div className="script text-3xl text-primary">Book now</div>
              <p className="mt-2 text-sm text-muted-foreground">Reserve your seat for {service.title}.</p>
              <Link to="/appointment" className="btn-primary w-full mt-5">Fix an Appointment <ChevronRight className="size-4" /></Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 border-t border-border bg-muted/40">
          <div className="container-x">
            <h2 className="text-3xl">More {service.group} services</h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {related.map((s) => (
                <Link key={s.slug} to="/service/$slug" params={{ slug: s.slug }} className="group rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all">
                  <h3 className="text-xl group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{s.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
