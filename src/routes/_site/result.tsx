import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, GraduationCap, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { searchResult } from "@/lib/rpc";

export const Route = createFileRoute("/_site/result")({ component: ResultPage });

type Found = { found: true; result: Record<string, any> } | { found: false };

function ResultPage() {
  const [state, setState] = useState<"idle" | "searching" | "done" | "error">("idle");
  const [data, setData] = useState<Found | null>(null);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("searching");
    setError("");
    try {
      const res = await searchResult({
        data: { enroll: String(fd.get("enroll") ?? ""), dob: String(fd.get("dob") ?? "") },
      });
      setData(res as Found);
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <PageHero eyebrow="1st Lady Beauty Academy" title="Student" script="Result" crumbs={[{ label: "Result" }]}
        subtitle="Enter your enrollment or certificate number to view your course result online." />

      <section className="py-16 lg:py-20">
        <div className="container-x max-w-2xl">
          <form onSubmit={onSubmit} className="bg-card rounded-2xl p-8 shadow-[var(--shadow-soft)] border border-border">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Enrollment / Certificate No.</span>
              <input name="enroll" required placeholder="Enter your enrollment / certificate number"
                className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" />
            </label>
            <label className="block mt-5">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Date of Birth (optional, DD/MM/YYYY)</span>
              <input name="dob" placeholder="DD/MM/YYYY"
                className="mt-2 w-full bg-transparent border-b border-border py-2.5 focus:outline-none focus:border-primary transition-colors" />
            </label>
            <button type="submit" disabled={state === "searching"} className="btn-primary w-full mt-7 disabled:opacity-60">
              <Search className="size-4" /> {state === "searching" ? "Searching..." : "View Result"}
            </button>
          </form>

          {state === "error" && <p className="mt-4 text-primary text-sm">{error}</p>}

          {state === "done" && data && !data.found && (
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 flex items-start gap-3">
              <AlertCircle className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-display text-lg">No result found</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Please check your enrollment / certificate number (and date of birth) and try again, or contact the academy.
                </p>
              </div>
            </div>
          )}

          {state === "done" && data && data.found && <ResultCard r={data.result} />}
        </div>
      </section>
    </>
  );
}

function ResultCard({ r }: { r: Record<string, any> }) {
  const rows: [string, string][] = [
    ["Enrollment No.", r.enroll],
    ["Father's Name", r.fname],
    ["Mother's Name", r.mname],
    ["Date of Birth", r.dob],
    ["Course", r.coursename],
    ["Duration", r.duration],
    ["Start Date", r.sdate],
    ["End Date", r.edate],
    ["Grade / Marks", r.marks],
    ["Certificate No.", r.certificate],
  ];
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)]">
      <div className="p-6 text-primary-foreground flex items-center gap-4" style={{ background: "var(--gradient-rose)" }}>
        {r.photo || r.filename ? (
          <img
            src={r.photo ? r.photo : `/result-photos/${r.filename}`}
            alt={r.name}
            className="size-20 rounded-xl object-cover border-2 border-primary-foreground/40 bg-white/10 shrink-0"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <GraduationCap className="size-8" />
        )}
        <div>
          <div className="text-xs uppercase tracking-widest opacity-90">Result</div>
          <div className="text-2xl font-display">{r.name}</div>
        </div>
      </div>
      <dl className="divide-y divide-border">
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 px-6 py-3">
            <dt className="text-sm text-muted-foreground">{k}</dt>
            <dd className="text-sm font-medium text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
