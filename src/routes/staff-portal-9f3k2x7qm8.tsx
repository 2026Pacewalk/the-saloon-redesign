import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  LogOut, Loader2, LayoutDashboard, CalendarDays, MessageSquare, GraduationCap,
  Search, Download, Trash2, Plus, Phone, Mail, ExternalLink, Eye, EyeOff, RefreshCw,
  Lock, User, X, Menu, TrendingUp, BookOpen, Image as ImageIcon, Upload, Pencil, Check,
  LayoutGrid, List,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  adminMe, adminLogin, adminLogout,
  listAppointments, listContacts, listCoursesAndResults,
  addResult, updateResult, addCourse, deleteResult, renameCourse, deleteCourse,
} from "@/lib/rpc";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/staff-portal-9f3k2x7qm8")({ component: AdminPage });

type Tab = "overview" | "appointments" | "contacts" | "results" | "courses";
type Row = Record<string, any>;

/* ---------------------------------- utils --------------------------------- */
function exportCsv(filename: string, cols: string[], rows: Row[]) {
  const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [cols.map(esc).join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${rows.length} rows`);
}
function resizeImage(file: File, max: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no ctx"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = String(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
const fmtDate = (v: any) => {
  if (!v) return "—";
  const d = new Date(v);
  return isNaN(+d) ? String(v) : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
const contains = (row: Row, q: string) =>
  !q || Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q.toLowerCase()));
// Uploaded base64 photo, else the imported legacy photo copied to /public/result-photos.
const photoSrc = (r: Row): string => r.photo || (r.filename ? `/result-photos/${r.filename}` : "");

function Avatar({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initial = String(name ?? "?")[0]?.toUpperCase() ?? "?";
  if (src && !failed) {
    return <img src={src} alt={name} onError={() => setFailed(true)} className={`object-cover border border-border shrink-0 ${className}`} />;
  }
  return <span className={`grid place-items-center bg-muted text-muted-foreground font-medium shrink-0 ${className}`}>{initial}</span>;
}

/* ---------------------------------- shell --------------------------------- */
function AdminPage() {
  const [admin, setAdmin] = useState<string | null | undefined>(undefined);
  useEffect(() => { adminMe().then((r) => setAdmin(r.admin)).catch(() => setAdmin(null)); }, []);
  if (admin === undefined) return <div className="min-h-screen grid place-items-center bg-muted/40"><Loader2 className="size-6 animate-spin text-primary" /></div>;
  return (
    <>
      <Toaster richColors position="top-right" />
      {admin ? <Dashboard username={admin} onLogout={() => setAdmin(null)} /> : <Login onDone={setAdmin} />}
    </>
  );
}

/* ---------------------------------- login --------------------------------- */
function Login({ onDone }: { onDone: (u: string) => void }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true); setError("");
    try {
      const r = await adminLogin({ data: { username: String(fd.get("username")), password: String(fd.get("password")) } });
      if (r.ok) { toast.success("Welcome back!"); onDone(String(fd.get("username"))); }
      else setError("Invalid username or password");
    } catch { setError("Login failed. Please try again."); } finally { setBusy(false); }
  }

  return (
    <div className="relative min-h-screen grid place-items-center overflow-hidden px-5" style={{ background: "var(--gradient-blush)" }}>
      <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-primary/20 blur-3xl" />
      <form onSubmit={onSubmit} className="relative w-full max-w-sm bg-card/90 backdrop-blur border border-border rounded-3xl p-8 shadow-[var(--shadow-soft)]">
        <img src={logo} alt="1st Lady" className="mx-auto h-14 w-auto" />
        <h1 className="mt-6 text-2xl font-display text-center">Admin Dashboard</h1>
        <p className="text-center text-sm text-muted-foreground mt-1">Sign in to manage your salon</p>

        <label className="block mt-7">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Username</span>
          <div className="mt-2 flex items-center gap-2 border-b border-border focus-within:border-primary transition-colors">
            <User className="size-4 text-muted-foreground" />
            <input name="username" required autoComplete="username" className="w-full bg-transparent py-2.5 focus:outline-none" />
          </div>
        </label>
        <label className="block mt-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Password</span>
          <div className="mt-2 flex items-center gap-2 border-b border-border focus-within:border-primary transition-colors">
            <Lock className="size-4 text-muted-foreground" />
            <input name="password" type={show ? "text" : "password"} required autoComplete="current-password" className="w-full bg-transparent py-2.5 focus:outline-none" />
            <button type="button" onClick={() => setShow(!show)} className="text-muted-foreground hover:text-foreground" aria-label="Toggle password">
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </label>

        {error && <p className="text-rose text-sm mt-4 bg-rose/10 rounded-lg px-3 py-2">{error}</p>}
        <button disabled={busy} className="btn-primary w-full mt-7 disabled:opacity-60">
          {busy ? <><Loader2 className="size-4 animate-spin" /> Signing in…</> : "Sign In"}
        </button>
      </form>
    </div>
  );
}

/* -------------------------------- dashboard ------------------------------- */
const NAV: { key: Tab; label: string; Icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "appointments", label: "Appointments", Icon: CalendarDays },
  { key: "contacts", label: "Enquiries", Icon: MessageSquare },
  { key: "results", label: "Results", Icon: GraduationCap },
  { key: "courses", label: "Courses", Icon: BookOpen },
];

function Dashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [navOpen, setNavOpen] = useState(false);

  const [appts, setAppts] = useState<Row[]>([]);
  const [contacts, setContacts] = useState<Row[]>([]);
  const [courses, setCourses] = useState<Row[]>([]);
  const [results, setResults] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    try {
      const [a, c, cr] = await Promise.all([listAppointments(), listContacts(), listCoursesAndResults()]);
      setAppts((a?.rows as Row[]) ?? []);
      setContacts((c?.rows as Row[]) ?? []);
      setCourses((cr?.courses as Row[]) ?? []);
      setResults((cr?.results as Row[]) ?? []);
    } finally { setLoading(false); }
  }
  useEffect(() => { loadAll(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const counts = { appointments: appts.length, contacts: contacts.length, results: results.length, courses: courses.length };

  return (
    <div className="min-h-screen bg-muted/30 lg:flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 bg-foreground text-background/80 flex flex-col transition-transform duration-300 ${navOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-background/10">
          <img src={logo} alt="1st Lady" className="h-10 w-auto brightness-0 invert opacity-90" />
          <button onClick={() => setNavOpen(false)} className="lg:hidden text-background/70"><X className="size-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ key, label, Icon }) => {
            const active = tab === key;
            const badge = key !== "overview" ? (counts as any)[key === "contacts" ? "contacts" : key] : null;
            return (
              <button key={key} onClick={() => { setTab(key); setNavOpen(false); }}
                className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "hover:bg-background/10"}`}>
                <Icon className="size-4.5" style={{ width: 18, height: 18 }} />
                <span className="flex-1 text-left">{label}</span>
                {badge != null && <span className={`text-xs rounded-full px-2 py-0.5 ${active ? "bg-background/20" : "bg-background/10"}`}>{badge}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-background/10">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm hover:bg-background/10">
            <ExternalLink className="size-4" /> View website
          </a>
          <button onClick={async () => { await adminLogout(); toast("Signed out"); onLogout(); }}
            className="w-full flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm hover:bg-background/10">
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </aside>

      {navOpen && <div className="fixed inset-0 z-30 bg-foreground/50 lg:hidden" onClick={() => setNavOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-background/85 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <button onClick={() => setNavOpen(true)} className="lg:hidden grid place-items-center size-9 rounded-lg border border-border"><Menu className="size-5" /></button>
              <div>
                <div className="font-display text-lg leading-tight capitalize">{tab === "contacts" ? "Enquiries" : tab}</div>
                <div className="text-xs text-muted-foreground">1st Lady Salon &amp; Academy</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={loadAll} className="grid place-items-center size-9 rounded-lg border border-border hover:bg-muted" title="Refresh">
                <RefreshCw className={`size-4 ${loading ? "animate-spin text-primary" : ""}`} />
              </button>
              <div className="flex items-center gap-2 pl-1">
                <span className="grid place-items-center size-9 rounded-full text-primary-foreground text-sm font-medium" style={{ background: "var(--gradient-rose)" }}>{username[0]?.toUpperCase()}</span>
                <span className="hidden sm:block text-sm font-medium">{username}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 lg:p-8">
          {loading && tab === "overview" ? (
            <div className="grid place-items-center py-20"><Loader2 className="size-6 animate-spin text-primary" /></div>
          ) : (
            <>
              {tab === "overview" && <Overview counts={counts} appts={appts} contacts={contacts} onGo={setTab} />}
              {tab === "appointments" && <Appointments rows={appts} />}
              {tab === "contacts" && <Contacts rows={contacts} />}
              {tab === "results" && <Results courses={courses} results={results} reload={loadAll} />}
              {tab === "courses" && <Courses courses={courses} results={results} reload={loadAll} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* -------------------------------- overview -------------------------------- */
function Overview({ counts, appts, contacts, onGo }: { counts: any; appts: Row[]; contacts: Row[]; onGo: (t: Tab) => void }) {
  const cards = [
    { key: "appointments", label: "Appointments", value: counts.appointments, Icon: CalendarDays, tint: "oklch(0.52 0.16 15)" },
    { key: "contacts", label: "Enquiries", value: counts.contacts, Icon: MessageSquare, tint: "oklch(0.6 0.13 40)" },
    { key: "results", label: "Student Results", value: counts.results, Icon: GraduationCap, tint: "oklch(0.55 0.12 300)" },
    { key: "courses", label: "Courses", value: counts.courses, Icon: TrendingUp, tint: "oklch(0.5 0.12 160)" },
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ key, label, value, Icon, tint }) => (
          <button key={key} onClick={() => key !== "courses" && onGo(key as Tab)}
            className="text-left rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="grid place-items-center size-11 rounded-xl text-white" style={{ background: tint }}><Icon className="size-5" /></span>
            </div>
            <div className="mt-4 text-3xl font-display">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Latest appointments" onView={() => onGo("appointments")}>
          {appts.slice(0, 5).map((r) => (
            <div key={r.id} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.service || "General"} · {r.phone}</div>
              </div>
              <div className="text-xs text-muted-foreground">{fmtDate(r.preferred_date || r.created_at)}</div>
            </div>
          ))}
          {appts.length === 0 && <Empty />}
        </Panel>
        <Panel title="Latest enquiries" onView={() => onGo("contacts")}>
          {contacts.slice(0, 5).map((r) => (
            <div key={r.id} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{r.subject || r.message}</div>
              </div>
              <KindBadge kind={r.kind} />
            </div>
          ))}
          {contacts.length === 0 && <Empty />}
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, onView, children }: { title: string; onView?: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-lg">{title}</h3>
        {onView && <button onClick={onView} className="text-xs uppercase tracking-widest text-primary hover:underline">View all</button>}
      </div>
      {children}
    </div>
  );
}
const Empty = () => <p className="text-sm text-muted-foreground py-6 text-center">No records yet.</p>;

function KindBadge({ kind }: { kind: string }) {
  const map: Record<string, string> = {
    contact: "bg-blue-500/10 text-blue-600",
    franchise: "bg-amber-500/10 text-amber-600",
    hiring: "bg-emerald-500/10 text-emerald-600",
    vacancy: "bg-emerald-500/10 text-emerald-600",
  };
  return <span className={`text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 ${map[kind] ?? "bg-muted text-muted-foreground"}`}>{kind || "contact"}</span>;
}

/* ------------------------------ search toolbar ---------------------------- */
function Toolbar({ q, setQ, count, onExport, placeholder }: { q: string; setQ: (v: string) => void; count: number; onExport: () => void; placeholder: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder}
          className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{count} record{count === 1 ? "" : "s"}</span>
        <button onClick={onExport} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm hover:border-primary/40 hover:text-primary transition-colors">
          <Download className="size-4" /> Export CSV
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ appointments ------------------------------ */
function Appointments({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => rows.filter((r) => contains(r, q)), [rows, q]);
  return (
    <div>
      <Toolbar q={q} setQ={setQ} count={filtered.length} placeholder="Search by name, phone, service…"
        onExport={() => exportCsv("appointments.csv", ["id", "name", "phone", "email", "service", "preferred_date", "notes", "created_at"], filtered)} />
      <div className="grid gap-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-4 sm:flex sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <span className="grid place-items-center size-10 rounded-full bg-blush text-primary shrink-0 font-medium">{String(r.name)[0]?.toUpperCase()}</span>
              <div className="min-w-0">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.service || "General enquiry"}</div>
                {r.notes && <div className="text-xs text-muted-foreground mt-1 line-clamp-2">“{r.notes}”</div>}
              </div>
            </div>
            <div className="mt-3 sm:mt-0 flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="text-sm font-medium">{fmtDate(r.preferred_date)}</div>
                <div className="text-xs text-muted-foreground">Booked {fmtDate(r.created_at)}</div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${r.phone}`} className="grid place-items-center size-9 rounded-full border border-border text-primary hover:bg-blush" title="Call"><Phone className="size-4" /></a>
                <a href={`https://wa.me/${String(r.phone).replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="grid place-items-center size-9 rounded-full border border-border text-primary hover:bg-blush" title="WhatsApp"><MessageSquare className="size-4" /></a>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <Empty />}
      </div>
    </div>
  );
}

/* -------------------------------- contacts -------------------------------- */
function Contacts({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => rows.filter((r) => contains(r, q)), [rows, q]);
  return (
    <div>
      <Toolbar q={q} setQ={setQ} count={filtered.length} placeholder="Search enquiries…"
        onExport={() => exportCsv("enquiries.csv", ["id", "kind", "name", "phone", "email", "subject", "message", "created_at"], filtered)} />
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{r.name}</div>
              <KindBadge kind={r.kind} />
            </div>
            {r.subject && <div className="text-sm font-medium text-foreground/80 mt-1">{r.subject}</div>}
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{r.message}</p>
            <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {r.phone && <a href={`tel:${r.phone}`} className="flex items-center gap-1 hover:text-primary"><Phone className="size-3.5" /> {r.phone}</a>}
              {r.email && <a href={`mailto:${r.email}`} className="flex items-center gap-1 hover:text-primary"><Mail className="size-3.5" /> {r.email}</a>}
              <span className="ml-auto">{fmtDate(r.created_at)}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <Empty />}
      </div>
    </div>
  );
}

/* --------------------------------- results -------------------------------- */
function Results({ courses, results, reload }: { courses: Row[]; results: Row[]; reload: () => void }) {
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [view, setView] = useState<"list" | "grid">("grid");
  const filtered = useMemo(() => results.filter((r) => contains(r, q)), [results, q]);

  async function onDelete(id: number, name: string) {
    if (!confirm(`Delete result for ${name}? This cannot be undone.`)) return;
    await deleteResult({ data: { id } });
    toast.success("Result deleted");
    reload();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by enrollment, name, course…"
            className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{filtered.length} of {results.length}</span>
          <div className="flex items-center rounded-xl border border-border bg-card p-0.5">
            <button onClick={() => setView("list")} title="List view"
              className={`grid place-items-center size-8 rounded-lg transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <List className="size-4" />
            </button>
            <button onClick={() => setView("grid")} title="Grid view"
              className={`grid place-items-center size-8 rounded-lg transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <LayoutGrid className="size-4" />
            </button>
          </div>
          <button onClick={() => exportCsv("results.csv", ["enroll", "name", "fname", "mname", "dob", "coursename", "duration", "sdate", "edate", "marks", "certificate"], filtered)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm hover:border-primary/40 hover:text-primary transition-colors">
            <Download className="size-4" /> Export
          </button>
          <button onClick={() => setShowAdd(true)} className="btn-primary !px-4 !py-2.5 !text-sm"><Plus className="size-4" /> Add Result</button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="flex items-start gap-3">
                <Avatar src={photoSrc(r)} name={r.name} className="size-14 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{r.name}</div>
                  <div className="text-xs font-mono text-muted-foreground">{r.enroll}</div>
                  {r.fname && <div className="text-xs text-muted-foreground truncate">Father: {r.fname}</div>}
                </div>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between gap-2"><span className="text-muted-foreground">Course</span><span className="text-right truncate">{r.coursename || "—"}</span></div>
                <div className="flex justify-between gap-2"><span className="text-muted-foreground">Grade</span><span>{r.marks || "—"}</span></div>
                <div className="flex justify-between gap-2"><span className="text-muted-foreground">Certificate</span><span className="text-xs truncate">{r.certificate || "—"}</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex justify-end gap-1">
                <button onClick={() => setEditing(r)} className="grid place-items-center size-8 rounded-lg text-primary hover:bg-blush" title="Edit"><Pencil className="size-4" /></button>
                <button onClick={() => onDelete(Number(r.id), r.name)} className="grid place-items-center size-8 rounded-lg text-rose hover:bg-rose/10" title="Delete"><Trash2 className="size-4" /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="col-span-full py-10 text-center text-muted-foreground text-sm">No results found.</div>}
        </div>
      ) : (
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left bg-muted/40">
              {["Photo", "Enrollment", "Student", "Course", "Grade", "Certificate", ""].map((c) => (
                <th key={c} className="px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Avatar src={photoSrc(r)} name={r.name} className="size-10 rounded-full" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">{r.enroll}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-medium">{r.name}</div>
                  {r.fname && <div className="text-xs text-muted-foreground">Father: {r.fname}</div>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{r.coursename || "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">{r.marks || "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-xs">{r.certificate || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditing(r)} className="grid place-items-center size-8 rounded-lg text-primary hover:bg-blush" title="Edit">
                      <Pencil className="size-4" />
                    </button>
                    <button onClick={() => onDelete(Number(r.id), r.name)} className="grid place-items-center size-8 rounded-lg text-rose hover:bg-rose/10" title="Delete">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No results found.</td></tr>}
          </tbody>
        </table>
      </div>
      )}

      {showAdd && <ResultModal courses={courses} onClose={() => setShowAdd(false)} onSaved={reload} />}
      {editing && <ResultModal courses={courses} existing={editing} onClose={() => setEditing(null)} onSaved={reload} />}
    </div>
  );
}

function ResultModal({ courses, existing, onClose, onSaved }: { courses: Row[]; existing?: Row; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!existing;
  const [busy, setBusy] = useState(false);
  const [newCourse, setNewCourse] = useState("");
  const [photo, setPhoto] = useState(existing?.photo ?? "");

  async function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImage(file, 480, 0.85);
      setPhoto(dataUrl);
    } catch { toast.error("Couldn't read that image"); }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      enroll: String(fd.get("enroll")), name: String(fd.get("name")),
      fname: String(fd.get("fname")), mname: String(fd.get("mname")), dob: String(fd.get("dob")),
      coursename: String(fd.get("coursename")), duration: String(fd.get("duration")),
      sdate: String(fd.get("sdate")), edate: String(fd.get("edate")),
      marks: String(fd.get("marks")), certificate: String(fd.get("certificate")),
      photo,
    };
    setBusy(true);
    try {
      if (isEdit) {
        await updateResult({ data: { ...payload, id: Number(existing!.id) } });
        toast.success("Result updated");
      } else {
        await addResult({ data: payload });
        toast.success("Result added");
      }
      onSaved(); onClose();
    } catch { toast.error("Could not save result"); } finally { setBusy(false); }
  }

  const fields: [string, string, string?][] = [
    ["enroll", "Enrollment No. *", "text"], ["certificate", "Certificate No.", "text"],
    ["name", "Student Name *", "text"], ["dob", "Date of Birth (DD/MM/YYYY)", "text"],
    ["fname", "Father's Name", "text"], ["mname", "Mother's Name", "text"],
    ["duration", "Duration", "text"], ["marks", "Grade / Marks", "text"],
    ["sdate", "Start Date", "date"], ["edate", "End Date", "date"],
  ];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={onSubmit} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl">
        <div className="sticky top-0 z-10 bg-card flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-display text-xl">{isEdit ? "Edit" : "Add"} Student Result</h3>
          <button type="button" onClick={onClose} className="grid place-items-center size-9 rounded-full border border-border hover:bg-muted"><X className="size-4" /></button>
        </div>
        <div className="p-6">
          {/* Photo uploader */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              {photo || existing?.filename
                ? <img src={photo || `/result-photos/${existing?.filename}`} alt="Student" className="size-24 rounded-2xl object-cover border border-border" />
                : <div className="size-24 rounded-2xl border-2 border-dashed border-border grid place-items-center text-muted-foreground"><ImageIcon className="size-7" /></div>}
              {photo && (
                <button type="button" onClick={() => setPhoto("")} className="absolute -top-2 -right-2 grid place-items-center size-6 rounded-full bg-rose text-white shadow" title="Remove">
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            <div>
              <div className="text-sm font-medium">Student Photo</div>
              <p className="text-xs text-muted-foreground mt-0.5 mb-2">Optional · JPG/PNG · auto-resized</p>
              <label className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm cursor-pointer hover:border-primary/40 hover:text-primary transition-colors">
                <Upload className="size-4" /> {photo ? "Change photo" : "Upload photo"}
                <input type="file" accept="image/*" className="hidden" onChange={onPickPhoto} />
              </label>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(([n, l, type]) => {
              const val = existing?.[n] ?? "";
              // Old dates are stored as free text (e.g. 12/04/2021) which a native
              // date picker can't display — fall back to text so the value is preserved.
              const isIso = /^\d{4}-\d{2}-\d{2}$/.test(String(val));
              const effType = type === "date" && val && !isIso ? "text" : (type ?? "text");
              return (
                <label key={n} className="block">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{l}</span>
                  <input name={n} type={effType} defaultValue={val} required={l.includes("*")} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </label>
              );
            })}
            <label className="block sm:col-span-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Course</span>
              <input name="coursename" list="course-list" defaultValue={existing?.coursename ?? ""} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              <datalist id="course-list">{courses.map((c) => <option key={c.id} value={c.coursename} />)}</datalist>
            </label>
          </div>

          <div className="mt-5 rounded-xl bg-muted/40 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Quick add a course</div>
            <div className="flex gap-2">
              <input value={newCourse} onChange={(e) => setNewCourse(e.target.value)} placeholder="New course name"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              <button type="button" onClick={async () => {
                if (!newCourse.trim()) return;
                await addCourse({ data: { coursename: newCourse.trim() } });
                toast.success("Course added"); setNewCourse(""); onSaved();
              }} className="btn-ghost !py-2 !text-sm">Add</button>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 z-10 bg-card flex justify-end gap-3 px-6 py-4 border-t border-border">
          <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          <button disabled={busy} className="btn-primary disabled:opacity-60">{busy ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : isEdit ? "Update Result" : "Save Result"}</button>
        </div>
      </form>
    </div>
  );
}

/* --------------------------------- courses -------------------------------- */
function Courses({ courses, results, reload }: { courses: Row[]; results: Row[]; reload: () => void }) {
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const countFor = (cn: string) => results.filter((r) => r.coursename === cn).length;
  const filtered = useMemo(() => courses.filter((c) => contains(c, q)), [courses, q]);

  async function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try { await addCourse({ data: { coursename: name.trim() } }); toast.success("Course added"); setName(""); reload(); }
    catch { toast.error("Could not add course"); } finally { setBusy(false); }
  }
  async function onSaveEdit(id: number) {
    if (!editName.trim()) return;
    await renameCourse({ data: { id, coursename: editName.trim() } });
    toast.success("Course updated"); setEditId(null); reload();
  }
  async function onDelete(id: number, cn: string) {
    const n = countFor(cn);
    if (!confirm(`Delete course "${cn}"?${n ? ` ${n} result(s) keep this course name but the course is removed from the list.` : ""}`)) return;
    await deleteCourse({ data: { id } }); toast.success("Course deleted"); reload();
  }

  return (
    <div className="max-w-3xl">
      {/* Add course */}
      <form onSubmit={onAdd} className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="text-sm font-medium mb-3">Add a new course</div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Diploma in Beautician"
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
          <button disabled={busy} className="btn-primary !px-5 !py-2.5 !text-sm disabled:opacity-60"><Plus className="size-4" /> Add Course</button>
        </div>
      </form>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…"
          className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
      </div>

      {/* List */}
      <div className="rounded-2xl border border-border bg-card divide-y divide-border/60">
        {filtered.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-4 py-3">
            <span className="grid place-items-center size-9 rounded-lg bg-blush text-primary shrink-0"><BookOpen className="size-4" /></span>
            {editId === c.id ? (
              <>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <button onClick={() => onSaveEdit(Number(c.id))} className="grid place-items-center size-9 rounded-lg text-emerald-600 hover:bg-emerald-500/10" title="Save"><Check className="size-4" /></button>
                <button onClick={() => setEditId(null)} className="grid place-items-center size-9 rounded-lg text-muted-foreground hover:bg-muted" title="Cancel"><X className="size-4" /></button>
              </>
            ) : (
              <>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{c.coursename}</div>
                  <div className="text-xs text-muted-foreground">{countFor(c.coursename)} result(s)</div>
                </div>
                <button onClick={() => { setEditId(Number(c.id)); setEditName(c.coursename); }} className="grid place-items-center size-9 rounded-lg text-primary hover:bg-blush" title="Edit"><Pencil className="size-4" /></button>
                <button onClick={() => onDelete(Number(c.id), c.coursename)} className="grid place-items-center size-9 rounded-lg text-rose hover:bg-rose/10" title="Delete"><Trash2 className="size-4" /></button>
              </>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div className="px-4 py-10 text-center text-muted-foreground text-sm">No courses found.</div>}
      </div>
    </div>
  );
}
