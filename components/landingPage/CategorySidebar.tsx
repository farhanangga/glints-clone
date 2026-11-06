"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import type { CategoryGroup } from "@/lib/data";

type CategoryRes = { data: CategoryGroup[]; page: number; totalPages: number };

export function CategorySidebar() {
  const [page, setPage] = useState(1);
  const { payload, loading, error, reload } = useApi<CategoryRes>(`/api?section=categories&page=${page}`);
  const totalPages = payload?.totalPages ?? 6;

  return (
    <aside className="flex h-[331px] flex-col justify-between rounded border border-[#E5E5E5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className={`px-5 pt-3 transition-opacity ${loading && payload ? "opacity-50" : ""}`}>
        {error && !payload && (
          <div className="flex h-full flex-col items-center justify-center gap-2 pt-10 text-sm text-red-600">
            {error}
            <button onClick={reload} className="font-semibold underline">Coba lagi</button>
          </div>
        )}
        {!payload && !error && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex h-[47px] items-center"><Skeleton className="h-4 w-2/3" /></div>
        ))}
        <ul>
          {payload?.data.map((c) => (
            <li key={c.id}>
              <a href="#" className="flex h-[47px] items-center justify-between text-sm text-black hover:text-[#1672E0]">
                <span className="flex min-w-0 items-baseline gap-3">
                  <span className="shrink-0 font-semibold">{c.name}</span>
                  {c.subs.map((s) => (
                    <span key={s} className="hidden truncate font-normal text-[#444] sm:inline">{s}</span>
                  ))}
                </span>
                <Play className="size-2.5 shrink-0 fill-[#555] text-[#555]" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav aria-label="Halaman kategori" className="flex h-[52px] items-center justify-center gap-3 border-t border-[#EFEFEF] text-sm text-[#333]">
        <button
          aria-label="Halaman sebelumnya"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="text-[#555] disabled:text-[#C8C8C8]"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="grid size-7 place-items-center rounded-sm bg-[#E3EEFB] text-[#1672E0]">{page}</span>
        <span>/</span>
        <span>{totalPages}</span>
        <button
          aria-label="Halaman berikutnya"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="text-[#555] disabled:text-[#C8C8C8]"
        >
          <ChevronRight className="size-4" />
        </button>
      </nav>
    </aside>
  );
}
