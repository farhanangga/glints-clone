"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import type { City } from "@/lib/data";

// Mobile: scroll horizontal, 2 baris, kartu 146x68 (mirip Glints).
// Desktop (md+): grid 4 kolom, tinggi kartu 132px.
const GRID =
  "grid grid-flow-col grid-rows-2 auto-cols-[146px] gap-[11px] overflow-x-auto -mr-3.5 pr-3.5 " +
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
  "md:mr-0 md:pr-0 md:grid-flow-row md:grid-rows-none md:auto-cols-auto md:grid-cols-4 md:gap-4 md:overflow-visible";

export function PopularCities() {
  const { payload, loading, error, reload } = useApi<{ data: City[] }>("/api?section=cities");

  return (
    <section className="pt-10 md:pt-[88px]">
      <Container>
        <h2 className="text-[15px] font-bold text-black md:text-center md:text-[26px]">
          Kota-Kota Populer
        </h2>

        <div className="mt-3.5 md:mt-8">
          {loading && !payload && (
            <div className={GRID} aria-busy="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-[68px] md:h-[132px]" />
              ))}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && payload && (
            <div className={GRID}>
              {payload.data.map((c) => (
                <a
                  key={c.slug}
                  href="#"
                  className="group relative block h-[68px] overflow-hidden rounded-lg md:h-[132px] md:rounded"
                >
                  <Image
                    src={c.image}
                    alt={`Loker di ${c.name}`}
                    fill
                    sizes="(min-width:768px) 283px, 146px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/15 transition-opacity group-hover:opacity-80 md:bg-none md:bg-black/40 md:transition-colors md:group-hover:bg-black/30 md:group-hover:opacity-100" />
                  <span className="absolute inset-y-0 left-2.5 right-2 flex items-center text-sm font-bold text-white md:left-4 md:text-base md:font-semibold">
                    <span className="truncate">{c.name}</span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}