import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/faq")({ component: FaqPage });

const faqs = [
  { q: "Do I need an appointment or can I walk in?", a: "Walk-ins are welcome, but we recommend booking an appointment to guarantee your seat — especially for bridal and long services." },
  { q: "Is the salon ladies-only?", a: "Yes. 1st Lady is a private, ladies-only salon so you can relax in a safe and comfortable environment." },
  { q: "What are your opening hours?", a: "We're open Monday to Sunday, 9:00 AM to 8:00 PM." },
  { q: "Do you offer bridal packages?", a: "Absolutely — we offer complete bridal make-over packages including make-up, hair-do, saree draping and mehndi. Contact us to customise your package." },
  { q: "Do you provide beauty courses?", a: "Yes, our academy offers certificate, diploma and advanced programmes in beauty, hair, make-up and spa. See the Courses page for details." },
  { q: "How can I check my course result?", a: "Visit the Result page and enter your roll number / registration details to view your result online." },
  { q: "Which products do you use?", a: "We use trusted, professional-grade products and maintain strict hygiene with sanitised tools for every guest." },
];

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Help" title="Frequently Asked" script="Questions" crumbs={[{ label: "FAQ" }]}
        subtitle="Everything you need to know about visiting 1st Lady Hair & Beauty Salon." />
      <section className="py-16 lg:py-20">
        <div className="container-x max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:shadow-[var(--shadow-soft)]">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-display text-lg pr-4">{f.q}</span>
                <Plus className="size-5 text-primary shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
