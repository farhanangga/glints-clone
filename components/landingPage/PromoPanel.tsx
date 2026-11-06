import Image from "next/image";

const PROMOS = [
  {
    top: "Cari loker untuk",
    hl: "Fresh Graduate",
    img: "/assets/landingPage/graduation.svg",
    // desktop: ikon sengaja terpotong di tepi kanan-bawah box
    desktopPos: "md:-right-8 md:-bottom-6",
  },
  {
    top: "Cari loker untuk",
    hl: "Paruh Waktu",
    img: "/assets/landingPage/pending-suitcase.svg",
    desktopPos: "md:-right-4 md:-bottom-8",
  },
];

// Overlay gelap tipis saat hover (dipakai di ketiga kotak)
const hoverOverlay =
  "pointer-events-none absolute inset-0 z-20 bg-black/0 transition-colors duration-200 group-hover:bg-black/[0.06]";

export function PromoPanel() {
  return (
    <div className="grid gap-1 md:min-h-[331px] md:grid-cols-[minmax(0,1fr)_173px]">
      {/* Kiri: 2 promo (mobile & desktop) */}
      <div className="grid gap-[2px] overflow-hidden rounded md:grid-rows-2">
        {PROMOS.map((b) => (
          <a
            key={b.hl}
            href="#"
            className="group relative flex h-[77px] items-center overflow-hidden bg-[linear-gradient(90deg,#DCEBFA_70%,#2596be_100%)] pl-5 md:h-auto md:pl-8"          >
            <div className="relative z-10 text-sm font-semibold leading-5 text-black md:text-base md:leading-6">
              {b.top}
              <br />
              <span className="text-[#F5A800]">{b.hl}</span>
            </div>

            {/* Mobile: ikon utuh & kecil. Desktop: lebih besar dan terpotong */}
            <div
              className={`absolute right-3 top-1/2 size-[60px] -translate-y-1/2 md:top-auto md:size-[200px] md:translate-y-0 ${b.desktopPos}`}
            >
              <Image
                src={b.img}
                alt=""
                fill
                sizes="(min-width: 768px) 200px, 60px"
                className="object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>

            <span className={hoverOverlay} />
          </a>
        ))}
      </div>

      {/* Kanan: panel app, hanya di desktop */}
      <a
        href="#"
        className="group relative hidden flex-col overflow-hidden rounded bg-gradient-to-b from-[#e6f4fa] to-[#EBF3FC] p-3 md:flex"
      >
        <p className="relative z-10 text-base font-bold leading-[22px] text-black">
          Cepat Dapat Kerja dengan app Glints TapLoker!
        </p>
        <p className="relative z-10 mt-2 text-sm font-bold text-[#F5A800]">Unduh App Glints</p>
        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          <Image
            src="/assets/landingPage/mobile-id.png"
            alt="Aplikasi Glints TapLoker"
            fill
            sizes="173px"
            className="object-contain object-bottom"
          />
        </div>
        <span className={hoverOverlay} />
      </a>
    </div>
  );
}