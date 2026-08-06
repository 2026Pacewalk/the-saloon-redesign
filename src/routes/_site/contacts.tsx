import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/_site/contacts")({ component: ContactsPage });

function ContactsPage() {
  return (
    <>
      <PageHero eyebrow="Say hello" title="Contact" script="Us" crumbs={[{ label: "Contact" }]}
        subtitle="We'd love to hear from you — for appointments, courses, or any questions." />
      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl md:text-4xl">Get in touch</h2>
            <div className="mt-8 space-y-5">
              <Info icon={MapPin} title="Visit us" body={CONTACT.address} />
              <Info icon={Phone} title="Call / WhatsApp" body={CONTACT.phone} href={CONTACT.phoneHref} />
              <Info icon={Mail} title="Email" body={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <Info icon={Clock} title="Open hours" body={CONTACT.hours} />
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-border aspect-[16/10]">
              <iframe
                title="1st Lady Hair & Beauty Salon location"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={CONTACT.mapEmbed}
              />
            </div>
            <a href={CONTACT.mapLink} target="_blank" rel="noreferrer" className="btn-ghost mt-4">
              <MapPin className="size-4" /> Get Directions
            </a>
          </div>
          <ContactForm kind="contact" />
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
