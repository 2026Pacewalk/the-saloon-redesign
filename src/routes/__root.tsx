import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logo from "@/assets/logo.png";
import { Home as HomeIcon, Scissors, Phone } from "lucide-react";

function NotFoundComponent() {
  const quick = [
    { label: "Services", to: "/services" },
    { label: "Courses", to: "/courses" },
    { label: "Gallery", to: "/gallery" },
    { label: "Book Appointment", to: "/appointment" },
    { label: "Student Result", to: "/result" },
  ];
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16" style={{ background: "var(--gradient-blush)" }}>
      {/* soft decorative blooms */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card/80 backdrop-blur px-8 py-12 text-center shadow-[var(--shadow-soft)]">
        <Link to="/" className="inline-block">
          <img src={logo} alt="1st Lady Hair & Beauty Salon" className="mx-auto h-14 w-auto" />
        </Link>

        <div className="relative mt-8">
          <div className="font-display leading-none text-[7rem] md:text-[9rem] text-primary/15 select-none">404</div>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="grid place-items-center size-16 rounded-full text-primary-foreground shadow-lg" style={{ background: "var(--gradient-rose)" }}>
              <Scissors className="size-7" />
            </span>
          </span>
        </div>

        <h1 className="mt-2 text-3xl md:text-4xl">This look is <span className="script text-primary">missing</span></h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The page you're after doesn't exist or has moved. Let's get you back to something beautiful.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary"><HomeIcon className="size-4" /> Go Home</Link>
          <Link to="/contacts" className="btn-ghost"><Phone className="size-4" /> Contact Us</Link>
        </div>

        <div className="mt-9 border-t border-border pt-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Popular pages</div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {quick.map((q) => (
              <Link key={q.to} to={q.to} className="rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors">
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "1st Lady Hair & Beauty Salon — Look Fabulous, Feel Great" },
      { name: "description", content: "Premium ladies-only hair, beauty, bridal & spa services in Bagha Purana, Moga. Book an appointment at 1st Lady Hair & Beauty Salon." },
      { property: "og:title", content: "1st Lady Hair & Beauty Salon" },
      { property: "og:description", content: "Premium ladies-only hair, beauty, bridal & spa services. Look fabulous, feel great." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Karla:wght@300;400;500;600&display=swap" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
