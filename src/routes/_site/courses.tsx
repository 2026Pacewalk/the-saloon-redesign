import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { COURSES, COURSE_GROUPS } from "@/lib/site-data";

export const Route = createFileRoute("/_site/courses")({ component: CoursesPage });

const groupMeta: Record<string, { anchor: string; blurb: string }> = {
  Certificate: { anchor: "certificate", blurb: "Short, focused certificates to build a specific skill fast." },
  Diploma: { anchor: "diploma", blurb: "In-depth diplomas that make you salon-ready and job-confident." },
  Advanced: { anchor: "advanced", blurb: "Flagship advanced and post-graduate programmes for future masters." },
};

function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="1st Lady Beauty Academy"
        title="Professional"
        script="Courses"
        subtitle="Certificate, diploma and advanced programmes in beauty, hair, make-up and spa — taught hands-on by industry professionals."
        crumbs={[{ label: "Courses" }]}
      />

      {COURSE_GROUPS.map((group) => {
        const list = COURSES.filter((c) => c.group === group);
        const meta = groupMeta[group];
        return (
          <section key={group} id={meta.anchor} className="py-16 lg:py-20 border-b border-border scroll-mt-28">
            <div className="container-x">
              <span className="eyebrow">{group}</span>
              <h2 className="mt-3 text-3xl md:text-4xl">{group} Courses</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl">{meta.blurb}</p>

              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((c) => (
                  <Link
                    key={c.slug}
                    to="/$courseSlug"
                    params={{ courseSlug: c.slug }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] hover:border-primary/40 transition-all"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={c.img}
                        alt={c.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[11px] uppercase tracking-widest text-primary">
                        <Clock className="size-3" /> {c.duration}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-2xl group-hover:text-primary transition-colors">{c.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{c.summary}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-primary">
                        View course <ChevronRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}

function CtaBand() {
  return (
    <section className="py-16" style={{ background: "var(--gradient-blush)" }}>
      <div className="container-x text-center">
        <h2 className="text-3xl md:text-4xl">Ready to start your <span className="script text-primary">beauty career</span>?</h2>
        <p className="mt-4 text-muted-foreground">Talk to our counsellors about batches, fees and enrolment.</p>
        <div className="mt-7 flex justify-center gap-4 flex-wrap">
          <Link to="/appointment" className="btn-primary">Enquire Now</Link>
          <Link to="/contacts" className="btn-ghost">Contact Academy</Link>
        </div>
      </div>
    </section>
  );
}
