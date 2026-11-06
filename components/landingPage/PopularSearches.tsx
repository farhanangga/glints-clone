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
    <section className="pt-[88px]">
      <Container>
        <SectionTitle>Pencarian populer di Glints TapLoker</SectionTitle>

        <div role="tablist" className="mt-6 flex overflow-x-auto border-b border-[#E5E5E5] text-sm [scrollbar-width:none]">
          {POPULAR_SEARCH_TABS.map((t) => {
            const active = tab === t.slug;
            return (
              <button
                key={t.slug}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.slug)}
                className={`-mb-px shrink-0 whitespace-nowrap border-b-2 px-6 py-3 ${
                  active ? "border-[#1672E0] font-medium text-[#1672E0]" : "border-transparent text-[#555] hover:text-black"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 min-h-[210px]">
          {loading && !payload && (
            <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex h-[42px] items-center"><Skeleton className="h-4 w-40" /></div>
              ))}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && payload && (
            <ul className={`grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-50" : ""}`}>
              {payload.data.map((s) => (
                <li key={s}>
                  <a href="#" className="flex h-[42px] items-center text-[15px] text-[#222] hover:text-[#1672E0]">{s}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
