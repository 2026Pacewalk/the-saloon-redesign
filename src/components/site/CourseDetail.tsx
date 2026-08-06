import { Link } from "@tanstack/react-router";
import { Clock, GraduationCap, Check, ChevronRight, Award } from "lucide-react";
import { PageHero } from "./PageHero";
import { COURSES } from "@/lib/site-data";

export function CourseDetail({ slug }: { slug: string }) {
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) {
    return (
      <>
        <PageHero title="Course not found" crumbs={[{ label: "Courses", to: "/courses" }]} />
        <div className="container-x py-20 text-center">
          <Link to="/courses" className="btn-primary">Browse all courses</Link>
        </div>
      </>
    );
  }

  const related = COURSES.filter((c) => c.group === course.group && c.slug !== course.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${course.group} Course`}
        title={course.title}
        subtitle={course.summary}
        crumbs={[{ label: "Courses", to: "/courses" }, { label: course.title }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="eyebrow">Programme overview</span>
            <h2 className="mt-4 text-3xl md:text-4xl">What you'll learn</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              The {course.title} is a hands-on, practice-led programme delivered by experienced instructors at
              1st Lady Beauty Academy. You'll train on live models with professional products and finish
              job-ready, with a recognised certificate on successful completion.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {course.modules.map((m) => (
                <div key={m} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="mt-0.5 grid place-items-center size-6 rounded-full bg-blush text-primary shrink-0"><Check className="size-3.5" /></span>
                  <span className="text-sm">{m}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border p-6" style={{ background: "var(--gradient-blush)" }}>
              <h3 className="text-2xl">Who is it for?</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Perfect for beginners starting a beauty career, working professionals upskilling, or
                entrepreneurs planning their own salon. No prior experience required.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sticky top-28">
              <div className="space-y-4">
                <Row icon={Clock} label="Duration" value={course.duration} />
                <Row icon={GraduationCap} label="Level" value={course.group} />
                <Row icon={Award} label="Certificate" value="On completion" />
              </div>
              <Link to="/appointment" className="btn-primary w-full mt-6">Enquire / Enrol <ChevronRight className="size-4" /></Link>
              <Link to="/contacts" className="btn-ghost w-full mt-3 justify-center">Contact us</Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 border-t border-border bg-muted/40">
          <div className="container-x">
            <h2 className="text-3xl">Related {course.group} courses</h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {related.map((c) => (
                <Link key={c.slug} to="/$courseSlug" params={{ courseSlug: c.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all">
                  {c.img && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={c.img} alt={c.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-widest text-primary">{c.duration}</div>
                    <h3 className="mt-2 text-xl group-hover:text-primary transition-colors">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid place-items-center size-10 rounded-full bg-blush text-primary shrink-0"><Icon className="size-4" /></span>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-display text-lg">{value}</div>
      </div>
    </div>
  );
}
