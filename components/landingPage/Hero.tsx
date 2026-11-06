"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";

const ALL_LOCATIONS = "Semua Kota/Provinsi";
const LOCATION_EVENT = "glints:location";

const LOCATIONS = [
  ALL_LOCATIONS,
  "Jabodetabek",
  "Jakarta Selatan, DKI Jakarta",
  "Jakarta Barat, DKI Jakarta",
  "Surabaya, Jawa Timur",
  "Jakarta Utara, DKI Jakarta",
  "Kab. Tangerang, Banten",
];

/** Dropdown lokasi untuk kolom cari di hero. Sinkron dengan dropdown di Navbar. */
function LocationDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(ALL_LOCATIONS);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? LOCATIONS.filter((l) => l.toLowerCase().includes(q)) : LOCATIONS;
  }, [query]);

  // Sinkron dengan dropdown lokasi di navbar
  useEffect(() => {
    const onSync = (e: Event) => setSelected((e as CustomEvent<string>).detail);
    window.addEventListener(LOCATION_EVENT, onSync);
    return () => window.removeEventListener(LOCATION_EVENT, onSync);
  }, []);

  // Tutup saat klik di luar / tekan Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (loc: string) => {
    setSelected(loc);
    window.dispatchEvent(new CustomEvent(LOCATION_EVENT, { detail: loc }));
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative hidden h-full w-[224px] shrink-0 md:block">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-full w-full items-center gap-1.5 pl-1.5 pr-4 text-base ${
          open ? "text-[#1672E0]" : "text-[#333]"
        }`}
      >
        <MapPin className={`size-4 shrink-0 ${open ? "text-[#1672E0]" : "text-[#555]"}`} />
        <span className="flex-1 truncate text-left">{selected}</span>
        <svg
          width="10"
          height="5"
          viewBox="0 0 10 5"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M0 0h10L5 5z" fill={open ? "#1672E0" : "#666"} />
        </svg>
      </button>

      {open && (
        // z-40: tetap di bawah navbar sticky (z-50) saat halaman di-scroll
        <div className="absolute -left-2 top-full z-40 mt-3 w-[320px] rounded-xl bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <label className="flex h-11 items-center gap-2 rounded-lg border border-[#D3D3D3] px-3 focus-within:border-[#1672E0]">
            <Search className="size-[18px] shrink-0 text-[#9A9A9A]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Kota/Provinsi"
              className="w-full bg-transparent text-base text-[#222] placeholder:text-[#8E8E8E] focus:outline-none"
            />
          </label>

          <ul role="listbox" className="mt-2 max-h-[300px] overflow-y-auto">
            {filtered.length === 0 && <li className="px-3 py-3 text-sm text-[#8E8E8E]">Lokasi tidak ditemukan</li>}
            {filtered.map((loc) => {
              const active = loc === selected;
              return (
                <li key={loc} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => choose(loc)}
                    className={`block w-full border-l-[3px] px-3 py-3 text-left text-[15px] ${
                      active
                        ? "border-[#1672E0] bg-[#E3EEFB] text-[#1672E0]"
                        : "border-transparent text-[#333] hover:bg-[#F2F7FD]"
                    }`}
                  >
                    {loc}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const { payload, loading, error } = useApi<{ data: string[] }>("/api?section=popular-tags");

  return (
    <section className="bg-gradient-to-b from-[#c6e9fe] via-[#f6f6f6] to-[#f6f6f6] pb-2 pt-8">
      <Container>
        <div className="mx-auto w-full max-w-[1120px]">
          <h1 className="text-center text-[28px] font-bold leading-[1.3] text-black md:text-[37px]">
            Temukan 100.000+ Loker Terbaru di Indonesia
          </h1>

          {/* id="hero-search" dipakai Navbar untuk memunculkan baris pencarian sticky */}
          <form
            id="hero-search"
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex h-[62px] items-center rounded-lg border border-[#D3D3D3] bg-white p-2 focus-within:border-[#1672E0] focus-within:ring-2 focus-within:ring-[#1672E0]/20"
          >
            <LocationDropdown />

            <div className="hidden h-9 w-px shrink-0 bg-[#DADADA] md:block" />

            <label className="flex h-full flex-1 items-center gap-2 px-3">
              <Search className="size-[18px] shrink-0 text-[#9A9A9A]" />
              <input
                placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
                className="w-full bg-transparent text-base text-[#222] placeholder:text-[#8E8E8E] focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="h-11 w-[91px] shrink-0 rounded bg-[#1672E0] text-[15px] font-bold uppercase text-white hover:bg-[#0F5FC2]"
            >
              Cari
            </button>
          </form>

          <div className="mt-3 flex min-h-7 flex-wrap items-center gap-x-3.5 gap-y-2 text-sm">
            <span className="text-[#555]">Populer:</span>
            {loading && !payload && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-7 w-20" />)}
            {error && <span className="text-red-600">{error}</span>}
            {payload?.data.map((t) => (
              <a
                key={t}
                href="#"
                className="rounded-[3px] bg-[#E3EEFB] px-[5px] py-1 leading-5 text-[#1672E0] hover:bg-[#D3E5FA]"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}