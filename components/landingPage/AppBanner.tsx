import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function AppBanner() {
  return (
    <section className="pt-[96px]">
      <Container>
        <div
          className="relative overflow-hidden rounded-lg bg-[#FFD24D]"
          style={{
            backgroundImage: "url('/assets/landingPage/yellow-bg-phone.jfif')",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        >
          <div className="relative z-10 flex min-h-[464px] flex-col justify-center px-6 py-10 md:px-[85px]">
            <h2 className="max-w-[460px] text-[28px] font-bold leading-[1.3] text-[#2B2B2B] md:text-[32px]">
              Lamar Kerja Lebih Mudah, Dapat Kabar Lebih Cepat
            </h2>
            <p className="mt-3 text-base font-bold text-[#D97E00]">#CepatDapatKerja</p>

            <div className="mt-8 flex items-center gap-5">
              <div className="relative size-[168px] shrink-0 border-2 border-[#1672E0] bg-white p-2 shadow-[6px_6px_0_#1672E0]">
                <Image src="/assets/qrCode.jpg" alt="QR code unduh aplikasi Glints TapLoker" fill sizes="168px" className="object-contain p-2" />
              </div>
              <span className="bg-[#1672E0] px-5 py-3 text-sm font-medium uppercase text-white shadow-[4px_4px_0_#0B4FA8]">
                Scan untuk mengunduh
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
