import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/_site/vacancies")({ component: VacanciesPage });

const roles = [
  { title: "Senior Hair Stylist", type: "Full-time", desc: "Experienced in cutting, colour and styling. Bridal experience a plus." },
  { title: "Beautician / Skin Therapist", type: "Full-time", desc: "Facials, clean-ups, waxing and skin treatments." },
  { title: "Nail Technician", type: "Full-time / Part-time", desc: "Manicure, pedicure, gel and nail-art skills." },
  { title: "Beauty Academy Instructor", type: "Full-time", desc: "Teach certificate & diploma students in your specialism." },
];

function VacanciesPage() {
  return (
    <>
      <PageHero eyebrow="Join the team" title="We're" script="Hiring" crumbs={[{ label: "Careers" }]}
        subtitle="Love beauty and hospitality? Grow your career with a supportive, all-women team." />
      <section className="py-16 lg:py-20">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl md:text-4xl">Open positions</h2>
            <div className="mt-8 space-y-4">
              {roles.map((r) => (
                <div key={r.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                    <Briefcase className="size-4" /> {r.type}
                  </div>
                  <h3 className="mt-2 text-xl">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl">Apply now</h2>
            <p className="mt-3 text-muted-foreground">Tell us about yourself and the role you're interested in.</p>
            <div className="mt-6">
              <ContactForm kind="hiring" messageLabel="Role you're applying for + experience" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
