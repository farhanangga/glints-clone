"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import type { Company } from "@/lib/data";
import { CompanyCard } from "./CompanyCard";

// Mobile: scroll horizontal, 2 baris, kartu 238px (mirip Glints).
// Desktop: grid 2 kolom (md) / 3 kolom (lg).
const GRID =
  "grid grid-flow-col grid-rows-2 auto-cols-[238px] gap-3.5 overflow-x-auto -mr-3.5 pr-3.5 " +
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
  "md:mr-0 md:pr-0 md:grid-flow-row md:grid-rows-none md:auto-cols-auto md:grid-cols-2 md:gap-[18px] md:overflow-visible " +
  "lg:grid-cols-3";

export function PopularCompanies() {
  const { payload, loading, error, reload } = useApi<{ data: Company[] }>("/api?section=companies");

  return (
    <section className="pt-10 md:pt-[88px]">
      <Container>
        <SectionTitle>Perusahaan Populer</SectionTitle>

        <div className="mt-3.5 md:mt-[26px]">
          {loading && !payload && (
            <div className={GRID} aria-busy="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-[94px] md:h-[305px]" />
              ))}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && payload && (
            <div className={GRID}>
              {payload.data.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-[22px] flex justify-center md:mt-6">
          <button
            type="button"
            className="inline-flex h-[38px] items-center gap-2 rounded bg-[#1672E0] px-5 text-[13px] font-semibold uppercase text-white transition-colors hover:bg-[#125FBB] md:h-10 md:px-6 md:text-sm md:normal-case"
          >
            Lihat perusahaan lainnya <ArrowRight className="size-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}