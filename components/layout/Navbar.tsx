"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Globe, MapPin, Menu, Search, X } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Navbar Glints TapLoker.
 *
 * - Navbar selalu menempel di atas (sticky) di semua halaman.
 * - `stickySearch` (khusus halaman utama): baris pencarian muncul di bawah navbar
 *   setelah kolom cari di section hero (id="hero-search") hilang dari layar.
 *   Di halaman lain, jangan beri prop ini.
 * - Desktop (>= xl): menu penuh. Di bawah itu: logo kiri, ikon pesan + hamburger kanan,
 *   dan sidebar biru meluncur dari kanan.
 */

const HERO_SEARCH_ID = "hero-search";
const NAVBAR_HEIGHT = 70; // px, dipakai untuk rootMargin observer

const NAV_LINKS = [
  { label: "Lowongan Kerja", href: "#" },
  { label: "Perusahaan", href: "#" },
  { label: "Blog", href: "#" },
];

const LANGUAGES = ["English", "Indonesian"] as const;

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

/** Garis hitam di bawah teks yang melebar dari tengah ke kiri dan kanan saat hover/fokus. */
const UNDERLINE =
  "relative inline-flex items-center gap-1.5 py-1 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 " +
  "after:-translate-x-1/2 after:bg-black after:content-[''] after:transition-[width] after:duration-300 after:ease-out " +
  "hover:after:w-full focus-visible:after:w-full focus-visible:outline-none motion-reduce:after:transition-none";

/* -------------------------------------------------------------------------- */
/* Ikon pesan (solid / blok hitam) untuk mobile                               */
/* -------------------------------------------------------------------------- */
function ChatFilledIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8.2l-4.4 3.6c-.6.5-1.8.1-1.8-.8V5a2 2 0 0 1 2-2z" />
      <circle cx="7.5" cy="10.5" r="1.4" fill="white" />
      <circle cx="12" cy="10.5" r="1.4" fill="white" />
      <circle cx="16.5" cy="10.5" r="1.4" fill="white" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Tombol "Unduh App Glints": hover = bayangan garis miring abu-abu           */
