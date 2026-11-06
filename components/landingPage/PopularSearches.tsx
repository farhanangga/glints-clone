"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import { POPULAR_SEARCH_TABS } from "@/lib/data";

export function PopularSearches() {
  const [tab, setTab] = useState<string>(POPULAR_SEARCH_TABS[0].slug);
  const { payload, loading, error, reload } = useApi<{ data: string[] }>(`/api?section=popular-searches&tab=${tab}`);

  return (
    <section className="bg-[#F9FAFB] pb-4 pt-12 sm:bg-transparent sm:pb-0 sm:pt-[88px]">
      <Container>
        <SectionTitle >Pencarian populer di Glints TapLoker</SectionTitle>

        {/* Tabs */}
        <div className="relative mt-4 sm:mt-6">
          <div
            role="tablist"
            className="-mx-4 flex gap-7 overflow-x-auto border-b border-[#E5E5E5] px-4 text-sm [scrollbar-width:none] sm:mx-0 sm:gap-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {POPULAR_SEARCH_TABS.map((t) => {
              const active = tab === t.slug;
              return (
                <button
                  key={t.slug}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.slug)}
                  className={`-mb-px shrink-0 whitespace-nowrap border-b-2 px-3.5 py-3 sm:px-6 ${
                    active ? "border-[#1672E0] font-medium text-[#1672E0]" : "border-transparent text-[#555] hover:text-black"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          {/* Fade di tepi kanan (hanya mobile) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F9FAFB] to-transparent sm:hidden" />
        </div>

        <div className="mt-3 sm:mt-4 sm:min-h-[210px]">
          {loading && !payload && (
            <div className="-mx-4 grid grid-flow-col grid-rows-4 auto-cols-[270px] overflow-hidden px-4 sm:mx-0 sm:grid-flow-row sm:grid-rows-none sm:auto-cols-auto sm:grid-cols-2 sm:gap-x-6 sm:px-0 lg:grid-cols-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className={`h-10 items-center sm:h-[42px] ${i >= 8 ? "hidden sm:flex" : "flex"}`}>
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && payload && (
            <ul
              className={`-mx-4 grid grid-flow-col grid-rows-4 auto-cols-[270px] overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid-flow-row sm:grid-rows-none sm:auto-cols-auto sm:grid-cols-2 sm:gap-x-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 ${
                loading ? "opacity-50" : ""
              }`}
            >
              {payload.data.map((s) => (
                <li key={s} className="flex pr-11 sm:pr-0">
                  <a
                    href="#"
                    className="flex min-h-10 w-full items-center py-2.5 text-[15px] leading-5 text-[#222] hover:text-[#1672E0] sm:h-[42px] sm:min-h-0 sm:py-0"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}