import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Scissors, Sparkles, Flower2, Palette, HandHeart, Crown,
  Droplet, Wand2, MapPin, Phone, Clock, Instagram, Facebook,
  Mail, Star, ChevronRight, Calendar, Menu, X, Award, Leaf, Users,
} from "lucide-react";

import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";
import bridal from "@/assets/bridal.jpg";
import facial from "@/assets/facial.jpg";
import nails from "@/assets/nails.jpg";
import hair from "@/assets/hair.jpg";
import interior from "@/assets/interior.jpg";
import g1 from "@/assets/g1.jpg.asset.json";
import g2 from "@/assets/g2.jpg.asset.json";
import g3 from "@/assets/g3.jpg.asset.json";

export const Route = createFileRoute("/")({ component: Home });

const services = [
  { icon: Scissors, title: "Hair Styling", items: "Cuts, Trims, Blow Dry, Hair SPA, Tong, Head Massage, Children Cuts" },
  { icon: Palette, title: "Hair Care & Color", items: "Global Color, Trendy Shades, Streaking, Root Touch-up, Keratin, Rebonding" },
  { icon: Flower2, title: "Threading", items: "Eye Brows, Upper Lip, Chin, Full Face" },
  { icon: Sparkles, title: "Beauty Care", items: "Clean-up, Fruit / Aroma / Herbal / Golden / Pearl Facials, Skin Lightening" },
  { icon: Droplet, title: "Facial Treatments", items: "Face & Neck, Legs, Arms and Full Body luxury facials" },
  { icon: Crown, title: "Bridal Make Over", items: "Bridal Make-up, Reception Look, Bridal Hair-do, Saree Drape, Mehendi" },
  { icon: Wand2, title: "Waxing", items: "Under Arms, Full Arms, Full Legs, Body & Face Waxing" },
  { icon: HandHeart, title: "Hands & Feet", items: "Pedicure, Manicure, Aroma, Paraffin Wax, Spa, French Manicure" },
];

const gallery = [g1.url, g2.url, g3.url, hair, facial, nails, bridal, interior];

const testimonials = [
  { name: "Nicole Steinert", text: "I have visited this salon a few times having had a variety of treatments — all of which have been wonderful. The head massage left me feeling fantastic. Highly recommend." },
  { name: "Tina Courtous", text: "I love this salon. They provide great customer service. When they give you an appointment they make sure they are ready when you arrive." },
  { name: "Smith Arianna", text: "Not only is their work absolutely flawless and stunning, their uplifting personalities and customer service are truly one of a kind!" },
];

const blog = [
  { img: hair, tag: "Style", title: "Hair Accessories You Should Try", excerpt: "After a fresh cut and colour, accessories are a beautiful way to style your new look. Here are our favourites to invest in." },
  { img: facial, tag: "Care", title: "Tips For Avoiding Heat Styling", excerpt: "Heat styling is fun but damaging over time. These simple swaps keep your hair healthier without giving up the glam." },
  { img: bridal, tag: "Bridal", title: "Choosing Your Bridal Hair Style", excerpt: "Your wedding hair completes the look. Here's how to plan a bridal style that photographs beautifully all day long." },
];

