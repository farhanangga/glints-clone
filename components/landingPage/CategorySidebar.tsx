"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import type { CategoryGroup } from "@/lib/data";

type CategoryRes = { data: CategoryGroup[]; page: number; totalPages: number };

// Link role: biru + garis bawah saat di-hover
const roleLink =
  "underline-offset-4 decoration-1 transition-colors hover:text-[#1672E0] hover:underline focus-visible:text-[#1672E0] focus-visible:underline";

export function CategorySidebar() {
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState<CategoryGroup["id"] | null>(null);
  const { payload, loading, error, reload } = useApi<CategoryRes>(`/api?section=categories&page=${page}`);
  const totalPages = payload?.totalPages ?? 6;

  const activeCategory = payload?.data.find((c) => c.id === activeId);
  const activeMenu = activeCategory?.roleGroups;

  const goTo = (next: number) => {
    setActiveId(null);
    setPage(next);
  };

  return (
    // Hilang di mobile, tampil mulai md. `relative` = acuan posisi flyout.
    <aside
      onMouseLeave={() => setActiveId(null)}
      onKeyDown={(e) => e.key === "Escape" && setActiveId(null)}
      className="relative hidden h-[331px] flex-col justify-between rounded border border-[#E5E5E5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:flex"
    >
      <div className={`px-2 pt-3 transition-opacity ${loading && payload ? "opacity-50" : ""}`}>
        {error && !payload && (
          <div className="flex h-full flex-col items-center justify-center gap-2 pt-10 text-sm text-red-600">
            {error}
            <button onClick={reload} className="font-semibold underline">Coba lagi</button>
          </div>
        )}
        {!payload && !error && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex h-[47px] items-center px-3"><Skeleton className="h-4 w-2/3" /></div>
        ))}
        <ul>
          {payload?.data.map((c) => {
            const isActive = c.id === activeId;
            return (
              <li key={c.id}>
                {/* Baris tetap ter-highlight selama flyout-nya terbuka */}
                <div
                  onMouseEnter={() => setActiveId(c.id)}
                  onFocus={() => setActiveId(c.id)}
                  className={`flex h-[47px] items-center justify-between rounded px-3 text-sm text-black transition-colors ${
                    isActive ? "bg-[#E3F0F7]" : ""
                  }`}
                >
                  <span className="flex min-w-0 items-baseline gap-3">
                    <a href="#" className={`shrink-0 font-semibold ${roleLink}`}>{c.name}</a>
                    {c.subs.map((s) => (
                      <a key={s} href="#" className={`truncate font-normal text-[#555] ${roleLink}`}>
                        {s}
                      </a>
                    ))}
                  </span>
                  <Play
                    className={`ml-2 size-2.5 shrink-0 transition-colors ${
                      isActive ? "fill-[#1672E0] text-[#1672E0]" : "fill-[#555] text-[#555]"
                    }`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <nav
        aria-label="Halaman kategori"
        onMouseEnter={() => setActiveId(null)}
        className="flex h-[52px] items-center justify-center gap-3 border-t border-[#EFEFEF] text-sm text-[#333]"
      >
        <button
          aria-label="Halaman sebelumnya"
          disabled={page === 1}
          onClick={() => goTo(page - 1)}
          className="text-[#555] hover:text-[#1672E0] disabled:text-[#C8C8C8] disabled:hover:text-[#C8C8C8]"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="grid size-7 place-items-center rounded-sm bg-[#E3EEFB] text-[#1672E0]">{page}</span>
        <span>/</span>
        <span>{totalPages}</span>
        <button
          aria-label="Halaman berikutnya"
          disabled={page === totalPages}
          onClick={() => goTo(page + 1)}
          className="text-[#555] hover:text-[#1672E0] disabled:text-[#C8C8C8] disabled:hover:text-[#C8C8C8]"
        >
          <ChevronRight className="size-4" />
        </button>
      </nav>

      {/* Flyout: menempel di sisi kanan sidebar, menutupi PromoPanel */}
      {activeCategory && activeMenu && activeMenu.length > 0 && (
        <div
          role="region"
          aria-label={`Role di ${activeCategory.name}`}
          className="absolute left-full top-1 z-30 h-[calc(100%-4px)] w-[140%] overflow-y-auto rounded bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
        >
          {activeMenu.map((g, i) => (
            <section key={g.title} className={i > 0 ? "mt-5" : ""}>
              <h3 className="text-sm font-normal leading-5 text-[#666]">{g.title}</h3>
              <ul className="mt-1 flex flex-wrap gap-x-6">
                {g.roles.map((r) => (
                  <li key={r}>
                    <a href="#" className={`block py-1 text-base leading-6 text-black ${roleLink}`}>
                      {r}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </aside>
  );
}