/* -------------------------------------------------------------------------- */
function DownloadButton() {
  return (
    <a href="#" className="group relative inline-block focus-visible:outline-none">
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-[5px] group-hover:translate-y-[5px] group-hover:opacity-100 group-focus-visible:translate-x-[5px] group-focus-visible:translate-y-[5px] group-focus-visible:opacity-100 motion-reduce:transition-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #8E8E8E 0, #8E8E8E 1px, transparent 1px, transparent 4px)",
        }}
      />
      <span className="relative flex h-8 items-center rounded-[2px] bg-[#1672E0] px-4 text-[13px] font-medium uppercase text-white transition-transform duration-200 group-hover:-translate-x-px group-hover:-translate-y-px motion-reduce:transition-none">
        Unduh App Glints
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Pilihan bahasa (dropdown)                                                  */
/* -------------------------------------------------------------------------- */
function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<(typeof LANGUAGES)[number]>("Indonesian");
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${UNDERLINE} ${open ? "after:w-full" : ""}`}
      >
        <Globe className="size-4" />
        {lang}
        <ChevronDown className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-md border border-[#EDEDED] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        >
          {LANGUAGES.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <button
                type="button"
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className="block w-full px-4 py-3 text-left text-[13px] font-medium uppercase text-black hover:bg-[#F2F2F2]"
              >
                {l}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dropdown lokasi untuk baris pencarian sticky (sinkron dengan Hero)         */
/* -------------------------------------------------------------------------- */
function LocationDropdown({ forceClose }: { forceClose: boolean }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(ALL_LOCATIONS);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? LOCATIONS.filter((l) => l.toLowerCase().includes(q)) : LOCATIONS;
  }, [query]);

  // Sinkron dengan dropdown lokasi di hero
  useEffect(() => {
    const onSync = (e: Event) => setSelected((e as CustomEvent<string>).detail);
    window.addEventListener(LOCATION_EVENT, onSync);
    return () => window.removeEventListener(LOCATION_EVENT, onSync);
  }, []);

  // Tutup saat baris pencarian menghilang
  useEffect(() => {
    if (forceClose) setOpen(false);
  }, [forceClose]);

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
    <div ref={ref} className="relative hidden w-[232px] shrink-0 border-r border-[#DDD] md:block">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-full w-full items-center gap-2 px-3 text-base ${open ? "text-[#1672E0]" : "text-[#222]"}`}
      >
        <MapPin className="size-[18px] shrink-0" />
        <span className="flex-1 truncate text-left">{selected}</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-[#1672E0]" : "text-[#555]"
          }`}
        />
      </button>

      {open && (
        <div className="absolute -left-1 top-full z-50 mt-3 w-[320px] rounded-xl bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
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

/* -------------------------------------------------------------------------- */
/* Baris pencarian yang muncul saat di-scroll                                 */
/* -------------------------------------------------------------------------- */
function StickySearchRow({ visible }: { visible: boolean }) {
  // overflow-hidden dibutuhkan saat animasi buka/tutup, tapi akan memotong dropdown.
  // Jadi overflow baru dilepas setelah animasi buka selesai.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!visible) {
      setSettled(false);
      return;
    }
    const t = setTimeout(() => setSettled(true), 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
        visible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className={settled ? "overflow-visible" : "overflow-hidden"}>
        <Container className="py-4">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex h-[52px] items-stretch rounded-lg border border-[#C9C9C9] bg-white p-1"
          >
            <LocationDropdown forceClose={!visible} />
            <label className="flex min-w-0 flex-1 items-center gap-2 px-3">
              <Search className="size-[18px] shrink-0 text-[#999]" />
              <input
                placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
                className="w-full min-w-0 bg-transparent text-base text-[#222] placeholder:text-[#9A9A9A] focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-[84px] shrink-0 rounded-md bg-[#1672E0] text-sm font-semibold uppercase text-white transition-colors hover:bg-[#0F5FC2]"
            >
              Cari
            </button>
          </form>
        </Container>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar mobile                                                             */
/* -------------------------------------------------------------------------- */
const drawerLink =
  "block py-[11px] text-sm font-semibold uppercase tracking-[0.04em] text-white hover:opacity-80";

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`fixed inset-0 z-[60] xl:hidden ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        aria-hidden
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        inert={!open}
        className={`absolute right-0 top-0 h-full w-[80vw] max-w-[320px] overflow-y-auto bg-[#0070FF] px-5 pb-10 text-white shadow-[-8px_0_24px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end pt-6">
          <button type="button" onClick={onClose} aria-label="Tutup menu" className="-mr-1 p-1 hover:opacity-80">
            <X className="size-7" />
          </button>
        </div>

        <div className="pb-5 pt-7">
          <a
            href="#"
            onClick={onClose}
            className="inline-block border border-white px-3 py-2 text-sm font-semibold uppercase tracking-[0.04em] hover:bg-white/10"
          >
            Unduh App Glints
          </a>
        </div>

        <div className="border-t border-white/80 py-2">
          <a href="#" onClick={onClose} className={drawerLink}>Masuk</a>
          <Link href="/daftar" onClick={onClose} className={drawerLink}>Daftar</Link>
        </div>

        <div className="border-t border-white/80 py-2">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={onClose} className={drawerLink}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="border-t border-white/80 py-2">
          <a href="#" onClick={onClose} className={`${drawerLink} flex items-center gap-2`}>
            Untuk Perusahaan <ArrowRight className="size-4" />
          </a>
          <button type="button" className="flex items-center gap-2 py-[11px] text-sm font-semibold">
            <Globe className="size-4" /> Indonesian <ChevronDown className="size-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */
export function Navbar({ stickySearch = false }: { stickySearch?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Munculkan baris pencarian setelah kolom cari hero keluar dari layar (ke atas).
  useEffect(() => {
    if (!stickySearch) return;
    const target = document.getElementById(HERO_SEARCH_ID);
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setShowSearch(!entry.isIntersecting && entry.boundingClientRect.bottom < NAVBAR_HEIGHT * 2);
      },
      { rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px` }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [stickySearch]);

  // Sidebar: kunci scroll body + tutup dengan Escape
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Pastikan sidebar tertutup saat layar dilebarkan ke desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        stickySearch && showSearch ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="border-b border-[#E5E5E5]">
        <Container className="flex h-[60px] items-center justify-between xl:h-[70px]">
          {/* Kiri: logo + menu utama */}
          <div className="flex items-center">
            <Link href="/" aria-label="Glints TapLoker" className="shrink-0">
              <Image
                src="/assets/logoNavbar.svg"
                alt="Glints TapLoker"
                width={104}
                height={38}
                priority
                className="h-8 w-auto xl:h-[38px]"
              />
            </Link>
            <nav className="ml-[30px] hidden items-center gap-[30px] text-[13px] font-medium uppercase text-black xl:flex">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className={UNDERLINE}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Kanan: desktop */}
          <div className="hidden items-center gap-[30px] text-[13px] font-medium uppercase text-black xl:flex">
            <DownloadButton />
            <LanguageMenu />
            <Link href="/daftar" className={UNDERLINE}>Daftar</Link>
            <a href="#" className={UNDERLINE}>Masuk</a>
            <a
              href="#"
              className="flex h-8 items-center gap-2 rounded-[2px] border-2 border-[#1672E0] px-3 text-[#1672E0] transition-colors hover:bg-[#E3EEFB]"
            >
              Untuk Perusahaan <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Kanan: mobile */}
          <div className="flex items-center gap-4 xl:hidden">
            <button type="button" aria-label="Pesan" className="p-1 text-black hover:text-[#1672E0]">
              <ChatFilledIcon className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="p-1 text-[#333] hover:text-[#1672E0]"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </Container>
      </div>

      {stickySearch && <StickySearchRow visible={showSearch} />}

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}