"use client";

import { ChevronDown, MapPin, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";

export function Hero() {
  const { payload, loading, error } = useApi<{ data: string[] }>("/api?section=popular-tags");

  return (
    <section className="bg-gradient-to-b from-[#CFE3F8] via-[#E9F2FC] to-white pb-3 pt-9">
      <Container>
        <h1 className="text-center text-[28px] font-bold leading-[1.3] text-black md:text-[36px]">
          Temukan 100.000+ Loker Terbaru di Indonesia
        </h1>

        <form
          id="hero-search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex h-16 items-stretch rounded border border-[#DCDCDC] bg-white p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        >
          <button
            type="button"
            className="hidden w-[248px] shrink-0 items-center gap-2 border-r border-[#E5E5E5] px-4 text-sm text-[#333] md:flex"
          >
            <MapPin className="size-4 text-[#555]" />
            <span className="flex-1 text-left">Semua Kota/Provinsi</span>
            <ChevronDown className="size-4 text-[#777]" />
          </button>
          <label className="flex flex-1 items-center gap-2 px-4">
            <Search className="size-4 shrink-0 text-[#999]" />
            <input
              placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
              className="w-full bg-transparent text-sm text-[#222] placeholder:text-[#9A9A9A] focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-[103px] shrink-0 rounded bg-[#1672E0] text-sm font-semibold uppercase text-white hover:bg-[#0F5FC2]"
          >
            Cari
          </button>
        </form>

        <div className="mt-3 flex min-h-6 flex-wrap items-center gap-2 text-[13px]">
          <span className="text-[#555]">Populer:</span>
          {loading && !payload && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-6 w-20" />)}
          {error && <span className="text-red-600">{error}</span>}
          {payload?.data.map((t) => (
            <a key={t} href="#" className="rounded-sm bg-[#E3EEFB] px-2 py-0.5 text-[#1672E0] hover:bg-[#D3E5FA]">
              {t}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}