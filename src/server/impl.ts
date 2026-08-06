// Server-only implementation. Never imported at module top-level by client code —
// only via dynamic import() inside createServerFn handlers (stripped from client bundle).
import { useSession } from "@tanstack/react-start/server";
import { createHash } from "node:crypto";
import { db, initDb } from "./db";

const SESSION_SECRET =
  process.env.SESSION_SECRET ?? "1st-lady-saloon-local-dev-secret-change-me-please";
const ADMIN_USER = process.env.ADMIN_USER ?? "ladyuser";
const ADMIN_PASS_SHA256 = process.env.ADMIN_PASS_SHA256 ?? sha256("lady%$@!saloon");

function sha256(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

type SessionData = { admin?: string };
function session() {
  return useSession<SessionData>({ password: SESSION_SECRET });
}
async function currentAdmin(): Promise<string | null> {
  const s = await session();
  return s.data.admin ?? null;
}
async function assertAdmin(): Promise<void> {
  if (!(await currentAdmin())) throw new Error("Unauthorized");
}

export async function submitAppointment(d: any) {
  await initDb();
  await db().execute({
    sql: `INSERT INTO appointments (name,phone,email,service,preferred_date,notes) VALUES (?,?,?,?,?,?)`,
    args: [d.name, d.phone, d.email ?? "", d.service ?? "", d.preferred_date ?? "", d.notes ?? ""],
  });
  return { ok: true as const };
}

export async function submitContact(d: any) {
  await initDb();
  await db().execute({
    sql: `INSERT INTO contacts (kind,name,phone,email,subject,message) VALUES (?,?,?,?,?,?)`,
    args: [d.kind, d.name, d.phone ?? "", d.email ?? "", d.subject ?? "", d.message],
  });
  return { ok: true as const };
}

export async function searchResult(d: any) {
  await initDb();
  const term = String(d.enroll).trim();
  const res = await db().execute({
    sql: `SELECT enroll,name,fname,mname,dob,coursename,duration,sdate,edate,marks,certificate,filename,photo
          FROM results WHERE enroll = ? OR certificate = ? LIMIT 1`,
    args: [term, term],
  });
  if (res.rows.length === 0) return { found: false as const };
  const row = res.rows[0] as any;
  if (d.dob && String(row.dob).trim() && String(d.dob).trim() !== String(row.dob).trim()) {
    return { found: false as const };
  }
  return { found: true as const, result: row };
}

export async function adminLogin(d: any) {
  const ok = d.username === ADMIN_USER && sha256(d.password) === ADMIN_PASS_SHA256;
  if (!ok) return { ok: false as const };
  const s = await session();
  await s.update({ admin: d.username });
  return { ok: true as const };
}

export async function adminLogout() {
  const s = await session();
  await s.clear();
  return { ok: true as const };
}

export async function adminMe() {
  return { admin: await currentAdmin() };
}

export async function listAppointments() {
  await assertAdmin();
  await initDb();
  const r = await db().execute("SELECT * FROM appointments ORDER BY id DESC LIMIT 500");
  return { rows: r.rows };
}

export async function listContacts() {
  await assertAdmin();
  await initDb();
  const r = await db().execute("SELECT * FROM contacts ORDER BY id DESC LIMIT 500");
  return { rows: r.rows };
}

export async function listCoursesAndResults() {
  await assertAdmin();
  await initDb();
  const courses = await db().execute("SELECT * FROM courses ORDER BY coursename");
  const results = await db().execute("SELECT * FROM results ORDER BY id DESC LIMIT 1000");
  return { courses: courses.rows, results: results.rows };
}

export async function addCourse(d: any) {
  await assertAdmin();
  await initDb();
  await db().execute({ sql: "INSERT OR IGNORE INTO courses (coursename) VALUES (?)", args: [d.coursename] });
  return { ok: true as const };
}

export async function renameCourse(d: any) {
  await assertAdmin();
  await initDb();
  // Update the course row and keep existing results in sync.
  await db().batch([
    // Sync existing results to the new name first (while the old name is still in courses)…
    { sql: "UPDATE results SET coursename = ? WHERE coursename = (SELECT coursename FROM courses WHERE id = ?)", args: [d.coursename, d.id] },
    // …then rename the course itself.
    { sql: "UPDATE courses SET coursename = ? WHERE id = ?", args: [d.coursename, d.id] },
  ], "write");
  return { ok: true as const };
}

export async function deleteCourse(d: any) {
  await assertAdmin();
  await initDb();
  await db().execute({ sql: "DELETE FROM courses WHERE id = ?", args: [d.id] });
  return { ok: true as const };
}

export async function addResult(d: any) {
  await assertAdmin();
  await initDb();
  await db().execute({
    sql: `INSERT INTO results (enroll,name,fname,mname,dob,coursename,duration,sdate,edate,marks,certificate,photo)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      d.enroll, d.name, d.fname ?? "", d.mname ?? "", d.dob ?? "", d.coursename ?? "",
      d.duration ?? "", d.sdate ?? "", d.edate ?? "", d.marks ?? "", d.certificate ?? "", d.photo ?? "",
    ],
  });
  return { ok: true as const };
}

export async function updateResult(d: any) {
  await assertAdmin();
  await initDb();
  await db().execute({
    sql: `UPDATE results SET enroll=?,name=?,fname=?,mname=?,dob=?,coursename=?,duration=?,sdate=?,edate=?,marks=?,certificate=?,photo=?
          WHERE id=?`,
    args: [
      d.enroll, d.name, d.fname ?? "", d.mname ?? "", d.dob ?? "", d.coursename ?? "",
      d.duration ?? "", d.sdate ?? "", d.edate ?? "", d.marks ?? "", d.certificate ?? "", d.photo ?? "",
      d.id,
    ],
  });
  return { ok: true as const };
}

export async function deleteResult(d: any) {
  await assertAdmin();
  await initDb();
  await db().execute({ sql: "DELETE FROM results WHERE id = ?", args: [d.id] });
  return { ok: true as const };
}
