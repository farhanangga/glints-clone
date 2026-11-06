"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
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
    <section className="pt-10 lg:pt-[107px]">
      <Container>
        <h2 className="text-[15px] font-bold text-black md:text-center md:text-[26px]">Lowongan Kerja Pilihan</h2>

        <div className="relative mt-[34px]">
          <div
            role="tablist"
            className="flex gap-6 overflow-x-auto border-b border-[#E5E5E5] pl-2 text-sm [scrollbar-width:none]"
          >
            {JOB_CATEGORIES.map((c) => {
              const active = category === c.slug;
              return (
                <button
                  key={c.slug}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.slug)}
                  className={`group relative -mb-px shrink-0 whitespace-nowrap px-4 py-4 transition-colors focus-visible:outline-none ${
                    active ? "text-[#1672E0]" : "text-[#555]"
                  }`}
                >
                  {c.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 rounded-t-[3px] bg-[#1672E0] transition-[height,opacity] duration-150 group-hover:h-[4px] group-hover:opacity-100 group-focus-visible:h-[4px] group-focus-visible:opacity-100 motion-reduce:transition-none ${
                      active ? "h-[4px] opacity-100" : "h-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
            <span className="ml-auto shrink-0 cursor-pointer whitespace-nowrap bg-gradient-to-r from-transparent to-[#DCDCDC] py-4 pl-12 pr-6 text-[#555] hover:text-black">
              Lihat Semua
            </span>
          </div>
        </div>

        <div className="mt-[25px]">
          {loading && !payload && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-[236px]" />
              ))}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && jobs && (
            <div
              className={`grid gap-6 transition-opacity md:grid-cols-2 lg:grid-cols-3 ${
                loading ? "opacity-50" : ""
              }`}
            >
              {jobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
              {jobs.length === 0 && (
                <p className="col-span-full py-10 text-center text-sm text-[#777]">
                  Belum ada lowongan di kategori ini.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <PrimaryButton>
            Lihat loker lainnya <ArrowRight className="size-4" />
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}