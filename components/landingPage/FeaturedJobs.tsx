"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import { JOB_CATEGORIES } from "@/lib/data";
import type { Job } from "@/lib/data";
import { JobCard } from "./JobCard";

export function FeaturedJobs() {
  const [category, setCategory] = useState<string>(JOB_CATEGORIES[0].slug);
  const { payload, loading, error, reload } = useApi<{ data: Job[] }>(`/api?section=jobs&category=${category}`);
  const jobs = payload?.data.slice(0, 9);

  return (
    <section className="pt-[88px]">
      <Container>
        <SectionTitle>Lowongan Kerja Pilihan</SectionTitle>

        <div className="relative mt-[26px]">
          <div role="tablist" className="flex overflow-x-auto border-b border-[#E5E5E5] text-sm [scrollbar-width:none]">
            {JOB_CATEGORIES.map((c) => {
              const active = category === c.slug;
              return (
                <button
                  key={c.slug}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.slug)}
                  className={`-mb-px shrink-0 whitespace-nowrap border-b-2 px-8 py-3 ${
                    active ? "border-[#1672E0] font-medium text-[#1672E0]" : "border-transparent text-[#555] hover:text-black"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
            <span className="ml-auto shrink-0 whitespace-nowrap bg-gradient-to-r from-transparent to-[#EDEDED] px-8 py-3 text-[#555]">
              Lihat Semua
            </span>
          </div>
        </div>

        <div className="mt-6">
          {loading && !payload && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-[248px]" />)}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && jobs && (
            <div className={`grid gap-4 transition-opacity md:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-50" : ""}`}>
              {jobs.map((j) => <JobCard key={j.id} job={j} />)}
              {jobs.length === 0 && <p className="col-span-full py-10 text-center text-sm text-[#777]">Belum ada lowongan di kategori ini.</p>}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <PrimaryButton>Lihat loker lainnya <ArrowRight className="size-4" /></PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
