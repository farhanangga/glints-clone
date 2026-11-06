"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap";

function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function DaftarPage() {
  // TODO: ganti dengan akun Google hasil login (mis. next-auth / Google Identity Services)
  const googleAccount = {
    name: "Farhan",
    email: "farhanangga8900@gmail.com",
    avatar: "/images/avatar-placeholder.png",
  };

  return (
    <div
      className="min-h-screen bg-[#fafafa]"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_URL} />
      <Navbar />

      <main className="flex flex-col items-center px-4 pb-16 pt-[110px]">
        {/* Heading */}
        <h1 className="mb-[34px] max-w-[360px] text-center text-[30px] font-bold leading-[48px] text-black">
          Mari bergabung
          <br />
          dengan Glints
        </h1>

        {/* Card */}
        <div className="w-full max-w-[360px] bg-white">
          <div className="px-5 pb-0 pt-[28px]">
            {/* Tombol Google */}
            <button
              type="button"
              className="flex h-10 w-full items-center justify-between rounded-[4px] border border-[#dadce0] bg-white px-2.5 text-left transition-colors hover:bg-[#f8f9fa]"
              onClick={() => {
                // TODO: trigger Google sign-in
              }}
            >
              <span className="flex items-center gap-2">
                <span className="relative h-5 w-5 overflow-hidden rounded-full bg-[#c9a27e]">
                  <Image
                    src={googleAccount.avatar}
                    alt=""
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[12px] font-medium leading-[14px] text-[#3c4043]">
                    Sign in as {googleAccount.name}
                  </span>
                  <span className="mt-[2px] flex items-center gap-1 text-[11px] leading-[14px] text-[#5f6368]">
                    {googleAccount.email}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" stroke="#5f6368" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </span>
              <GoogleLogo />
            </button>

            <p className="mt-[22px] text-center text-[14px] leading-5 text-[#666]">atau</p>

            <div className="mt-[18px] text-center">
              <Link
                href="/daftar/email"
                className="text-[15px] leading-6 text-[#1a73e8] underline underline-offset-2 hover:text-[#0b57d0]"
              >
                Daftar dengan Email
              </Link>
            </div>

            {/* Ketentuan */}
            <div className="mt-[20px] bg-[#f5f7fa] px-3.5 py-3.5 text-[15px] leading-[22px] text-[#666]">
              Dengan mendaftar, saya setuju dengan{" "}
              <Link
                href="/ketentuan-layanan"
                className="text-[#1a6fb5] underline underline-offset-2 hover:text-[#0b57d0]"
              >
                Ketentuan Layanan
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-[28px] border-t border-[#dcdcdc]" />

          {/* Footer card */}
          <div className="px-[35px] pb-[32px] pt-[28px] text-[15px] text-[#666]">
            <div className="flex items-center justify-between">
              <span>Sudah punya akun Glints?</span>
              <Link
                href="/masuk"
                className="text-[#1a73e8] underline underline-offset-2 hover:text-[#0b57d0]"
              >
                Masuk
              </Link>
            </div>

            <p className="mt-[24px] leading-6">
              Untuk perusahaan, kunjungi{" "}
              <Link
                href="/perusahaan"
                className="text-[#1a6fb5] hover:underline"
              >
                laman
              </Link>{" "}
              berikut.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}