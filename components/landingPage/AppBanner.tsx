import Image from "next/image";

export function AppBanner() {
  return (
    <section className="pt-10 md:pt-[96px]">
      <div className="mx-auto w-full max-w-[1120px] md:px-6 min-[1168px]:px-0">
        <div
          className="relative overflow-hidden bg-gradient-to-b from-[#FFE9A9] to-[#FFC53A]
                     md:rounded-lg md:bg-[#FFD24D] md:bg-[url('/assets/landingPage/yellow-bg-phone.jfif')] md:bg-cover md:bg-[position:right_center]"
        >
          {/* ===== Mobile ===== */}
          <div className="md:hidden">
            <div className="flex flex-col items-center px-6 pt-[34px] text-center">
              <h2 className="text-[22px] font-bold leading-[29px] text-[#2B2B2B]">
                Lamar Kerja Lebih Mudah,
                <br />
                Dapat Kabar Lebih Cepat
              </h2>
              <p className="mt-2 text-[13px] font-bold text-[#E8352B]">#CepatDapatKerja</p>
              <a
                href="#"
                className="mt-[22px] inline-flex h-10 items-center justify-center rounded-[3px] bg-[#0A8FFF] px-5 text-sm font-semibold text-white shadow-[4px_4px_0_#0B63C5] transition-colors hover:bg-[#0A82E6]"
              >
                Download Glints Sekarang
              </a>
            </div>

            {/* Gambar khusus mobile */}
            <Image
              src="/assets/landingPage/yellow-bg-phone-mobile.png"
              alt="Tampilan aplikasi Glints TapLoker"
              width={0}
              height={0}
              sizes="100vw"
              priority={false}
              className="mx-auto mt-6 block h-auto w-full max-w-[480px]"
            />
          </div>

          {/* ===== Desktop ===== */}
          <div className="relative z-10 hidden min-h-[464px] flex-col justify-center px-[85px] py-10 md:flex">
            <h2 className="max-w-[460px] text-[32px] font-bold leading-[1.3] text-[#2B2B2B]">
              Lamar Kerja Lebih Mudah, Dapat Kabar Lebih Cepat
            </h2>
            <p className="mt-3 text-base font-bold text-[#D97E00]">#CepatDapatKerja</p>

            <div className="mt-8 flex items-center gap-5">
              <div className="relative size-[168px] shrink-0 border-2 border-[#1672E0] bg-white p-2 shadow-[6px_6px_0_#1672E0]">
                <Image
                  src="/assets/qrCode.jpg"
                  alt="QR code unduh aplikasi Glints TapLoker"
                  fill
                  sizes="168px"
                  className="object-contain p-2"
                />
              </div>
              <span className="bg-[#1672E0] px-5 py-3 text-sm font-medium uppercase text-white shadow-[4px_4px_0_#0B4FA8]">
                Scan untuk mengunduh
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}