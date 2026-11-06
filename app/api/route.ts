import { NextRequest, NextResponse } from "next/server";
import {
  CATEGORY_GROUPS,
  CATEGORY_PAGE_SIZE,
  CITIES,
  COMPANIES,
  JOB_CATEGORIES,
  JOBS,
  LOCATIONS,
  POPULAR_SEARCHES,
  POPULAR_SEARCH_TABS,
  POPULAR_TAGS,
} from "@/lib/data";

// Penyimpanan sementara (in-memory). Data pendaftar HILANG saat server
// restart / serverless cold start. Password sengaja tidak disimpan.
type Registrant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  whatsapp: string;
  subscribe: boolean;
  createdAt: string;
};

const globalStore = globalThis as unknown as { __registrants?: Registrant[] };
const registrants = (globalStore.__registrants ??= []);

/* -------------------------------------------------------------------------- */
/* GET /api?section=jobs&category=<slug>                                       */
/* GET /api?section=companies                                                 */
/* -------------------------------------------------------------------------- */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section");

  if (section === "jobs") {
    const category = searchParams.get("category") ?? JOB_CATEGORIES[0].slug;
    if (!JOB_CATEGORIES.some((c) => c.slug === category)) {
      return NextResponse.json(
        { message: `Kategori "${category}" tidak ditemukan.` },
        { status: 400 }
      );
    }
    const data = JOBS.filter((j) => j.category === category);
    return NextResponse.json({ data });
  }

  if (section === "companies") {
    return NextResponse.json({ data: COMPANIES });
  }

  // GET /api?section=categories&page=1  (5 kategori per halaman)
  if (section === "categories") {
    const totalPages = Math.ceil(CATEGORY_GROUPS.length / CATEGORY_PAGE_SIZE);
    const page = Number(searchParams.get("page") ?? 1);
    if (!Number.isInteger(page) || page < 1 || page > totalPages) {
      return NextResponse.json(
        { message: `Parameter "page" harus berupa angka 1 sampai ${totalPages}.` },
        { status: 400 }
      );
    }
    const start = (page - 1) * CATEGORY_PAGE_SIZE;
    return NextResponse.json({
      data: CATEGORY_GROUPS.slice(start, start + CATEGORY_PAGE_SIZE),
      page,
      totalPages,
    });
  }

  // GET /api?section=cities
  if (section === "cities") {
    return NextResponse.json({ data: CITIES });
  }

  // GET /api?section=popular-tags
  if (section === "popular-tags") {
    return NextResponse.json({ data: POPULAR_TAGS });
  }

  // GET /api?section=popular-searches&tab=posisi
  if (section === "popular-searches") {
    const tab = searchParams.get("tab") ?? POPULAR_SEARCH_TABS[0].slug;
    if (!(tab in POPULAR_SEARCHES)) {
      return NextResponse.json({ message: `Tab "${tab}" tidak ditemukan.` }, { status: 400 });
    }
    return NextResponse.json({ data: POPULAR_SEARCHES[tab] });
  }

  return NextResponse.json(
    {
      message:
        'Parameter "section" wajib diisi: "jobs", "companies", "categories", "cities", "popular-tags", atau "popular-searches".',
    },
    { status: 400 }
  );
}

/* -------------------------------------------------------------------------- */
/* POST /api  — daftar akun                                                   */
/* -------------------------------------------------------------------------- */
type SignupBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  password?: unknown;
  location?: unknown;
  whatsapp?: unknown;
  subscribe?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: NextRequest) {
  let body: SignupBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Body request harus berupa JSON yang valid." },
      { status: 400 }
    );
  }

  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  const location = str(body.location);
  // Nomor setelah +62: buang spasi/strip, dan angka 0 di depan
  const whatsapp = str(body.whatsapp).replace(/[\s-]/g, "").replace(/^0+/, "");

  const errors: Record<string, string> = {};

  if (!firstName) errors.firstName = "Nama depan wajib diisi.";
  else if (firstName.length > 50) errors.firstName = "Nama depan maksimal 50 karakter.";

  if (!lastName) errors.lastName = "Nama belakang wajib diisi.";
  else if (lastName.length > 50) errors.lastName = "Nama belakang maksimal 50 karakter.";

  if (!email) errors.email = "Email wajib diisi.";
  else if (!EMAIL_RE.test(email)) errors.email = "Format email tidak valid.";

  if (!password) errors.password = "Kata sandi wajib diisi.";
  else if (password.length < 8) errors.password = "Kata sandi minimal 8 karakter.";

  if (!location) errors.location = "Lokasi wajib dipilih.";
  else if (!LOCATIONS.includes(location)) errors.location = "Lokasi tidak ada dalam daftar.";

  if (!whatsapp) errors.whatsapp = "Nomor WhatsApp wajib diisi.";
  else if (!/^\d{9,13}$/.test(whatsapp))
    errors.whatsapp = "Nomor WhatsApp harus 9-13 digit angka (tanpa +62).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Data pendaftaran belum valid. Periksa kolom yang ditandai.", errors },
      { status: 400 }
    );
  }

  if (registrants.some((r) => r.email === email)) {
    return NextResponse.json(
      {
        message: "Email ini sudah terdaftar.",
        errors: { email: "Email ini sudah terdaftar. Gunakan email lain." },
      },
      { status: 409 }
    );
  }

  const user: Registrant = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
    location,
    whatsapp: `+62${whatsapp}`,
    subscribe: body.subscribe === true,
    createdAt: new Date().toISOString(),
  };
  registrants.push(user);

  return NextResponse.json(
    { message: `Selamat datang, ${firstName}! Profil Glints kamu berhasil dibuat.`, user },
    { status: 201 }
  );
}