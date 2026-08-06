import type { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-x max-w-3xl">
        <div className="space-y-5 text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:mt-10 [&_h2]:mb-1 [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:mt-6 [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline">
          {children}
        </div>
      </div>
    </section>
  );
}
