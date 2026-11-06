"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { LOCATIONS } from "@/lib/data";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap";

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "location"
  | "whatsapp";

type FieldErrors = Partial<Record<FieldName, string>>;

type Alert = { type: "error" | "success"; text: string } | null;

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  whatsapp: "",
  subscribe: true, // di desain, checkbox sudah tercentang
};

/* ------------------------------ Class helper ------------------------------ */
const inputBase =
  "h-[46px] w-full rounded-none border bg-white px-[14px] text-[15px] text-[#333] outline-none transition placeholder:text-[#6f6f6f] focus:border-[#0079b6] focus:ring-1 focus:ring-[#0079b6]";
const normalBorder = "border-[#cfcfcf]";
const errorBorder = "border-[#d93025] focus:border-[#d93025] focus:ring-[#d93025]";

/* --------------------------------- Ikon ---------------------------------- */
function ChevronDown({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 9l7 7 7-7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      {off && <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="flex-none">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        d="M16.1 7.5a8.4 8.4 0 0 0-7.2 12.7L7.6 24.5l4.4-1.2a8.4 8.4 0 1 0 4.1-15.8z"
        fill="#fff"
      />
      <path
        d="M13.3 12.2c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.8 4.4 3.8 2.1.8 2.6.7 3 .6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4-.3-.1-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.1-.3 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5l-.8-2z"
        fill="#25D366"
      />
    </svg>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[12.5px] leading-[1.35] text-[#d93025]">{message}</p>;
}

/* --------------------------------- Halaman -------------------------------- */
export default function DaftarPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [alert, setAlert] = useState<Alert>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof INITIAL>(key: K, value: (typeof INITIAL)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setAlert(null);
    setErrors({});

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? {});
        setAlert({ type: "error", text: data.message ?? "Pendaftaran gagal. Coba lagi." });
        return;
      }

      setAlert({ type: "success", text: data.message });
      setForm(INITIAL);
    } catch {
      setAlert({ type: "error", text: "Tidak dapat terhubung ke server. Coba lagi." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <link rel="stylesheet" href={FONT_URL} />
      <Navbar />

      <main className="min-h-[calc(100vh-71px)] bg-[#f6f6f6] px-4 pb-[66px] pt-14 text-black md:pt-[114px]">
        <h1 className="mb-[27px] text-center text-[26px] font-bold leading-10 md:text-[30px] md:leading-[48px]">
          Mari buat profil
          <br />
          Glints kamu.
        </h1>

        <section className="mx-auto w-full max-w-[800px] bg-white pt-7">
          <form className="px-5 md:px-[42px]" onSubmit={handleSubmit} noValidate>
            {alert && (
              <div
                role="alert"
                className={`mb-6 border px-4 py-3 text-sm leading-[1.4] ${
                  alert.type === "error"
                    ? "border-[#f5c2be] bg-[#fdecea] text-[#b3261e]"
                    : "border-[#b9e2c9] bg-[#e8f6ee] text-[#1e7a45]"
                }`}
              >
                {alert.text}
              </div>
            )}

            <div className="grid grid-cols-1 items-start gap-x-7 gap-y-[22px] md:grid-cols-2 md:gap-y-[33px]">
              {/* Nama depan */}
              <div className="flex min-w-0 flex-col">
                <input
                  className={`${inputBase} ${errors.firstName ? errorBorder : normalBorder}`}
                  type="text"
                  name="firstName"
                  placeholder="Nama depan"
                  autoComplete="given-name"
                  maxLength={50}
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  aria-invalid={!!errors.firstName}
                />
                <FieldError message={errors.firstName} />
              </div>

              {/* Nama belakang */}
              <div className="flex min-w-0 flex-col">
                <input
                  className={`${inputBase} ${errors.lastName ? errorBorder : normalBorder}`}
                  type="text"
                  name="lastName"
                  placeholder="Nama Belakang"
                  autoComplete="family-name"
                  maxLength={50}
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  aria-invalid={!!errors.lastName}
                />
                <FieldError message={errors.lastName} />
              </div>

              {/* Email */}
              <div className="flex min-w-0 flex-col">
                <input
                  className={`${inputBase} ${errors.email ? errorBorder : normalBorder}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                />
                <FieldError message={errors.email} />
              </div>

              {/* Kata sandi */}
              <div className="flex min-w-0 flex-col">
                <div className="relative">
                  <input
                    className={`${inputBase} pr-12 ${errors.password ? errorBorder : normalBorder}`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Buat kata sandi"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => setField("password", e.target.value)}
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    className="absolute right-0 top-0 flex h-[46px] w-[46px] items-center justify-center text-[#9a9a9a] hover:text-[#555]"
                  >
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
                <FieldError message={errors.password} />
              </div>

              {/* Lokasi */}
              <div className="flex min-w-0 flex-col">
                <div className="relative">
                  <select
                    className={`h-[53px] w-full cursor-pointer appearance-none truncate rounded-none border-2 bg-white pl-[21px] pr-[52px] text-[17px] outline-none transition focus:border-[#0079b6] ${
                      errors.location ? "border-[#d93025] focus:border-[#d93025]" : "border-[#757575]"
                    } ${form.location ? "text-[#333]" : "text-[#666]"}`}
                    name="location"
                    value={form.location}
                    onChange={(e) => setField("location", e.target.value)}
                    aria-invalid={!!errors.location}
                  >
                    <option value="" disabled>
                      Masukkan lokasimu (Kota &amp; Provinsi)
                    </option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#4a4a4a]">
                    <ChevronDown />
                  </span>
                </div>
                <FieldError message={errors.location} />
              </div>

              {/* WhatsApp */}
              <div className="flex min-w-0 flex-col">
                <div
                  className={`flex h-[47px] items-center border-2 bg-white transition focus-within:border-[#0079b6] ${
                    errors.whatsapp ? "border-[#d93025] focus-within:border-[#d93025]" : "border-[#d4d4d4]"
                  }`}
                >
                  <span className="flex h-full select-none items-center gap-1.5 whitespace-nowrap pl-3 pr-2.5 text-base text-[#111]">
                    +62
                    <ChevronDown size={18} />
                  </span>
                  <input
                    className="h-full min-w-0 flex-1 border-0 border-l border-[#dcdcdc] bg-transparent px-[14px] text-[17px] text-[#333] outline-none placeholder:text-[#777]"
                    type="tel"
                    inputMode="numeric"
                    name="whatsapp"
                    placeholder="Nomor WhatsApp"
                    autoComplete="tel-national"
                    value={form.whatsapp}
                    onChange={(e) => setField("whatsapp", e.target.value.replace(/[^\d\s-]/g, ""))}
                    aria-invalid={!!errors.whatsapp}
                  />
                </div>
                <FieldError message={errors.whatsapp} />

                <div className="mt-4 flex min-h-[70px] items-center gap-3.5 bg-[#f0f8ff] px-[18px] text-[14.5px] leading-[19px] text-[#111]">
                  <WhatsAppIcon />
                  <span>
                    Pastikan nomor WhatsApp kamu aktif
                    <br />
                    agar dapat dihubungi perusahaan
                  </span>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <label className="mt-8 flex cursor-pointer items-center gap-[5px] text-[12.5px] text-[#5c5c5c] md:-ml-3.5">
              <span className="relative flex h-5 w-5 flex-none items-center justify-center">
                <input
                  type="checkbox"
                  checked={form.subscribe}
                  onChange={(e) => setField("subscribe", e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-[#111] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0079b6]"
                />
                <svg
                  className="pointer-events-none absolute hidden peer-checked:block"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12.5l5 5L20 6.5"
                    stroke="#111"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Ya, perbarui saya dengan informasi tentang peluang karir terbaru
            </label>

            {/* Tombol daftar */}
            <button
              type="submit"
              disabled={loading}
              className="mx-auto mt-[26px] block h-11 w-full max-w-[372px] bg-[#007bb8] text-sm font-bold uppercase tracking-[0.3px] text-white transition hover:bg-[#006a9f] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>

            <p className="mt-[29px] text-center text-[13px] text-[#666]">
              Untuk perusahaan, kunjungi{" "}
              <Link href="/perusahaan" className="text-[#0079b6] hover:underline">
                halaman ini
              </Link>
            </p>

            <p className="mt-14 text-center text-[13px] text-[#666]">
              Dengan mendaftar, saya setuju dengan{" "}
              <Link href="/ketentuan-layanan" className="text-black hover:underline">
                Ketentuan Layanan
              </Link>
            </p>
          </form>

          <div className="mx-3.5 mt-[18px] h-px bg-[#f0f0f0]" />
          <div className="flex justify-center gap-4 py-5 text-[15px] text-[#666] md:gap-16">
            <span>Sudah punya akun Glints?</span>
            <Link href="/masuk" className="text-[#0079b6] hover:underline">
              Masuk
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}