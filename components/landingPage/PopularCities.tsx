"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import type { City } from "@/lib/data";

export function PopularCities() {
  const { payload, loading, error, reload } = useApi<{ data: City[] }>("/api?section=cities");

  return (
    <section className="pt-[88px]">
      <Container>
        <SectionTitle>Kota-Kota Populer</SectionTitle>
        <div className="mt-8">
          {loading && !payload && (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-[132px]" />)}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && payload && (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {payload.data.map((c) => (
                <a key={c.slug} href="#" className="group relative block h-[132px] overflow-hidden rounded">
                  <Image
                    src={c.image}
                    alt={`Loker di ${c.name}`}
                    fill
                    sizes="(min-width:1024px) 283px, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
                  <span className="absolute inset-y-0 left-4 flex items-center text-base font-semibold text-white">{c.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
