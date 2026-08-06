import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import { submitAppointment } from "@/lib/rpc";
import { SERVICES } from "@/lib/site-data";

export function AppointmentForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      await submitAppointment({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          service: String(fd.get("service") ?? ""),
          preferred_date: String(fd.get("preferred_date") ?? ""),
          notes: String(fd.get("notes") ?? ""),
        },
      });
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "done") {
    return (
      <div className="bg-card rounded-2xl p-10 shadow-[var(--shadow-soft)] border border-border text-center">
        <span className="mx-auto grid place-items-center size-16 rounded-full bg-blush text-primary"><Check className="size-8" /></span>
        <h3 className="mt-5 text-2xl">Booking requested!</h3>
        <p className="mt-3 text-muted-foreground">Thank you — we'll confirm your appointment within 2 hours during working hours, on WhatsApp or a quick call.</p>
        <button onClick={() => setState("idle")} className="btn-ghost mt-6">Book another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card rounded-2xl p-8 md:p-10 shadow-[var(--shadow-soft)] border border-border">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your Name" name="name" placeholder="Priya Kaur" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+91 ..." required />
        <Field label="Email (optional)" name="email" type="email" placeholder="you@email.com" />
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Service</span>
          <select name="service" className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors">
            {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          </select>
        </label>
        <Field label="Preferred Date" name="preferred_date" type="date" />
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Notes</span>
          <textarea name="notes" rows={3} className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" placeholder="Anything we should know..." />
        </label>
      </div>
      {state === "error" && <p className="text-sm text-rose mt-4 text-primary">{error}</p>}
      <button type="submit" disabled={state === "sending"} className="btn-primary w-full mt-8 disabled:opacity-60">
        {state === "sending" ? "Sending..." : <>Request Booking <ChevronRight className="size-4" /></>}
      </button>
      <p className="text-xs text-muted-foreground text-center mt-4">We'll confirm your appointment within 2 hours during working hours.</p>
    </form>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" />
    </label>
  );
}
