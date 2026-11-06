"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap";

// Bentuk data sama dengan Registrant di app/api/route.ts
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

const dateFormat = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

function InfoBadge({ subscribe }: { subscribe: boolean }) {
  return (
    <span
      className={`inline-block whitespace-nowrap px-2 py-0.5 text-[12px] font-semibold ${
        subscribe ? "bg-[#e8f6ee] text-[#1e7a45]" : "bg-[#f0f0f0] text-[#666]"
      }`}
    >
      {subscribe ? "Info karir: Ya" : "Info karir: Tidak"}
    </span>
  );
}

export default function PendaftarPage() {
  const [data, setData] = useState<Registrant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api?section=registrants", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? "Gagal memuat data pendaftar.");
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data pendaftar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const isEmpty = data && data.length === 0 && !error;

  return (
    <div style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <link rel="stylesheet" href={FONT_URL} />
      <Navbar />

      <main className="min-h-[calc(100vh-71px)] bg-[#f6f6f6] px-0 pb-10 pt-8 text-black sm:px-4 md:pb-[66px] md:pt-[80px]">
        <div className="px-4 sm:px-0">
          <h1 className="text-center text-[24px] font-bold leading-9 md:text-[30px] md:leading-[48px]">
            Data pendaftar
          </h1>
          <p className="mx-auto mb-5 mt-1 max-w-[320px] text-center text-[12px] leading-[1.5] text-[#666] md:mb-[27px] md:max-w-none md:text-[13px]">
            Data tersimpan sementara di memori server dan hilang saat server restart.
          </p>
        </div>

        <section className="mx-auto w-full max-w-[1000px] bg-white pt-5 md:pt-7">
          {/* Header: jumlah + tombol muat ulang */}
          <div className="flex items-center justify-between gap-3 px-4 pb-4 md:px-[42px] md:pb-5">
            <p className="text-[14px] text-[#666] md:text-[15px]">
              {data ? (
                <>
                  <span className="text-[18px] font-bold text-black md:text-[15px]">
                    {data.length}
                  </span>{" "}
                  pendaftar
                </>
              ) : (
                "Memuat data..."
              )}
            </p>
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="h-11 min-w-[120px] bg-[#007bb8] px-5 text-[13px] font-bold uppercase tracking-[0.3px] text-white transition hover:bg-[#006a9f] active:bg-[#005f8f] disabled:cursor-not-allowed disabled:opacity-65 md:h-10 md:px-6"
            >
              {loading ? "Memuat..." : "Muat ulang"}
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mx-4 mb-4 border border-[#f5c2be] bg-[#fdecea] px-4 py-3 text-sm leading-[1.4] text-[#b3261e] md:mx-[42px] md:mb-5"
            >
              {error}
            </div>
          )}

          {/* ===== Mobile: daftar kartu ===== */}
          <div className="md:hidden">
            {loading && !data ? (
              <ul className="space-y-3 px-4 pb-6">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="space-y-2.5 border border-[#ececec] p-4">
                    <div className="h-4 w-2/3 animate-pulse bg-[#f0f0f0]" />
                    <div className="h-3 w-full animate-pulse bg-[#f0f0f0]" />
                    <div className="h-3 w-1/2 animate-pulse bg-[#f0f0f0]" />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3 px-4 pb-6">
                {data?.map((r, i) => (
                  <li key={r.id} className="border border-[#ececec] bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center bg-[#f0f8ff] px-1.5 text-[12px] font-semibold text-[#007bb8]">
                          {i + 1}
                        </span>
                        <p className="break-words text-[15px] font-semibold leading-6 text-black">
                          {r.firstName} {r.lastName}
                        </p>
                      </div>
                    </div>

                    <dl className="mt-3 space-y-2 text-[13px] leading-[1.4]">
                      <div className="flex gap-3">
                        <dt className="w-[72px] shrink-0 text-[#888]">Email</dt>
                        <dd className="min-w-0 break-all text-[#333]">{r.email}</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="w-[72px] shrink-0 text-[#888]">Lokasi</dt>
                        <dd className="min-w-0 break-words text-[#333]">{r.location}</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="w-[72px] shrink-0 text-[#888]">WhatsApp</dt>
                        <dd className="min-w-0 text-[#333]">
                          <a
                            href={`tel:${r.whatsapp.replace(/[^\d+]/g, "")}`}
                            className="text-[#0079b6]"
                          >
                            {r.whatsapp}
                          </a>
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0f0f0] pt-3">
                      <InfoBadge subscribe={r.subscribe} />
                      <span className="text-[12px] text-[#888]">
                        {dateFormat.format(new Date(r.createdAt))}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ===== Desktop: tabel ===== */}
          <div className="hidden overflow-x-auto px-[42px] pb-8 md:block">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#cfcfcf]">
                  {["No", "Nama", "Email", "Lokasi", "WhatsApp", "Info karir", "Waktu daftar"].map((h) => (
                    <th
                      key={h}
                      className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.3px] text-[#666]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && !data
                  ? [0, 1, 2].map((i) => (
                      <tr key={i} className="border-b border-[#f0f0f0]">
                        <td colSpan={7} className="py-3.5">
                          <div className="h-4 animate-pulse bg-[#f0f0f0]" />
                        </td>
                      </tr>
                    ))
                  : data?.map((r, i) => (
                      <tr key={r.id} className="border-b border-[#f0f0f0] transition-colors hover:bg-[#f0f8ff]">
                        <td className="py-3.5 pr-4 align-top text-[#666]">{i + 1}</td>
                        <td className="py-3.5 pr-4 align-top font-medium text-black">
                          {r.firstName} {r.lastName}
                        </td>
                        <td className="py-3.5 pr-4 align-top text-[#333]">{r.email}</td>
                        <td className="py-3.5 pr-4 align-top text-[#333]">{r.location}</td>
                        <td className="whitespace-nowrap py-3.5 pr-4 align-top text-[#333]">{r.whatsapp}</td>
                        <td className="py-3.5 pr-4 align-top">
                          <span
                            className={`inline-block px-2 py-0.5 text-[12px] font-semibold ${
                              r.subscribe ? "bg-[#e8f6ee] text-[#1e7a45]" : "bg-[#f0f0f0] text-[#666]"
                            }`}
                          >
                            {r.subscribe ? "Ya" : "Tidak"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-3.5 align-top text-[#666]">
                          {dateFormat.format(new Date(r.createdAt))}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {isEmpty && (
            <div className="px-4 py-10 text-center text-[14px] leading-[1.6] text-[#666] md:py-12 md:text-[15px]">
              Belum ada data pendaftar.{" "}
              <Link href="/daftar/form" className="text-[#0079b6] hover:underline">
                Buat akun
              </Link>
            </div>
          )}

          <div className="mx-3.5 h-px bg-[#f0f0f0]" />
          <div className="flex justify-center py-5 text-[14px] md:text-[15px]">
            <Link href="/daftar/form" className="py-2 text-[#0079b6] hover:underline">
              Kembali ke halaman daftar
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}