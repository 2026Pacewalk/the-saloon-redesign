import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/_site/appointment")({ component: AppointmentPage });

function AppointmentPage() {
  return (
    <>
      <PageHero eyebrow="Reserve your seat" title="Fix an" script="Appointment" crumbs={[{ label: "Appointment" }]}
        subtitle="Tell us what you'd love and when — we'll confirm on WhatsApp or a quick call." />
      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow">We'd love to see you</span>
            <h2 className="mt-4 text-3xl md:text-4xl">Book your visit</h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              Walk-ins are welcome, but a booking guarantees your seat — especially for bridal and long services.
            </p>
            <div className="mt-10 space-y-5">
              <Info icon={MapPin} title="Visit us" body={CONTACT.address} />
              <Info icon={Phone} title="Call / WhatsApp" body={CONTACT.phone} href={CONTACT.phoneHref} />
              <Info icon={Clock} title="Open hours" body={CONTACT.hours} />
            </div>
          </div>
          <AppointmentForm />
        </div>
      </section>
    </>
  );
}

function Info({ icon: Icon, title, body, href }: { icon: any; title: string; body: string; href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid place-items-center size-11 rounded-full bg-primary text-primary-foreground shrink-0"><Icon className="size-4" /></span>
      <div>
        <div className="font-display text-lg">{title}</div>
        {href ? <a href={href} className="text-sm text-muted-foreground hover:text-primary">{body}</a> : <div className="text-sm text-muted-foreground">{body}</div>}
      </div>
    </div>
  );
}
