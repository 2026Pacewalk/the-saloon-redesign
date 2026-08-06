import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import { submitContact } from "@/lib/rpc";

type Kind = "contact" | "franchise" | "hiring";

export function ContactForm({ kind = "contact", messageLabel = "Message" }: { kind?: Kind; messageLabel?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      await submitContact({
        data: {
          kind,
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? ""),
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
        <h3 className="mt-5 text-2xl">Message sent!</h3>
        <p className="mt-3 text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card rounded-2xl p-8 md:p-10 shadow-[var(--shadow-soft)] border border-border">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your Name" name="name" required />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Email" name="email" type="email" />
        <Field label="Subject" name="subject" />
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{messageLabel}</span>
          <textarea name="message" rows={4} required className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" />
        </label>
      </div>
      {state === "error" && <p className="text-sm text-primary mt-4">{error}</p>}
      <button type="submit" disabled={state === "sending"} className="btn-primary w-full mt-8 disabled:opacity-60">
        {state === "sending" ? "Sending..." : <>Send Message <ChevronRight className="size-4" /></>}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input name={name} type={type} required={required}
        className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" />
    </label>
  );
}
