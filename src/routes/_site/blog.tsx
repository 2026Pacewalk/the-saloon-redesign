import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hair from "@/assets/hair.jpg";
import facial from "@/assets/facial.jpg";
import bridal from "@/assets/bridal.jpg";

export const Route = createFileRoute("/_site/blog")({ component: BlogPage });

const posts = [
  { img: hair, tag: "Style", title: "Hair Accessories You Should Try", excerpt: "After a fresh cut and colour, accessories are a beautiful way to style your new look — here are our favourites." },
  { img: facial, tag: "Care", title: "Tips For Avoiding Heat Styling Damage", excerpt: "Heat styling is fun but damaging over time. These simple swaps keep hair healthier without giving up the glam." },
  { img: bridal, tag: "Bridal", title: "Choosing Your Bridal Hair Style", excerpt: "Your wedding hair completes the look — here's how to plan a bridal style that photographs beautifully all day." },
];

function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Beauty Journal" title="From the" script="Chair" crumbs={[{ label: "Blog" }]}
        subtitle="Tips, trends and inspiration from our stylists. Full blog coming soon." />
      <section className="py-16 lg:py-20">
        <div className="container-x grid md:grid-cols-3 gap-8">
          {posts.map((b) => (
            <article key={b.title} className="group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-widest">
                <span className="text-primary">{b.tag}</span><span className="h-px w-8 bg-border" /><span className="text-muted-foreground">3 min read</span>
              </div>
              <h2 className="mt-3 text-2xl group-hover:text-primary transition-colors">{b.title}</h2>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{b.excerpt}</p>
            </article>
          ))}
        </div>
        <div className="container-x text-center mt-14">
          <p className="text-muted-foreground">Want beauty tips in the meantime?</p>
          <Link to="/appointment" className="btn-primary mt-4">Talk to our stylists</Link>
        </div>
      </section>
    </>
  );
}