const nav = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Top strip */}
      <div className="hidden md:block bg-foreground text-background/90 text-xs">
        <div className="container-x flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><MapPin className="size-3.5" /> Near Gagi Tailor, Old Post Office St., Bagha Purana, Moga 142038</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Clock className="size-3.5" /> Mon – Sun · 9:00 AM – 8:00 PM</span>
            <span className="flex items-center gap-2"><Phone className="size-3.5" /> +91 95015 04300</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-background/85 border-b border-border">
        <div className="container-x flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="1st Lady Hair & Beauty Salon" className="h-12 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-9">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#book" className="hidden lg:inline-flex btn-primary">Book Appointment</a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container-x flex flex-col py-4 gap-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 uppercase text-sm tracking-widest">{n.label}</a>
              ))}
              <a href="#book" onClick={() => setOpen(false)} className="btn-primary self-start mt-2">Book Appointment</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-blush)" }}>
        <div className="container-x grid lg:grid-cols-2 gap-12 py-16 lg:py-24 items-center">
          <div className="relative z-10">
            <span className="eyebrow">Est. Ladies-Only Salon</span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Look <span className="script text-primary text-6xl md:text-7xl lg:text-8xl align-baseline">fabulous</span>,
              <br /> Feel great.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              At <strong className="text-foreground">1st Lady Hair &amp; Beauty Salon</strong> we believe in beauty with a conscience — a full-service parlour delivering
              quality hair, skin and bridal services in an inviting, ladies-only setting.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#book" className="btn-primary"><Calendar className="size-4" /> Fix an Appointment</a>
              <a href="#services" className="btn-ghost">Our Services <ChevronRight className="size-4" /></a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[{n:"15+",l:"Years of Craft"},{n:"20K+",l:"Happy Clients"},{n:"30+",l:"Signature Services"}].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl md:text-4xl text-primary font-display">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-accent/30 blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img src={hero} alt="Beauty treatment at 1st Lady Salon" className="w-full h-full object-cover" width={1600} height={1800} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, oklch(0.2 0.05 15 / 0.5) 100%)" }} />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur rounded-2xl px-5 py-4 shadow-xl border border-border animate-float">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <div className="text-sm mt-1 font-medium">Rated 4.9 / 5</div>
              <div className="text-xs text-muted-foreground">by 500+ women in Moga</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full size-28 md:size-32 flex flex-col items-center justify-center text-center shadow-xl">
              <span className="script text-3xl leading-none">Only</span>
              <span className="text-xs uppercase tracking-widest mt-1">For Ladies</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y border-border bg-card">
        <div className="container-x grid md:grid-cols-4 gap-8 py-10">
          {[
            { i: Leaf, t: "Eco-Conscious", d: "Beauty with a lower impact on the planet." },
            { i: Award, t: "Expert Stylists", d: "Trained specialists across every service." },
            { i: Users, t: "Ladies Only", d: "A safe, private and welcoming space." },
            { i: Sparkles, t: "Premium Products", d: "Trusted, quality brands you can rely on." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <span className="shrink-0 grid place-items-center size-12 rounded-full bg-blush text-primary"><Icon className="size-5" /></span>
              <div>
                <div className="font-display text-xl">{t}</div>
                <div className="text-sm text-muted-foreground mt-1">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl">Our <span className="script text-primary text-5xl md:text-6xl lg:text-7xl">Services</span></h2>
            <p className="mt-5 text-muted-foreground">From everyday styling to complete bridal transformations — a curated menu, delivered with care.</p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, items }) => (
              <article key={title} className="group relative rounded-2xl border border-border bg-card p-7 hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="mb-5 grid place-items-center size-14 rounded-xl text-primary-foreground" style={{ background: "var(--gradient-rose)" }}>
                  <Icon className="size-6" />
                </div>
                <h3 className="text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{items}</p>
                <div className="mt-5 flex items-center gap-1.5 text-primary text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Book Now <ChevronRight className="size-4" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "var(--gradient-blush)" }}>
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={interior} alt="Salon interior" className="w-full h-full object-cover" loading="lazy" width={1600} height={1000} />
            </div>
            <div className="hidden md:block absolute -bottom-8 -right-8 w-56 rounded-2xl overflow-hidden shadow-xl border-4 border-background">
              <img src={hair} alt="" className="w-full h-full object-cover" loading="lazy" width={1200} height={1200} />
            </div>
          </div>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl">Beauty with a <span className="script text-primary">conscience</span></h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              At <strong className="text-foreground">1st Lady Hair &amp; Beauty Salon</strong> we created a space that offers the highest quality hair services in
              a setting that is healthier for our guests, our staff and the environment. Committed to healthy hair care with low impact — come see what you
              and your hair can do for the Earth.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A full-service beauty salon dedicated to consistently providing high customer satisfaction — through excellent service, quality products and a
              welcoming atmosphere at a fair price. We maintain a friendly, creative work environment that respects diversity, ideas and hard work.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { t: "Signature", v: "Bridal Make Over" },
                { t: "Speciality", v: "Hair Colour & SPA" },
                { t: "Environment", v: "Ladies Only" },
                { t: "Timing", v: "9 AM – 8 PM Daily" },
              ].map((x) => (
                <div key={x.t} className="border-l-2 border-accent pl-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{x.t}</div>
                  <div className="font-display text-xl mt-1">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">Our work</span>
              <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl"><span className="script text-primary">Gallery</span> of Looks</h2>
            </div>
            <p className="text-muted-foreground max-w-md">A glimpse into transformations we've crafted — bridal, editorial, everyday elegance.</p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 || i === 5 ? "lg:row-span-2 lg:aspect-[3/5]" : "aspect-square"}`}>
                <img src={src} alt={`Salon work ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--gradient-overlay)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28 relative" style={{ background: "linear-gradient(180deg, oklch(0.22 0.03 20), oklch(0.28 0.05 15))" }}>
        <div className="container-x text-background">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow" style={{ color: "oklch(0.85 0.09 45)" }}>Kind words</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl text-background">What our <span className="script" style={{color:"oklch(0.85 0.09 45)"}}>guests</span> say</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl p-8 border border-background/10 bg-background/5 backdrop-blur">
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                </div>
                <blockquote className="text-lg leading-relaxed font-display italic text-background/90">"{t.text}"</blockquote>
                <figcaption className="mt-6 pt-6 border-t border-background/15 flex items-center gap-3">
                  <span className="size-10 rounded-full grid place-items-center" style={{background:"var(--gradient-rose)"}}>{t.name[0]}</span>
                  <span>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs uppercase tracking-widest text-background/60">Verified Guest</div>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Beauty Journal</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl">Latest from the <span className="script text-primary">chair</span></h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {blog.map((b) => (
              <article key={b.title} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-widest">
                  <span className="text-primary">{b.tag}</span>
                  <span className="h-px w-8 bg-border" />
                  <span className="text-muted-foreground">3 min read</span>
                </div>
                <h3 className="mt-3 text-2xl group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{b.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK / CONTACT */}
      <section id="book" className="relative py-20 lg:py-28" style={{ background: "var(--gradient-blush)" }}>
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow">Reserve your seat</span>
            <h2 id="contact" className="mt-5 text-4xl md:text-5xl lg:text-6xl">Fix an <span className="script text-primary">appointment</span></h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              Tell us what you'd love and when — we'll confirm on WhatsApp or a quick call. Walk-ins welcome, but a booking guarantees your seat.
            </p>
            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <span className="grid place-items-center size-11 rounded-full bg-primary text-primary-foreground"><MapPin className="size-4" /></span>
                <div>
                  <div className="font-display text-lg">Visit us</div>
                  <div className="text-sm text-muted-foreground">Near Gagi Tailor, Old Post Office Street,<br/>Bagha Purana, District Moga 142038 (PB)</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid place-items-center size-11 rounded-full bg-primary text-primary-foreground"><Phone className="size-4" /></span>
                <div>
                  <div className="font-display text-lg">Call / WhatsApp</div>
                  <a href="tel:+919501504300" className="text-sm text-muted-foreground hover:text-primary">+91 95015 04300</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid place-items-center size-11 rounded-full bg-primary text-primary-foreground"><Clock className="size-4" /></span>
                <div>
                  <div className="font-display text-lg">Open hours</div>
                  <div className="text-sm text-muted-foreground">Monday – Sunday · 9:00 AM – 8:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! We'll be in touch shortly."); }}
                className="bg-card rounded-2xl p-8 md:p-10 shadow-[var(--shadow-soft)] border border-border">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Your Name</span>
                <input required className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" placeholder="Priya Kaur" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
                <input required type="tel" className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" placeholder="+91 ..." />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Service</span>
                <select className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors">
                  {services.map(s => <option key={s.title}>{s.title}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Preferred Date</span>
                <input type="date" className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Notes</span>
                <textarea rows={3} className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" placeholder="Anything we should know..." />
              </label>
            </div>
            <button type="submit" className="btn-primary w-full mt-8">Request Booking <ChevronRight className="size-4" /></button>
            <p className="text-xs text-muted-foreground text-center mt-4">We'll confirm your appointment within 2 hours during working hours.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background/80 pt-16 pb-8">
        <div className="container-x grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logo} alt="1st Lady" className="h-14 w-auto brightness-0 invert opacity-90" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A full-service ladies' beauty parlour committed to healthy, high-quality hair & beauty care — with a lower impact on the environment.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Mail].map((I, i) => (
                <a key={i} href="#" className="grid place-items-center size-10 rounded-full border border-background/20 hover:bg-primary hover:border-primary transition-colors">
                  <I className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-background font-display text-lg mb-4">Explore</div>
            <ul className="space-y-2 text-sm">
              {nav.map(n => <li key={n.href}><a href={n.href} className="hover:text-background">{n.label}</a></li>)}
              <li><a href="#book" className="hover:text-background">Book Appointment</a></li>
            </ul>
          </div>
          <div>
            <div className="text-background font-display text-lg mb-4">Visit</div>
            <p className="text-sm leading-relaxed">Near Gagi Tailor, Old Post Office Street, Bagha Purana, District Moga 142038 (PB)</p>
            <p className="text-sm mt-3">+91 95015 04300</p>
            <p className="text-sm">Mon – Sun · 9:00 AM – 8:00 PM</p>
          </div>
        </div>
        <div className="container-x mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/60">
          <div>© {new Date().getFullYear()} 1st Lady Hair &amp; Beauty Salon. All rights reserved.</div>
          <div className="script text-lg text-background/80">Look fabulous, feel great.</div>
        </div>
      </footer>
    </div>
  );
}
