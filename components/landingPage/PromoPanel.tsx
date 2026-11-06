import Image from "next/image";

const PROMOS = [
  { top: "Cari loker untuk", hl: "Fresh Graduate", img: "/assets/landingPage/graduation.svg", border: true },
  { top: "Cari loker untuk", hl: "Paruh Waktu", img: "/assets/landingPage/pending-suitcase.svg", border: false },
];

export function PromoPanel() {
  return (
    <div className="grid min-h-[331px] grid-cols-[minmax(0,1fr)_140px] overflow-hidden rounded bg-gradient-to-br from-[#D5E7F9] to-[#EBF3FC] md:grid-cols-[minmax(0,1fr)_173px]">
      <div className="grid grid-rows-2">
        {PROMOS.map((b) => (
          <a
            key={b.hl}
            href="#"
            className={`group relative flex items-center pl-8 ${b.border ? "border-b-2 border-white" : ""}`}
          >
            <div className="z-10 text-base font-semibold leading-6 text-black">
              {b.top}
              <br />
              <span className="text-[#F5A800]">{b.hl}</span>
            </div>
            <div className="absolute bottom-0 right-4 top-0 w-[140px]">
              <Image src={b.img} alt="" fill sizes="140px" className="object-contain transition-transform group-hover:scale-105" />
            </div>
          </a>
        ))}
      </div>

      <a href="#" className="relative flex flex-col bg-white/80 p-3">
        <p className="text-base font-bold leading-[22px] text-black">Cepat Dapat Kerja dengan app Glints TapLoker!</p>
        <p className="mt-2 text-sm font-bold text-[#F5A800]">Unduh App Glints</p>
        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          <Image src="/assets/landingPage/mobile-id.png" alt="Aplikasi Glints TapLoker" fill sizes="173px" className="object-contain object-bottom" />
        </div>
      </a>
    </div>
  );
}
