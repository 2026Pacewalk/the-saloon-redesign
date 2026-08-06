import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Handshake, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/_site/frenchise-enquiry")({ component: FranchisePage });

const points = [
  { i: Handshake, t: "Trusted Brand", d: "Partner with an established, well-loved salon & academy name." },
  { i: TrendingUp, t: "Proven Model", d: "Salon + academy revenue streams with strong local demand." },
  { i: MapPin, t: "Full Support", d: "Setup guidance, training and ongoing operational support." },
];

function FranchisePage() {
  return (
    <>
      <PageHero eyebrow="Grow with us" title="Franchise" script="Enquiry" crumbs={[{ label: "Franchise Enquiry" }]}
        subtitle="Interested in bringing 1st Lady to your city? Tell us about yourself and we'll be in touch." />
      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl md:text-4xl">Why partner with 1st Lady?</h2>
            <div className="mt-8 space-y-5">
              {points.map(({ i: Icon, t, d }) => (
                <div key={t} className="flex items-start gap-4">
                  <span className="grid place-items-center size-12 rounded-xl text-primary-foreground shrink-0" style={{ background: "var(--gradient-rose)" }}><Icon className="size-5" /></span>
                  <div>
                    <div className="font-display text-xl">{t}</div>
                    <div className="text-sm text-muted-foreground mt-1">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm kind="franchise" messageLabel="Tell us about your plans / location" />
        </div>
      </section>
    </>
  );
}
