import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, ChevronRight, ChevronLeft, ChevronRight as ChevRight, Star } from "lucide-react";
import { CONTACT, GOOGLE } from "@/lib/site-data";

import hero from "@/assets/hero.jpg";
import svcBridal from "@/assets/svc-bridal.jpg";
import svcMakeupLesson from "@/assets/svc-makeup-lesson.jpg";

type Slide = {
  img: string;
  label: string;
  lead: string;
  script: string;
  tail: string;
  copy: string;
};

const slides: Slide[] = [
  {
    img: hero,
    label: "Hair Styling",
    lead: "Look",
    script: "fabulous",
    tail: "Feel great.",
    copy: `At ${CONTACT.name} we believe in beauty with a conscience — quality hair, skin and bridal care in an inviting, ladies-only setting.`,
  },
  {
    img: svcBridal,
    label: "Bridal Make Over",
    lead: "Your",
    script: "big day",
    tail: "Perfected.",
    copy: "Bridal make-up, hair-do, saree draping and mehndi — a complete look crafted for the moment everyone remembers.",
  },
  {
    img: svcMakeupLesson,
    label: "Beauty Academy",
    lead: "Learn the",
    script: "artistry",
    tail: "Build a career.",
    copy: "Certificate courses in make-up, hair designing, nails and skin — taught hands-on by working professionals.",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const slide = slides[i]!;

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);

  return (
    <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-blush)" }}>
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 size-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 py-16 lg:py-24 items-center relative">
        {/* Copy */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="eyebrow">Est. Ladies-Only Salon</span>
          </div>

          <div key={i} className="animate-fade-in">
            <h1 className="mt-7 text-5xl md:text-6xl lg:text-7xl leading-[1.02] font-light">
              {slide.lead}{" "}
              <span className="script text-primary text-6xl md:text-7xl lg:text-8xl align-baseline">{slide.script}</span>,
              <br />
              <span className="italic font-semibold">{slide.tail}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">{slide.copy}</p>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/appointment" className="btn-primary"><Calendar className="size-4" /> Fix an Appointment</Link>
            <Link to="/services" className="btn-ghost">Our Services <ChevronRight className="size-4" /></Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-md border-t border-border pt-9">
            {[{ n: "8+", l: "Years of Craft" }, { n: "2K+", l: "Happy Clients" }, { n: "30+", l: "Signature Services" }].map((s) => (
              <div key={s.l}>
                <div className="text-3xl md:text-4xl text-gold font-display font-semibold">{s.n}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arched slider */}
        <div className="relative lg:mr-10">
          <div className="pointer-events-none absolute -inset-5 rounded-t-full rounded-b-[6rem] border border-gold/25" />
          <div className="relative rounded-t-full rounded-b-[6rem] overflow-hidden shadow-2xl bg-card aspect-4/5">
            {slides.map((s, idx) => (
              <img
                key={s.label}
                src={s.img}
                alt={s.label}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 size-full object-cover transition-all duration-[1400ms] ease-out ${idx === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
              />
            ))}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, oklch(0.2 0.05 15 / 0.75) 100%)" }} />
            <div className="absolute bottom-0 inset-x-0 p-10 lg:p-12">
              <div className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
                0{i + 1} — 0{slides.length}
              </div>
              <h2 className="mt-2 font-display italic text-3xl text-primary-foreground">{slide.label}</h2>
            </div>
          </div>

          {/* Ladies only badge */}
          <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full size-28 md:size-32 flex flex-col items-center justify-center text-center shadow-xl border-8 border-background z-20">
            <span className="script text-3xl leading-none">Only</span>
            <span className="text-[10px] uppercase tracking-widest mt-1">For Ladies</span>
          </div>

          {/* Rating card */}
          <div className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur rounded-3xl px-6 py-5 shadow-2xl border border-border z-20 animate-float">
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, k) => <Star key={k} className="size-4 fill-current" />)}
            </div>
            <div className="text-sm mt-2 font-medium">Rated {GOOGLE.rating.toFixed(1)} / 5</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{GOOGLE.count} Google reviews</div>
          </div>

          {/* Controls */}
          <div className="absolute -right-5 lg:-right-8 bottom-14 flex flex-col items-center gap-3 z-30">
            <button aria-label="Previous slide" onClick={() => go(-1)} className="size-12 rounded-full bg-background shadow-lg grid place-items-center text-primary hover:scale-110 transition-transform">
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex flex-col gap-2 items-center py-3">
              {slides.map((s, idx) => (
                <button
                  key={s.label}
                  aria-label={`Go to ${s.label}`}
                  onClick={() => setI(idx)}
                  className={`w-1.5 rounded-full transition-all ${idx === i ? "h-6 bg-primary" : "h-1.5 bg-primary/25 hover:bg-primary/50"}`}
                />
              ))}
            </div>
            <button aria-label="Next slide" onClick={() => go(1)} className="size-12 rounded-full bg-background shadow-lg grid place-items-center text-primary hover:scale-110 transition-transform">
              <ChevRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
