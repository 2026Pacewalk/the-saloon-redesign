import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Only client-safe imports at module top-level (createServerFn, zod).
// All server-only work lives in ./impl and is loaded via dynamic import inside
// the handlers, which the compiler strips from the client bundle.

const appointmentSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  phone: z.string().min(6, "Please enter a valid phone").max(30),
  email: z.string().email().max(160).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  preferred_date: z.string().max(40).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export const submitAppointment = createServerFn({ method: "POST" })
  .validator((d: unknown) => appointmentSchema.parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).submitAppointment(data));

const contactSchema = z.object({
  kind: z.enum(["contact", "franchise", "hiring"]).default("contact"),
  name: z.string().min(2, "Please enter your name").max(120),
  phone: z.string().max(30).optional().or(z.literal("")),
  email: z.string().email().max(160).optional().or(z.literal("")),
  subject: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(2, "Please enter a message").max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).submitContact(data));

const searchSchema = z.object({
  enroll: z.string().min(2, "Enter your enrollment / certificate number").max(120),
  dob: z.string().max(40).optional().or(z.literal("")),
});

export const searchResult = createServerFn({ method: "POST" })
  .validator((d: unknown) => searchSchema.parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).searchResult(data));

const loginSchema = z.object({ username: z.string().min(1), password: z.string().min(1) });

export const adminLogin = createServerFn({ method: "POST" })
  .validator((d: unknown) => loginSchema.parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).adminLogin(data));

export const adminLogout = createServerFn({ method: "POST" })
  .handler(async () => (await import("@/server/impl")).adminLogout());

export const adminMe = createServerFn({ method: "GET" })
  .handler(async () => (await import("@/server/impl")).adminMe());

type SafeRow = Record<string, string | number | boolean | null>;

export const listAppointments = createServerFn({ method: "GET" })
  .handler(async () => (await import("@/server/impl")).listAppointments() as unknown as Promise<{ rows: SafeRow[] }>);

export const listContacts = createServerFn({ method: "GET" })
  .handler(async () => (await import("@/server/impl")).listContacts() as unknown as Promise<{ rows: SafeRow[] }>);

export const listCoursesAndResults = createServerFn({ method: "GET" })
  .handler(async () => (await import("@/server/impl")).listCoursesAndResults() as unknown as Promise<{ courses: SafeRow[]; results: SafeRow[] }>);

export const addCourse = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ coursename: z.string().min(2).max(200) }).parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).addCourse(data));

export const renameCourse = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number().int().positive(), coursename: z.string().min(2).max(200) }).parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).renameCourse(data));

export const deleteCourse = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number().int().positive() }).parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).deleteCourse(data));

const resultSchema = z.object({
  enroll: z.string().min(1).max(120),
  name: z.string().min(1).max(200),
  fname: z.string().max(200).optional().or(z.literal("")),
  mname: z.string().max(200).optional().or(z.literal("")),
  dob: z.string().max(40).optional().or(z.literal("")),
  coursename: z.string().max(200).optional().or(z.literal("")),
  duration: z.string().max(80).optional().or(z.literal("")),
  sdate: z.string().max(40).optional().or(z.literal("")),
  edate: z.string().max(40).optional().or(z.literal("")),
  marks: z.string().max(40).optional().or(z.literal("")),
  certificate: z.string().max(120).optional().or(z.literal("")),
  photo: z.string().max(6_000_000).optional().or(z.literal("")), // base64 data URL
});

export const addResult = createServerFn({ method: "POST" })
  .validator((d: unknown) => resultSchema.parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).addResult(data));

export const updateResult = createServerFn({ method: "POST" })
  .validator((d: unknown) => resultSchema.extend({ id: z.number().int().positive() }).parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).updateResult(data));

export const deleteResult = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.number().int().positive() }).parse(d))
  .handler(async ({ data }) => (await import("@/server/impl")).deleteResult(data));
