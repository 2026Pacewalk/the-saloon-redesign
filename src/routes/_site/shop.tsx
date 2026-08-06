import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/shop")({ component: ShopPage });

function ShopPage() {
  return (
    <>
      <PageHero eyebrow="Salon Store" title="Beauty" script="Shop" crumbs={[{ label: "Shop" }]} />
      <section className="py-20 lg:py-28">
        <div className="container-x max-w-2xl text-center">
          <span className="mx-auto grid place-items-center size-20 rounded-3xl text-primary-foreground" style={{ background: "var(--gradient-rose)" }}>
            <ShoppingBag className="size-9" />
          </span>
          <h2 className="mt-8 text-4xl md:text-5xl">Coming <span className="script text-primary">Soon</span></h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Our online store is on its way. Soon you'll be able to browse and buy the professional tools and beauty
            products we trust and use in the salon — right here.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground">
            <Clock className="size-4 text-primary" /> Launching shortly
          </div>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Link to="/appointment" className="btn-primary">Book an Appointment</Link>
            <Link to="/contacts" className="btn-ghost">Contact the salon</Link>
          </div>
        </div>
      </section>
    </>
  );
}
