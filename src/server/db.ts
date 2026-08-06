import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import seed from "./seed-results.json" with { type: "json" };

let _db: Client | null = null;
let _ready: Promise<void> | null = null;

function open(): Client {
  try {
    mkdirSync("./data", { recursive: true });
  } catch {
    /* ignore */
  }
  return createClient({ url: "file:./data/saloon.db" });
}

export function db(): Client {
  if (!_db) _db = open();
  return _db;
}

/** Runs migrations + one-time seed. Safe to call repeatedly. */
export async function initDb(): Promise<void> {
  if (_ready) return _ready;
  _ready = (async () => {
    const d = db();
    await d.batch(
      [
        `CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT,
          service TEXT, preferred_date TEXT, notes TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
        `CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          kind TEXT NOT NULL DEFAULT 'contact',
          name TEXT NOT NULL, phone TEXT, email TEXT, subject TEXT, message TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
        `CREATE TABLE IF NOT EXISTS courses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          coursename TEXT NOT NULL UNIQUE
        )`,
        `CREATE TABLE IF NOT EXISTS results (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          enroll TEXT NOT NULL, name TEXT NOT NULL, fname TEXT, mname TEXT,
          aadhaar TEXT, dob TEXT, coursename TEXT, duration TEXT,
          sdate TEXT, edate TEXT, marks TEXT, certificate TEXT, filename TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
        `CREATE INDEX IF NOT EXISTS idx_results_enroll ON results (enroll)`,
      ],
      "write",
    );

    // Migration: student photo (stored as a base64 data URL).
    try { await d.execute("ALTER TABLE results ADD COLUMN photo TEXT"); } catch { /* column exists */ }

    // Seed courses + results once (only if empty).
    const rc = await d.execute("SELECT COUNT(*) AS n FROM results");
    if (Number(rc.rows[0].n) === 0) {
      const courses = (seed.courses ?? []) as string[];
      const results = (seed.results ?? []) as Record<string, string>[];
      const stmts = [];
      for (const c of courses) {
        if (c) stmts.push({ sql: "INSERT OR IGNORE INTO courses (coursename) VALUES (?)", args: [c] });
      }
      for (const r of results) {
        stmts.push({
          sql: `INSERT INTO results (enroll,name,fname,mname,aadhaar,dob,coursename,duration,sdate,edate,marks,certificate,filename)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          args: [
            r.enroll ?? "", r.name ?? "", r.fname ?? "", r.mname ?? "", r.aadhaar ?? "",
            r.dob ?? "", r.coursename ?? "", r.duration ?? "", r.sdate ?? "", r.edate ?? "",
            r.marks ?? "", r.certificate ?? "", r.filename ?? "",
          ],
        });
      }
      if (stmts.length) await d.batch(stmts, "write");
    }
  })();
  return _ready;
}
