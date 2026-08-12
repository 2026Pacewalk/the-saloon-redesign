import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Scissors, Sparkles, Flower2, Palette, HandHeart, Crown, Droplet, Wand2,
  MapPin, Phone, Clock, Star, ChevronRight, Calendar, Award, Leaf, Users,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Footer } from "@/components/site/Footer";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { CONTACT, REVIEWS, GOOGLE } from "@/lib/site-data";

import hero from "@/assets/hero.jpg";
import bridal from "@/assets/bridal.jpg";
import facial from "@/assets/facial.jpg";
import nails from "@/assets/nails.jpg";
import hair from "@/assets/hair.jpg";
import interior from "@/assets/interior.jpg";
import galleryHair from "@/assets/gallery-hair.jpg";
import galleryFacial from "@/assets/gallery-facial.jpg";
import svcHairStyling from "@/assets/svc-hair-styling.jpg";
import svcHairColor from "@/assets/svc-hair-color.jpg";
import svcThreading from "@/assets/svc-threading.jpg";
import svcBeautyCare from "@/assets/svc-beauty-care.jpg";
import svcFacial from "@/assets/svc-facial.jpg";
import svcBridal from "@/assets/svc-bridal.jpg";
import svcWaxing from "@/assets/svc-waxing.jpg";
import svcHandsFeet from "@/assets/svc-hands-feet.jpg";

export const Route = createFileRoute("/")({ component: Home });

const services = [
  { icon: Scissors, img: svcHairStyling, title: "Hair Styling", items: "Cuts, Trims, Blow Dry, Hair SPA, Tong, Head Massage, Children Cuts" },
  { icon: Palette, img: svcHairColor, title: "Hair Care & Color", items: "Global Color, Trendy Shades, Streaking, Root Touch-up, Keratin, Rebonding" },
  { icon: Flower2, img: svcThreading, title: "Threading", items: "Eye Brows, Upper Lip, Chin, Full Face" },
  { icon: Sparkles, img: svcBeautyCare, title: "Beauty Care", items: "Clean-up, Fruit / Aroma / Herbal / Golden / Pearl Facials, Skin Lightening" },
  { icon: Droplet, img: svcFacial, title: "Facial Treatments", items: "Face & Neck, Legs, Arms and Full Body luxury facials" },
  { icon: Crown, img: svcBridal, title: "Bridal Make Over", items: "Bridal Make-up, Reception Look, Bridal Hair-do, Saree Drape, Mehendi" },
  { icon: Wand2, img: svcWaxing, title: "Waxing", items: "Under Arms, Full Arms, Full Legs, Body & Face Waxing" },
  { icon: HandHeart, img: svcHandsFeet, title: "Hands & Feet", items: "Pedicure, Manicure, Aroma, Paraffin Wax, Spa, French Manicure" },
];

const gallery = ["/gallery/work-1.jpg", "/gallery/work-2.jpg", "/gallery/work-4.jpg", "/gallery/work-3.jpg", "/gallery/salon-1.jpg", galleryHair, galleryFacial, hair, "/gallery/salon-2.jpg", facial, nails, bridal, interior];


function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <HeroSlider />

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
            {services.map(({ icon: Icon, img, title, items }) => (
              <Link to="/services" key={title} className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={img} alt={title} loading="lazy" width={800} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, oklch(0.2 0.05 15 / 0.45) 100%)" }} />
                  <span className="absolute bottom-3 left-3 grid place-items-center size-11 rounded-xl text-primary-foreground shadow-lg" style={{ background: "var(--gradient-rose)" }}>
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{items}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-primary text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ChevronRight className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-ghost">View all services <ChevronRight className="size-4" /></Link>
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
              At <strong className="text-foreground">{CONTACT.name}</strong> we created a space that offers the highest quality hair services in
              a setting that is healthier for our guests, our staff and the environment. Committed to healthy hair care with low impact — come see what you
              and your hair can do for the Earth.
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
            <Link to="/overview" className="btn-ghost mt-8">More about us <ChevronRight className="size-4" /></Link>
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
            <Link to="/gallery" className="btn-ghost self-start">View full gallery <ChevronRight className="size-4" /></Link>
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

      {/* REVIEWS */}
      <section className="py-16 lg:py-20 relative" style={{ background: "linear-gradient(180deg, oklch(0.22 0.03 20), oklch(0.28 0.05 15))" }}>
        <div className="container-x text-background">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="eyebrow" style={{ color: "oklch(0.85 0.09 45)" }}>Kind words</span>
              <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl text-background">Loved by women across <span className="script" style={{ color: "oklch(0.85 0.09 45)" }}>Bagha Purana</span></h2>
              <p className="mt-3 text-background/70 max-w-xl">Real reviews from real guests — here's why they keep coming back.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-3 rounded-full border border-background/15 bg-background/5 px-4 sm:px-5 py-2.5">
                <span className="text-3xl font-display" style={{ color: "oklch(0.85 0.09 45)" }}>{GOOGLE.rating.toFixed(1)}</span>
                <div>
                  <div className="flex gap-0.5 text-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`size-3.5 ${i < Math.round(GOOGLE.rating) ? "fill-current" : "opacity-30"}`} />)}
                  </div>
                  <div className="text-[11px] text-background/60">{GOOGLE.count} Google reviews</div>
                </div>
              </div>
              <a href={GOOGLE.writeReview} target="_blank" rel="noreferrer" className="btn-primary shrink-0 whitespace-nowrap">
                <Star className="size-4" /> Write a review
              </a>
            </div>
          </div>

          {/* Scrolling review cards */}
          <div className="marquee-mask mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="marquee-track flex gap-4 w-max">
              {[...REVIEWS, ...REVIEWS].map((t, i) => (
                <figure key={i} className="w-[270px] sm:w-[300px] shrink-0 rounded-xl p-5 border border-background/10 bg-background/5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-gold">
                      {[...Array(5)].map((_, j) => <Star key={j} className="size-3.5 fill-current" />)}
                    </div>
                    {t.tag && <span className="text-[10px] uppercase tracking-widest text-background/45">{t.tag}</span>}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-background/85 line-clamp-4">{t.text}</blockquote>
                  <figcaption className="mt-4 pt-3 border-t border-background/10 flex items-center gap-2.5">
                    <span className="size-8 rounded-full grid place-items-center text-xs text-primary-foreground" style={{ background: "var(--gradient-rose)" }}>{t.name[0]}</span>
                    <span className="leading-tight">
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-[11px] text-background/55">Google review</div>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
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
                  <div className="text-sm text-muted-foreground">{CONTACT.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid place-items-center size-11 rounded-full bg-primary text-primary-foreground"><Phone className="size-4" /></span>
                <div>
                  <div className="font-display text-lg">Call / WhatsApp</div>
                  <a href={CONTACT.phoneHref} className="text-sm text-muted-foreground hover:text-primary">{CONTACT.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid place-items-center size-11 rounded-full bg-primary text-primary-foreground"><Clock className="size-4" /></span>
                <div>
                  <div className="font-display text-lg">Open hours</div>
                  <div className="text-sm text-muted-foreground">{CONTACT.hours}</div>
                </div>
              </div>
            </div>
          </div>
          <AppointmentForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
