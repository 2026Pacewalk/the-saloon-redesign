import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock, Phone, Menu, X, ChevronDown, MessageCircle, Calendar, Sparkles,
  Home, Info, GraduationCap, Image as ImageIcon, Award, ShoppingBag, LayoutGrid, MapPin, Facebook, Mail,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { NAV, CONTACT, SOCIAL } from "@/lib/site-data";

// Icon per top-level nav label for the mobile menu
const NAV_ICONS: Record<string, typeof Home> = {
  Home, About: Info, Services: Sparkles, Courses: GraduationCap,
  Gallery: ImageIcon, Result: Award, Shop: ShoppingBag, More: LayoutGrid, Contact: Phone,
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="hidden md:block text-background text-xs" style={{ background: "var(--gradient-rose)" }}>
        <div className="container-x flex items-center justify-between py-2">
          <span className="flex items-center gap-2 font-medium tracking-wide">
            <Sparkles className="size-3.5" /> Ladies-Only Salon &amp; Beauty Academy · Bagha Purana
          </span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {CONTACT.hours}</span>
            <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 hover:underline"><Phone className="size-3.5" /> {CONTACT.phone}</a>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><MessageCircle className="size-3.5" /> WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`border-b transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-border shadow-[0_8px_30px_-12px_oklch(0.5_0.15_15_/_0.25)]" : "bg-background/70 backdrop-blur border-transparent"}`}>
        <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt={CONTACT.name} className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-12 md:h-14"}`} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <div key={n.label} className="relative group">
                <Link
                  to={n.to}
                  className="relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-foreground/75 hover:text-primary transition-colors"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                  {n.children && <ChevronDown className="size-3.5 opacity-60 transition-transform group-hover:rotate-180" />}
                  <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>

                {n.children && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="min-w-60 rounded-2xl border border-border bg-card/95 backdrop-blur shadow-[var(--shadow-soft)] p-2">
                      {n.children.map((c) => (
                        <Link
                          key={c.to + c.label}
                          to={c.to}
                          className="group/item flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-foreground/80 hover:bg-blush hover:text-primary transition-colors"
                        >
                          {c.label}
                          <ChevronDown className="size-4 -rotate-90 opacity-0 -translate-x-1 group-hover/item:opacity-60 group-hover/item:translate-x-0 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"
              className="hidden sm:grid lg:hidden xl:grid place-items-center size-10 rounded-full border border-border text-primary hover:bg-blush transition-colors">
              <MessageCircle className="size-4" />
            </a>
            <Link to="/appointment" className="hidden md:inline-flex btn-primary !px-5 !py-2.5 !text-[13px] hover:-translate-y-0.5 transition-transform">
              <Calendar className="size-4" /> Book Now
            </Link>
            <button onClick={() => setOpen(true)} className="lg:hidden grid place-items-center size-10 rounded-full border border-border text-foreground" aria-label="Open menu">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
          {/* Drawer header — gradient */}
          <div className="relative overflow-hidden px-5 pt-5 pb-6 text-background" style={{ background: "var(--gradient-rose)" }}>
            <div className="absolute -right-8 -top-10 size-40 rounded-full bg-background/10 blur-2xl" />
            <div className="relative flex items-center justify-between">
              <img src={logo} alt={CONTACT.name} className="h-11 w-auto brightness-0 invert" />
              <button onClick={() => setOpen(false)} className="grid place-items-center size-10 rounded-full bg-background/15 hover:bg-background/25 transition-colors" aria-label="Close menu">
                <X className="size-5" />
              </button>
            </div>
            <p className="relative mt-3 text-sm text-background/90 flex items-center gap-2">
              <Sparkles className="size-3.5" /> Ladies-Only Salon &amp; Beauty Academy
            </p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2 px-4 py-4 border-b border-border">
            {[
              { Icon: Phone, label: "Call", href: CONTACT.phoneHref },
              { Icon: MessageCircle, label: "WhatsApp", href: SOCIAL.whatsapp, external: true },
              { Icon: MapPin, label: "Map", href: CONTACT.mapLink, external: true },
            ].map(({ Icon, label, href, external }) => {
              const cls = "flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card py-3 text-[11px] font-medium text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors";
              const inner = (<><span className="grid place-items-center size-9 rounded-full bg-blush text-primary"><Icon className="size-4" /></span>{label}</>);
              return <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={() => setOpen(false)} className={cls}>{inner}</a>;
            })}
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-3">
            {NAV.map((n) => {
              const Icon = NAV_ICONS[n.label] ?? Home;
              const isOpen = openSub === n.label;
              return (
                <div key={n.label} className="mb-1">
                  {n.children ? (
                    <>
                      <button
                        onClick={() => setOpenSub(isOpen ? null : n.label)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isOpen ? "bg-blush text-primary" : "hover:bg-muted"}`}
                      >
                        <span className={`grid place-items-center size-9 rounded-lg ${isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-primary"}`}><Icon className="size-4" /></span>
                        <span className="flex-1 text-left uppercase tracking-wide">{n.label}</span>
                        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180 text-primary" : "opacity-50"}`} />
                      </button>
                      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <div className="ml-6 my-1 pl-4 border-l border-border flex flex-col">
                            {n.children.map((c) => (
                              <Link key={c.to + c.label} to={c.to} onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-blush transition-colors">
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={n.to} onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted transition-colors"
                      activeProps={{ className: "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium bg-blush text-primary" }}
                      activeOptions={{ exact: n.to === "/" }}
                    >
                      <span className="grid place-items-center size-9 rounded-lg bg-muted text-primary"><Icon className="size-4" /></span>
                      <span className="uppercase tracking-wide">{n.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Drawer footer */}
          <div className="px-5 py-4 border-t border-border space-y-4">
            <Link to="/appointment" onClick={() => setOpen(false)} className="btn-primary w-full">
              <Calendar className="size-4" /> Book Appointment
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Clock className="size-3.5" /> {CONTACT.hours}</span>
              <div className="flex gap-2">
                {[{ Icon: Facebook, href: SOCIAL.facebook }, { Icon: MessageCircle, href: SOCIAL.whatsapp }, { Icon: Mail, href: SOCIAL.email }].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="grid place-items-center size-8 rounded-full border border-border text-primary hover:bg-blush transition-colors">
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
