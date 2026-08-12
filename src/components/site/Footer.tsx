import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MessageCircle, MapPin, Phone, Clock, Calendar, ArrowUp, ChevronRight, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { CONTACT, SOCIAL } from "@/lib/site-data";

const socials = [
  { Icon: Facebook, href: SOCIAL.facebook, label: "Facebook Page" },
  { Icon: User, href: SOCIAL.facebookProfile, label: "Facebook Profile" },
  { Icon: Instagram, href: SOCIAL.instagram, label: "Instagram" },
  { Icon: MessageCircle, href: SOCIAL.whatsapp, label: "WhatsApp" },
  { Icon: Mail, href: SOCIAL.email, label: "Email" },
];

const explore = [
  { label: "Services", to: "/services" },
  { label: "Courses", to: "/courses" },
  { label: "Gallery", to: "/gallery" },
  { label: "Student Result", to: "/result" },
  { label: "Shop", to: "/shop" },
];

const company = [
  { label: "Overview", to: "/overview" },
  { label: "Vision & Mission", to: "/vision-and-mission" },
  { label: "FAQ", to: "/faq" },
  { label: "We're Hiring", to: "/vacancies" },
  { label: "Franchise Enquiry", to: "/frenchise-enquiry" },
  { label: "Contact", to: "/contacts" },
];

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="relative">
      {/* CTA band */}
      <div className="container-x">
        <div className="relative -mb-16 translate-y-[-2.5rem] overflow-hidden rounded-3xl px-8 py-10 md:px-12 md:py-12 text-background shadow-[var(--shadow-soft)]"
          style={{ background: "var(--gradient-rose)" }}>
          <div className="absolute -right-10 -top-16 size-56 rounded-full bg-background/10 blur-2xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="script text-3xl md:text-4xl">Ready to look fabulous?</div>
              <p className="mt-2 text-background/90 max-w-md">Book your seat today — walk-ins welcome, bookings guaranteed.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/appointment" className="inline-flex items-center gap-2 rounded-full bg-background text-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:-translate-y-0.5 transition-transform">
                <Calendar className="size-4" /> Book Appointment
              </Link>
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-background/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-background/10 transition-colors">
                <Phone className="size-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-foreground text-background/75 pt-28 pb-8">
        <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img src={logo} alt="1st Lady" className="h-14 w-auto brightness-0 invert opacity-90" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A full-service ladies' beauty parlour &amp; academy in Bagha Purana — committed to healthy,
              high-quality hair &amp; beauty care with a lower impact on the environment.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="grid place-items-center size-10 rounded-full border border-background/20 hover:bg-primary hover:border-primary hover:-translate-y-0.5 transition-all">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <div className="text-background font-display text-lg mb-4">Explore</div>
            <ul className="space-y-2.5 text-sm">
              {explore.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="group inline-flex items-center gap-1 hover:text-background">
                    <ChevronRight className="size-3.5 -ml-1 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <div className="text-background font-display text-lg mb-4">Company</div>
            <ul className="space-y-2.5 text-sm">
              {company.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="group inline-flex items-center gap-1 hover:text-background">
                    <ChevronRight className="size-3.5 -ml-1 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <div className="text-background font-display text-lg mb-4">Get in touch</div>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-primary shrink-0" /> <span className="leading-relaxed">{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary shrink-0" /> <a href={CONTACT.phoneHref} className="hover:text-background">{CONTACT.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary shrink-0" /> <a href={SOCIAL.email} className="hover:text-background">{CONTACT.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 text-primary shrink-0" /> <span>{CONTACT.hours}</span>
              </li>
            </ul>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-background/5 border border-background/15 px-4 py-2.5 text-sm hover:bg-background/10 transition-colors">
              <MessageCircle className="size-4 text-primary" /> Chat with us on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="container-x mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/60">
          <div>© {new Date().getFullYear()} {CONTACT.name}. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span>
              Developed by{" "}
              <a href="https://pacewalk.com" target="_blank" rel="noreferrer" className="font-semibold tracking-wide text-background/90 hover:text-primary transition-colors">
                PACEWALK
              </a>
            </span>
            <button onClick={scrollTop} aria-label="Back to top"
              className="grid place-items-center size-9 rounded-full border border-background/20 hover:bg-primary hover:border-primary transition-colors">
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
