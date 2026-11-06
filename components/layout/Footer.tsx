import Image from "next/image";
import { Container } from "@/components/ui/Container";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const COLUMNS = [
  {
    title: "Untuk Pencari Kerja",
    links: [
      "Lokasi Pekerjaan",
      "Nama Perusahaan",
      "Kategori Pekerjaan",
      "Lowongan Kerja Populer",
      "Help Center",
    ],
  },
  {
    title: "Untuk Pemberi Kerja",
    links: ["Untuk Pemberi Kerja", "HR Tips", "Glints Platform", "Post a Job", "Bakat Terkelola"],
  },
  {
    title: "Perusahaan",
    links: [
      "Tentang Kami",
      "Hired Blog",
      "Inside Glints",
      "Tech Blog",
      "Careers",
      "Report Vulnerability",
      "Apprentice Program",
      "Perjanjian Pengguna",
      "Kebijakan Privasi",
      "Syarat dan Ketentuan Layanan",
    ],
  },
];

// kode negara untuk bendera (id, sg, my, vn, cn, hk)
const FLAGS = ["sg", "id", "my", "vn", "cn", "hk"];

const SOCIALS = [
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/glintsindonesia" },
  { label: "X", icon: FaXTwitter, href: "https://x.com/glintsindonesia" },
  { label: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/glintsindonesia" },
  { label: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/company/glints" },
  { label: "Email", icon: MdOutlineMail, href: "mailto:hello@glints.com" },
  { label: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@glintsindonesia" },
];

export function Footer() {
  return (
    <footer className="relative mt-[96px] overflow-hidden bg-[#222] text-white">
      {/* Background image + overlay gelap */}
      <Image
        src="/assets/bg-footer.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden />

      <Container className="relative z-10 py-10 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-x-10">
          {/* ===== Kolom kiri: logo + deskripsi ===== */}
          <div className="flex flex-col items-center gap-8 lg:w-[190px] lg:shrink-0 lg:items-start lg:gap-6">
            <Image
              src="/assets/logoFooter.svg"
              alt="Glints TapLoker"
              width={104}
              height={104}
              className="h-auto w-[104px] lg:w-[90px]"
            />

            <div className="flex w-full flex-col gap-3">
              <p className="text-[13px] font-bold tracking-wide">Glints Asia Pacific</p>
              <div className="flex flex-wrap gap-2 lg:w-[110px]">
                {FLAGS.map((code) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={code}
                    src={`https://flagcdn.com/w40/${code}.png`}
                    alt={code.toUpperCase()}
                    className="size-5 rounded-full object-cover"
                  />
                ))}
              </div>
              <p className="text-[13px] font-semibold leading-[1.6] tracking-wide">
                Secara resmi diluncurkan pada tahun 2015 di Singapura, Glints telah
                memberdayakan lebih dari 5 juta bakat dan 60.000 organisasi untuk
                mewujudkan potensi manusia mereka.
              </p>
            </div>

            {/* Regulator: tampil di mobile saja pada posisi ini */}
            <div className="flex w-full flex-col gap-3 lg:hidden">
              <p className="text-[13px] font-bold tracking-wide">Terdaftar dan diawasi oleh</p>
              <Regulators />
            </div>
          </div>

          {/* ===== Mobile: tagline + Google Play ===== */}
          <div className="flex flex-col gap-3 lg:hidden">
            <Tagline />
            <p className="text-[13px] font-bold tracking-wide">Dapatkan Aplikasi Glints TapLoker</p>
            <a href="#" className="w-fit">
              <Image
                src="/assets/google-play-badge-id.png"
                alt="Dapatkan di Google Play"
                width={170}
                height={50}
                className="h-auto w-[170px]"
              />
            </a>
          </div>

          {/* ===== Kolom link ===== */}
          <div className="flex flex-col gap-5 px-5 lg:contents lg:px-0">
            {COLUMNS.map((c) => (
              <nav key={c.title} className="lg:w-[150px] lg:shrink-0">
                <p className="text-[14px] font-semibold tracking-wide text-[#A8A8A8] lg:text-[15px]">
                  {c.title}
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 lg:mt-4 lg:grid-cols-1 lg:gap-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[13px] font-semibold leading-snug tracking-wide hover:underline"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ===== Kolom kanan (desktop) ===== */}
          <div className="hidden flex-1 flex-col gap-4 lg:flex">
            <p className="text-[13px] font-bold tracking-wide">Terdaftar dan diawasi oleh</p>
            <Regulators />
            <Tagline />
            <p className="text-[13px] font-bold tracking-wide">Dapatkan Aplikasi Glints TapLoker</p>
            <div className="flex items-start gap-4">
              <Image
                src="/assets/qrCode.jpg"
                alt="QR Code aplikasi Glints TapLoker"
                width={128}
                height={128}
                className="size-[128px] rounded-sm bg-white"
              />
              <div className="flex flex-col gap-3">
                <a href="#">
                  <Image
                    src="/assets/google-play-badge-id.png"
                    alt="Dapatkan di Google Play"
                    width={180}
                    height={54}
                    className="h-auto w-[180px]"
                  />
                </a>
                <a href="#">
                  <Image
                    src="/assets/apple-store-badge-id.png"
                    alt="Download di App Store"
                    width={180}
                    height={54}
                    className="h-auto w-[180px]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Sosial media + copyright ===== */}
        <div className="mt-10 flex flex-col items-center gap-4 lg:mt-8 lg:items-start">
          <ul className="flex items-center gap-5 lg:gap-6">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-white transition-colors hover:text-[#2B9FFF]"
                >
                  <Icon className="size-6" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[12px] font-bold tracking-wide">
            © 2026 &nbsp;PT Glints Platform Talenta
          </p>
        </div>
      </Container>
    </footer>
  );
}

function Regulators() {
  return (
    <div className="flex items-center justify-between gap-5 lg:justify-start">
      <Image
        src="/assets/komdigi.png"
        alt="Komdigi"
        width={80}
        height={44}
        className="h-auto w-[72px] lg:w-[80px]"
      />
      <Image
        src="/assets/kementerian2.png"
        alt="Kementerian Ketenagakerjaan Republik Indonesia"
        width={150}
        height={50}
        className="h-auto w-[140px] lg:w-[150px]"
      />
    </div>
  );
}

function Tagline() {
  return (
    <p className="text-[14px] tracking-wide">
      <span className="font-bold text-[#FFC107]">#CepatDapatKerja</span>{" "}
      <span className="font-semibold">dengan Glints TapLoker</span>
    </p>
  );
}