"use client";

import { useState } from "react";
import { Bookmark, Building2, MapPin } from "lucide-react";
import type { Job } from "@/lib/data";
import { companyLogoSrc } from "@/lib/utils";

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-[#2E9E5B]" aria-label="Terverifikasi">
      <path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.5 12 2.5 2.5 4.5-5"
      />
    </svg>
  );
}

function CompanyLogo({ company }: { company: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex size-8 shrink-0 items-center justify-center rounded bg-[#EDEDED] text-[#B5B5B5]">
        <Building2 className="size-5" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={companyLogoSrc(company)}
      alt={company}
      onError={() => setFailed(true)}
      className="size-8 shrink-0 rounded object-cover"
    />
  );
}

export function JobCard({ job }: { job: Job }) {
  return (
    <article
      className="group flex h-[236px] cursor-pointer flex-col rounded-lg bg-white shadow-[0_1px_6px_rgba(0,0,0,0.12)]
                 transition-all duration-200 ease-out hover:z-10 hover:scale-[1.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
    >
      <div className="flex-1 px-3 pt-4">
        {/* Judul + gaji */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 truncate text-base font-semibold text-black" title={job.title}>
            {job.title}
          </h3>
          {job.salary ? (
            <span className="shrink-0 text-sm font-semibold text-[#1672E0]">{job.salary}</span>
          ) : (
            <span className="shrink-0 text-sm font-semibold text-[#8C8C8C]">Gaji Tidak Ditampilkan</span>
          )}
        </div>

        {/* Tag */}
        <div className="mt-3 flex flex-nowrap gap-2 overflow-hidden">
          {job.premium && (
            <span className="shrink-0 whitespace-nowrap rounded bg-[#FFF0E3] px-2.5 py-1 text-[13px] text-[#E8710A]">
              Perusahaan Premium
            </span>
          )}
          {job.tags.map((t) => (
            <span
              key={t}
              className="shrink-0 whitespace-nowrap rounded bg-[#F0F0F0] px-2.5 py-1 text-[13px] text-[#333]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Perusahaan */}
        <div className="mt-4 flex items-center gap-3">
          <CompanyLogo company={job.company} />
          <div className="min-w-0 space-y-0.5 text-sm">
            <div className="flex items-center gap-1.5">
              {job.verified ? <VerifiedIcon /> : <Building2 className="size-4 shrink-0 text-[#8C8C8C]" />}
              <span className="truncate text-[#1672E0] hover:underline">{job.company}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#222]">
              <MapPin className="size-4 shrink-0 text-[#8C8C8C]" />
              <span className="truncate">{job.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex h-[68px] shrink-0 items-center justify-end border-t border-[#E5E5E5]">
        <button
          type="button"
          aria-label="Simpan lowongan"
          className="rounded p-2 text-[#1672E0] transition-colors hover:bg-[#1672E0]/10"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark className="size-5" />
        </button>
      </div>
    </article>
  );
}