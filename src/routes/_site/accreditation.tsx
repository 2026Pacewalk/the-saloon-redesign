import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/accreditation")({ component: AccreditationPage });

const points = [
  "Recognised certificates awarded on successful course completion",
  "Curriculum aligned with professional salon and spa standards",
  "Training on live models with industry-grade products and tools",
  "Experienced, certified instructors and small batch sizes",
  "Placement guidance and entrepreneurship support",
];

function AccreditationPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Our" script="Accreditation" crumbs={[{ label: "Accreditation" }]}
        subtitle="Our academy programmes are designed to professional standards, so your certificate means something." />
      <section className="py-16 lg:py-24">
        <div className="container-x max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-8">
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center size-7 rounded-full bg-blush text-primary shrink-0"><BadgeCheck className="size-4" /></span>
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            For details on specific certifications and affiliations for a particular course, please contact our academy
            counsellors — we're happy to share the latest information.
          </p>
        </div>
      </section>
    </>
  );
}
