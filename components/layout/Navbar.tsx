"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Globe, MapPin, Menu, MessageSquare, Search, X } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Navbar Glints TapLoker.
 *
 * - `stickySearch` (khusus halaman utama): navbar menempel di atas, dan baris
 *   pencarian muncul di bawahnya setelah kolom cari di section hero (id="hero-search")
 *   hilang dari layar. Di halaman lain, jangan beri prop ini.
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

const LANGUAGES = ["Indonesian", "English"] as const;

/** Garis hitam di bawah teks yang melebar dari tengah ke kiri dan kanan saat hover/fokus. */
const UNDERLINE =
  "relative inline-flex items-center gap-1.5 py-1 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 " +
  "after:-translate-x-1/2 after:bg-black after:content-[''] after:transition-[width] after:duration-300 after:ease-out " +
  "hover:after:w-full focus-visible:after:w-full focus-visible:outline-none motion-reduce:after:transition-none";

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
        className={UNDERLINE}
      >
        <Globe className="size-4" />
        {lang}
        <ChevronDown className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-10 mt-3 w-40 overflow-hidden rounded border border-[#E5E5E5] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        >
          {LANGUAGES.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <button
                type="button"
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-[13px] font-medium normal-case hover:bg-[#F2F2F2] ${
                  l === lang ? "text-[#1672E0]" : "text-black"
                }`}
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
/* Baris pencarian yang muncul saat di-scroll                                 */
/* -------------------------------------------------------------------------- */
function StickySearchRow({ visible }: { visible: boolean }) {
  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
        visible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <Container className="py-4">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex h-[52px] items-stretch rounded-lg border border-[#C9C9C9] bg-white p-1"
          >
            <button
              type="button"
              className="hidden w-[232px] shrink-0 items-center gap-2 border-r border-[#DDD] px-3 text-base text-[#222] md:flex"
            >
              <MapPin className="size-[18px]" />
              <span className="flex-1 text-left">Semua Kota/Provinsi</span>
              <ChevronDown className="size-4 text-[#555]" />
            </button>
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
      className={`z-50 bg-white transition-shadow duration-300 ${
        stickySearch ? "sticky top-0" : "relative"
      } ${stickySearch && showSearch ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""}`}
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
            <button type="button" aria-label="Pesan" className="p-1 text-[#333] hover:text-[#1672E0]">
              <MessageSquare className="size-6" />
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