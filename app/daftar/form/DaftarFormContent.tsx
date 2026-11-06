"use client";

import { FormEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { LOCATIONS } from "@/lib/data";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap";

/* -------------------------------------------------------------------------- */
/* Tipe & data awal                                                           */
/* -------------------------------------------------------------------------- */
type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "location"
  | "whatsapp";

type FieldErrors = Partial<Record<FieldName, string>>;

type ToastData = { id: number; text: string };

const FIELD_ORDER: FieldName[] = [
  "firstName",
  "lastName",
  "email",
  "password",
  "location",
  "whatsapp",
];

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  countryCode: "+62", // kode negara nomor WhatsApp
  whatsapp: "",
  subscribe: true, // di desain, checkbox sudah tercentang
};

/* -------------------------------------------------------------------------- */
/* Kode negara (sama seperti di Glints)                                       */
/* -------------------------------------------------------------------------- */
const COUNTRY_CODES = [
  { code: "+62", name: "Indonesia" },
  { code: "+60", name: "Malaysia" },
  { code: "+65", name: "Singapore" },
  { code: "+886", name: "Taiwan" },
];

/* -------------------------------------------------------------------------- */
/* Kata sandi: 5 kriteria = 5 bar                                              */
/* -------------------------------------------------------------------------- */
const PASSWORD_RULES = [
  { label: "Minimal 8 karakter", test: (v: string) => v.length >= 8 },
  { label: "Huruf kecil", test: (v: string) => /[a-z]/.test(v) },
  { label: "Huruf besar", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Angka", test: (v: string) => /\d/.test(v) },
  { label: "Simbol", test: (v: string) => /[^A-Za-z0-9\s]/.test(v) },
];

// Warna bar menurut jumlah kriteria yang terpenuhi (1..5)
const STRENGTH_COLORS = ["#e5252d", "#f08c1b", "#f5b800", "#8bc34a", "#2e9e5b"];

const passwordScore = (v: string) => PASSWORD_RULES.filter((r) => r.test(v)).length;

/* -------------------------------------------------------------------------- */
/* Validasi (pesan mengikuti Glints; aturan sama dengan app/api/route.ts)      */
/* -------------------------------------------------------------------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(name: FieldName, raw: string): string | undefined {
  const v = name === "password" ? raw : raw.trim();

  if (name === "firstName") {
    if (!v) return "Nama depan wajib diisi";
    if (v.length > 50) return "Nama depan maksimal 50 karakter";
  }
  if (name === "lastName") {
    if (!v) return "Nama belakang wajib diisi";
    if (v.length > 50) return "Nama belakang maksimal 50 karakter";
  }
  if (name === "email") {
    if (!v) return "Alamat email wajib diisi";
    if (!EMAIL_RE.test(v)) return "Format email tidak valid";
  }
  if (name === "password") {
    if (!v) return "Kata sandi wajib diisi";
    if (passwordScore(v) < PASSWORD_RULES.length) return "Kata sandi belum memenuhi semua kriteria";
  }
  if (name === "location") {
    if (!v) return "Lokasi kamu wajib diisi";
  }
  if (name === "whatsapp") {
    const digits = v.replace(/[\s-]/g, "").replace(/^0+/, "");
    if (!digits) return "Nomor WhatsApp wajib diisi";
    if (!/^\d{9,13}$/.test(digits)) return "Nomor WhatsApp harus 9-13 digit angka (tanpa kode negara)";
  }
  return undefined;
}

/* -------------------------------------------------------------------------- */
/* Class helper                                                               */
/* -------------------------------------------------------------------------- */
// Input teks: border 1px abu -> hover lebih gelap -> fokus hitam 2px -> error merah 2px.
// Ketebalan 2px dibuat dengan inset shadow supaya ukuran kolom tidak bergeser.
const INPUT_BASE =
  "h-[46px] w-full rounded-none border bg-white px-[14px] text-[15px] text-[#333] outline-none transition-colors placeholder:text-transparent";

const fieldState = (err: boolean) =>
  err
    ? "border-[#e5252d] shadow-[inset_0_0_0_1px_#e5252d] focus:border-black focus:shadow-[inset_0_0_0_1px_#000]"
    : "border-[#cfcfcf] hover:border-[#8c8c8c] focus:border-black focus:shadow-[inset_0_0_0_1px_#000]";

// Label mengambang: di dalam kolom saat kosong, naik ke garis border saat fokus / terisi.
// Wajib berpasangan dengan <input className="peer" placeholder=" " /> tepat sebelum label.
const LABEL_BASE =
  "pointer-events-none absolute left-[14px] top-1/2 z-[1] -translate-y-1/2 bg-white text-[15px] leading-none text-[#6f6f6f] transition-all duration-150 " +
  "peer-focus:left-[10px] peer-focus:top-0 peer-focus:px-1 peer-focus:text-[11px] peer-focus:text-black " +
  "peer-[:not(:placeholder-shown)]:left-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-[11px]";

/* -------------------------------------------------------------------------- */
/* Ikon & potongan kecil                                                      */
/* -------------------------------------------------------------------------- */
function ChevronDown({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
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

function CheckIcon({ size = 16, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12.5l5 5L20 6.5"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Tanda seru merah di kanan kolom yang error
function ErrorMark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[22px] font-bold leading-none text-[#e5252d]"
    >
      !
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[14px] leading-[18px] text-[#e5252d]">{message}</p>;
}

// 5 bar kecil bertumpuk, terisi dari bawah ke atas.
// Jika kelima kriteria terpenuhi, ikon centang (warna sama dengan bar) muncul di sebelah kirinya.
function StrengthBars({ score }: { score: number }) {
  const color = score > 0 ? STRENGTH_COLORS[score - 1] : "#dcdcdc";
  const complete = score === PASSWORD_RULES.length;
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
      <span
        aria-hidden="true"
        className={`flex transition-all duration-200 ${
          complete ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <CheckIcon color={color} />
      </span>
      <div
        role="img"
        aria-label={`Kekuatan kata sandi ${score} dari ${PASSWORD_RULES.length}`}
        className="flex flex-col gap-[3px]"
      >
        {[5, 4, 3, 2, 1].map((level) => (
          <span
            key={level}
            className="block h-[3px] w-[14px] transition-colors duration-150"
            style={{ backgroundColor: score >= level ? color : "#dcdcdc" }}
          />
        ))}
      </div>
    </div>
  );
}

// Notifikasi di kanan atas: masuk dari kanan, hilang otomatis setelah 5 detik
function Toast({ text, onClose }: { text: string; onClose: () => void }) {
  const [shown, setShown] = useState(false);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const enter = setTimeout(() => setShown(true), 20);
    const leave = setTimeout(() => setShown(false), 4700);
    const done = setTimeout(() => closeRef.current(), 5000);
    return () => {
      clearTimeout(enter);
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, []);

  function dismiss() {
    setShown(false);
    setTimeout(() => closeRef.current(), 300);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-4 top-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] border-l-4 border-[#2e9e5b] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ${
        shown ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 py-3.5 pl-4 pr-3">
        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#2e9e5b]">
          <CheckIcon size={14} color="#fff" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold leading-5 text-black">Akun berhasil dibuat</p>
          <p className="mt-0.5 text-[13px] leading-[18px] text-[#555]">{text}</p>
          <Link
            href="/daftar/cekData"
            className="mt-1.5 inline-block text-[13px] font-semibold text-[#0079b6] hover:underline"
          >
            Lihat data pendaftar
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Tutup notifikasi"
          className="flex h-6 w-6 flex-none items-center justify-center text-[#888] hover:text-black"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Kolom teks dengan label mengambang                                         */
/* -------------------------------------------------------------------------- */
type TextFieldProps = {
  name: FieldName;
  label: string;
  type?: string;
  value: string;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
  adornment?: ReactNode;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

function TextField({
  name,
  label,
  type = "text",
  value,
  error,
  autoComplete,
  maxLength,
  adornment,
  onChange,
  onFocus,
  onBlur,
}: TextFieldProps) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder=" "
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-invalid={!!error}
        className={`peer ${INPUT_BASE} ${fieldState(!!error)} ${adornment ? "pr-[72px]" : error ? "pr-12" : ""}`}
      />
      <label
        htmlFor={name}
        className={`${LABEL_BASE} ${error ? "peer-[:not(:placeholder-shown)]:text-[#e5252d]" : ""}`}
      >
        {label}
      </label>
      {adornment ?? (error ? <ErrorMark /> : null)}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lokasi: combobox yang bisa diketik + dropdown kustom                       */
/* -------------------------------------------------------------------------- */
type LocationFieldProps = {
  value: string;
  error?: string;
  onSelect: (value: string) => void;
  onBlur: () => void;
};

function LocationField({ value, error, onSelect, onBlur }: LocationFieldProps) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const byKeyboard = useRef(false); // scroll otomatis hanya untuk keyboard / saat dibuka

  const q = query.trim().toLowerCase();
  const options = typing && q ? LOCATIONS.filter((l) => l.toLowerCase().includes(q)) : LOCATIONS;

  // Jaga item yang di-highlight tetap terlihat di dalam daftar
  useEffect(() => {
    if (!open || !byKeyboard.current) return;
    const list = listRef.current;
    const el = list?.children[highlight] as HTMLElement | undefined;
    if (!list || !el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, highlight]);

  function openList() {
    if (open) return;
    byKeyboard.current = true;
    setHighlight(LOCATIONS.indexOf(value));
    setOpen(true);
  }

  function closeList() {
    setOpen(false);
    setTyping(false);
    setQuery("");
  }

  function select(loc: string) {
    onSelect(loc);
    closeList();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openList();
      byKeyboard.current = true;
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openList();
      byKeyboard.current = true;
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (open) {
        e.preventDefault(); // jangan submit form saat memilih opsi
        if (options[highlight]) select(options[highlight]);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        closeList();
      }
    }
  }

  return (
    <div
      className="relative"
      onBlur={(e) => {
        // tutup hanya jika fokus benar-benar keluar dari kolom + daftar
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          closeList();
          onBlur();
        }
      }}
    >
      <input
        id="location"
        name="location"
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls="location-list"
        aria-autocomplete="list"
        aria-invalid={!!error}
        autoComplete="off"
        spellCheck={false}
        placeholder=" "
        value={typing ? query : value}
        onChange={(e) => {
          byKeyboard.current = true;
          setQuery(e.target.value);
          setTyping(true);
          setHighlight(0);
          setOpen(true);
        }}
        onFocus={(e) => {
          e.currentTarget.select();
          openList();
        }}
        onClick={openList}
        onKeyDown={handleKeyDown}
        className={`peer h-[53px] w-full rounded-none border-2 bg-white pl-5 pr-11 text-[16px] text-[#333] text-ellipsis outline-none transition-colors placeholder:text-transparent focus:border-[#0079b6] ${
          error ? "border-[#e5252d]" : "border-[#757575] hover:border-[#4d4d4d]"
        }`}
      />
      <label
        htmlFor="location"
        className={`${LABEL_BASE} !left-[22px] !text-[16px] peer-focus:!left-[10px] peer-focus:!text-[11px] peer-focus:!text-[#0079b6] peer-[:not(:placeholder-shown)]:!left-[10px] peer-[:not(:placeholder-shown)]:!text-[11px] ${
          error ? "peer-[:not(:placeholder-shown)]:!text-[#e5252d]" : ""
        }`}
      >
        Masukkan lokasimu (Kota &amp; Provinsi)
      </label>

      <ChevronDown
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#4a4a4a] transition-transform duration-150 ${
          open ? "rotate-180" : ""
        }`}
      />

      {open && (
        <ul
          id="location-list"
          ref={listRef}
          role="listbox"
          aria-label="Daftar lokasi"
          onMouseDown={(e) => e.preventDefault()} // jaga fokus tetap di input saat klik / geser scrollbar
          className="absolute left-0 right-0 top-full z-30 max-h-[200px] overflow-y-auto border border-t-0 border-[#cfcfcf] bg-white shadow-[0_6px_12px_rgba(0,0,0,0.12)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c1c1c1] [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar]:w-[10px]"
        >
          {options.length === 0 ? (
            <li className="px-[15px] py-2 text-[15px] leading-5 text-[#888]">
              Lokasi tidak ditemukan
            </li>
          ) : (
            options.map((loc, i) => (
              <li
                key={loc}
                role="option"
                aria-selected={loc === value}
                onMouseEnter={() => {
                  byKeyboard.current = false;
                  setHighlight(i);
                }}
                onClick={() => select(loc)}
                className={`cursor-pointer px-[15px] py-2 text-[15px] leading-5 ${
                  i === highlight ? "bg-[#f2f2f2] text-[#0079b6]" : "text-[#222]"
                }`}
              >
                {loc}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Kode negara: tombol "+62 v" + dropdown selebar kolom WhatsApp              */
/* -------------------------------------------------------------------------- */
// Komponen ini sengaja TIDAK `relative`, jadi daftar (absolute) menempel pada
// pembungkus kolom WhatsApp di luarnya dan lebarnya sama persis dengan kolom itu.
type CountryCodeSelectProps = {
  value: string;
  onChange: (code: string) => void;
  onOpenChange?: (open: boolean) => void;
};

function CountryCodeSelect({ value, onChange, onOpenChange }: CountryCodeSelectProps) {
  const [open, setOpenState] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const byKeyboard = useRef(false);

  function setOpen(next: boolean) {
    setOpenState(next);
    onOpenChange?.(next);
  }

  function openList() {
    byKeyboard.current = true;
    setHighlight(Math.max(0, COUNTRY_CODES.findIndex((c) => c.code === value)));
    setOpen(true);
  }

  function select(code: string) {
    onChange(code);
    setOpen(false);
    // pindahkan fokus ke kolom nomor agar bisa langsung mengetik
    document.getElementById("whatsapp")?.focus();
  }

  // Tutup saat klik di luar
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenState(false);
        onOpenChange?.(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onOpenChange]);

  // Jaga item yang di-highlight tetap terlihat
  useEffect(() => {
    if (!open || !byKeyboard.current) return;
    const list = listRef.current;
    const el = list?.children[highlight] as HTMLElement | undefined;
    if (!list || !el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, highlight]);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openList();
      byKeyboard.current = true;
      setHighlight((h) => Math.min(h + 1, COUNTRY_CODES.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openList();
      byKeyboard.current = true;
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // jangan submit form
      if (!open) return openList();
      if (COUNTRY_CODES[highlight]) select(COUNTRY_CODES[highlight].code);
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    } else if (e.key === "Tab") {
      if (open) setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="h-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="country-code-list"
        aria-label={`Kode negara ${value}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className="flex h-full w-[82px] cursor-pointer select-none items-center gap-1.5 whitespace-nowrap bg-transparent pl-3 pr-2.5 text-base text-[#111] outline-none"
      >
        <span>{value}</span>
        <ChevronDown
          size={18}
          className={`flex-none transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id="country-code-list"
          ref={listRef}
          role="listbox"
          aria-label="Kode negara"
          onMouseDown={(e) => e.preventDefault()} // jaga fokus tetap di tombol saat klik
          className="absolute -left-0.5 -right-0.5 top-[calc(100%+6px)] z-30 max-h-[200px] overflow-y-auto border border-[#cfcfcf] bg-white shadow-[0_6px_12px_rgba(0,0,0,0.12)]"
        >
          {COUNTRY_CODES.map((c, i) => {
            const active = i === highlight;
            return (
              <li
                key={c.code}
                role="option"
                aria-selected={c.code === value}
                title={c.name} // tooltip bawaan browser, seperti di Glints
                onMouseEnter={() => {
                  byKeyboard.current = false;
                  setHighlight(i);
                }}
                onClick={() => select(c.code)}
                className={`flex h-[38px] cursor-pointer items-center px-2 text-base leading-5 ${
                  active ? "bg-[#f2f2f2]" : "bg-white"
                }`}
              >
                <span className={`w-[48px] flex-none ${active ? "text-[#0079b6]" : "text-[#111]"}`}>
                  {c.code}
                </span>
                <span className={`ml-[10px] ${active ? "text-[#0079b6]" : "text-[#555]"}`}>
                  {c.name}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Halaman                                                                    */
/* -------------------------------------------------------------------------- */
export function DaftarFormContent() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [alert, setAlert] = useState<string | null>(null); // pesan error dari server / jaringan
  const [toast, setToast] = useState<ToastData | null>(null); // notifikasi sukses
  const [loading, setLoading] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false); // dropdown kode negara sedang terbuka

  const score = passwordScore(form.password);

  // Ubah nilai kolom. Jika kolom sedang error, cek ulang langsung agar merahnya hilang saat sudah benar.
  function setField(name: FieldName, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: validate(name, value) } : e));
  }

  // Kolom ditinggalkan: kosong / tidak valid -> merah
  function blurValidate(name: FieldName) {
    setErrors((e) => ({ ...e, [name]: validate(name, form[name]) }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const formEl = e.currentTarget;
    setAlert(null);

    const found: FieldErrors = {};
    for (const name of FIELD_ORDER) {
      const msg = validate(name, form[name]);
      if (msg) found[name] = msg;
    }

    if (Object.keys(found).length > 0) {
      setErrors(found);
      const first = FIELD_ORDER.find((n) => found[n]);
      if (first) (formEl.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? {});
        setAlert(data.message ?? "Pendaftaran gagal. Coba lagi.");
        return;
      }

      setToast({ id: Date.now(), text: data.message });
      setForm(INITIAL);
    } catch {
      setAlert("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <link rel="stylesheet" href={FONT_URL} />
      <Navbar />

      {toast && (
        <Toast
          key={toast.id}
          text={toast.text}
          onClose={() => setToast((t) => (t?.id === toast.id ? null : t))}
        />
      )}

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
                className="mb-6 border border-[#f5c2be] bg-[#fdecea] px-4 py-3 text-sm leading-[1.4] text-[#b3261e]"
              >
                {alert}
              </div>
            )}

            <div className="grid grid-cols-1 items-start gap-x-7 gap-y-[22px] md:grid-cols-2 md:gap-y-[33px]">
              {/* Nama depan */}
              <div className="flex min-w-0 flex-col">
                <TextField
                  name="firstName"
                  label="Nama depan"
                  autoComplete="given-name"
                  maxLength={50}
                  value={form.firstName}
                  error={errors.firstName}
                  onChange={(v) => setField("firstName", v)}
                  onBlur={() => blurValidate("firstName")}
                />
                <FieldError message={errors.firstName} />
              </div>

              {/* Nama belakang */}
              <div className="flex min-w-0 flex-col">
                <TextField
                  name="lastName"
                  label="Nama Belakang"
                  autoComplete="family-name"
                  maxLength={50}
                  value={form.lastName}
                  error={errors.lastName}
                  onChange={(v) => setField("lastName", v)}
                  onBlur={() => blurValidate("lastName")}
                />
                <FieldError message={errors.lastName} />
              </div>

              {/* Email */}
              <div className="flex min-w-0 flex-col">
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => setField("email", v)}
                  onBlur={() => blurValidate("email")}
                />
                <FieldError message={errors.email} />
              </div>

              {/* Kata sandi */}
              <div className="flex min-w-0 flex-col">
                <TextField
                  name="password"
                  label="Buat kata sandi"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  error={errors.password}
                  adornment={<StrengthBars score={score} />}
                  onChange={(v) => setField("password", v)}
                  onBlur={() => blurValidate("password")}
                />
                <FieldError message={errors.password} />
              </div>

              {/* Lokasi */}
              <div className="flex min-w-0 flex-col">
                <LocationField
                  value={form.location}
                  error={errors.location}
                  onSelect={(v) => setField("location", v)}
                  onBlur={() => blurValidate("location")}
                />
                <FieldError message={errors.location} />
              </div>

              {/* WhatsApp */}
              <div className="flex min-w-0 flex-col">
                <div
                  className={`relative flex h-[47px] items-center border-2 bg-white transition-colors ${
                    phoneFocus || codeOpen
                      ? "border-black"
                      : errors.whatsapp
                        ? "border-[#e5252d]"
                        : "border-[#d0d0d0] hover:border-[#8c8c8c]"
                  }`}
                >
                  {/* Dropdown kode negara */}
                  <CountryCodeSelect
                    value={form.countryCode}
                    onChange={(code) => setForm((f) => ({ ...f, countryCode: code }))}
                    onOpenChange={setCodeOpen}
                  />
                  <span aria-hidden="true" className="h-5 w-px flex-none bg-[#c4c4c4]" />
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    placeholder=" "
                    autoComplete="tel-national"
                    value={form.whatsapp}
                    onChange={(e) => setField("whatsapp", e.target.value.replace(/[^\d\s-]/g, ""))}
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => {
                      setPhoneFocus(false);
                      blurValidate("whatsapp");
                    }}
                    aria-invalid={!!errors.whatsapp}
                    className={`peer h-full min-w-0 flex-1 border-0 bg-transparent px-[14px] text-[17px] text-[#333] outline-none placeholder:text-transparent ${
                      errors.whatsapp ? "pr-10" : ""
                    }`}
                  />
                  <label
                    htmlFor="whatsapp"
                    className="pointer-events-none absolute left-[97px] top-1/2 z-[1] -translate-y-1/2 bg-white text-[17px] leading-none text-[#777] transition-all duration-150 peer-focus:left-[10px] peer-focus:top-0 peer-focus:px-1 peer-focus:text-[11px] peer-focus:text-black peer-[:not(:placeholder-shown)]:left-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-[11px]"
                  >
                    Nomor WhatsApp
                  </label>
                  {errors.whatsapp && <ErrorMark />}
                </div>
                <FieldError message={errors.whatsapp} />

                <div className="mt-4 flex min-h-[70px] items-center gap-3.5 bg-[#f0f8ff] px-[18px] text-[14.5px] leading-[19px] text-[#111]">
                  <Image
                    src="/assets/icon-wa.png"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                    className="flex-none"
                  />
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
                  onChange={(e) => setForm((f) => ({ ...f, subscribe: e.target.checked }))}
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