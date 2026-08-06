import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Award, Users, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import interior from "@/assets/interior.jpg";
import hair from "@/assets/hair.jpg";

export const Route = createFileRoute("/_site/overview")({ component: OverviewPage });

const values = [
  { i: Leaf, t: "Eco-Conscious", d: "Beauty with a lower impact on the planet." },
  { i: Award, t: "Expert Stylists", d: "Trained specialists across every service." },
  { i: Users, t: "Ladies Only", d: "A safe, private and welcoming space." },
  { i: Sparkles, t: "Premium Products", d: "Trusted, quality brands you can rely on." },
];

function OverviewPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Salon" script="Overview" crumbs={[{ label: "Overview" }]}
        subtitle="A full-service ladies' beauty salon in Bagha Purana, Moga — delivering quality hair, skin and bridal care in an inviting, ladies-only setting." />

      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={interior} alt="Salon interior" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="hidden md:block absolute -bottom-8 -right-8 w-56 rounded-2xl overflow-hidden shadow-xl border-4 border-background">
              <img src={hair} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-5 text-4xl md:text-5xl">Beauty with a <span className="script text-primary">conscience</span></h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              At <strong className="text-foreground">1st Lady Hair &amp; Beauty Salon</strong> we created a space that offers the
              highest quality hair services in a setting that is healthier for our guests, our staff and the environment.
              We are committed to healthy hair care with a low impact — come see what you and your hair can do for the Earth.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A full-service beauty salon dedicated to consistently providing high customer satisfaction — through
              excellent service, quality products and a welcoming atmosphere at a fair price. We maintain a friendly,
              creative work environment that respects diversity, ideas and hard work.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
              {[{ n: "8+", l: "Years of Craft" }, { n: "2K+", l: "Happy Clients" }, { n: "30+", l: "Services" }].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl md:text-4xl text-primary font-display">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-x grid md:grid-cols-4 gap-8 py-14">
          {values.map(({ i: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <span className="shrink-0 grid place-items-center size-12 rounded-full bg-blush text-primary"><Icon className="size-5" /></span>
              <div>
                <div className="font-display text-xl">{t}</div>
                <div className="text-sm text-muted-foreground mt-1">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/vision-and-mission" className="btn-ghost">Vision &amp; Mission</Link>
            <Link to="/company-history" className="btn-ghost">Our History</Link>
            <Link to="/services" className="btn-primary">Explore Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
