import Image from "next/image";
import { Container } from "@/components/ui/Container";

const COLUMNS = [
  { title: "Untuk Pencari Kerja", links: ["Lokasi Pekerjaan", "Kategori Pekerjaan", "Perusahaan"] },
  { title: "Untuk Pemberi Kerja", links: ["Untuk Pemberi Kerja", "Pasang Lowongan", "Hubungi Kami"] },
  { title: "Perusahaan", links: ["Tentang Kami", "Hired Blog", "Inside Glints"] },
];

export function Footer() {
  return (
    <footer className="mt-[96px] bg-[#222]">
      <Container className="flex flex-wrap gap-x-[60px] gap-y-10 py-12 text-white">
        <Image src="/assets/logo.png" alt="Glints" width={104} height={104} className="h-auto w-[104px] self-start" />

        <div>
          <p className="text-[13px] font-semibold">Glints Asia Pacific</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["🇮🇩", "🇸🇬", "🇭🇰", "🇻🇳", "🇹🇼"].map((f) => (
              <span key={f} className="grid size-6 place-items-center rounded-full bg-white text-sm">{f}</span>
            ))}
          </div>
        </div>

        {COLUMNS.map((c) => (
          <div key={c.title}>
            <p className="text-[13px] text-[#A8A8A8]">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="text-[13px] font-semibold hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-[13px] font-semibold">Terdaftar dan diawasi oleh</p>
          <div className="mt-3 flex items-center gap-5 text-[11px] font-bold uppercase leading-tight">
            <span>Komdigi</span>
            <span>Kementerian Ketenagakerjaan<br />Republik Indonesia</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
