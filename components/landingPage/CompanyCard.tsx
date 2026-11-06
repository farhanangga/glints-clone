"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import type { Company, CompanyPosition } from "@/lib/data";
import { companyLogoSrc, formatTag } from "@/lib/utils";

function CompanyLogo({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex size-[42px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white md:size-[52px]">
      {failed ? (
        <Building2 className="size-5 text-[#B5B5B5] md:size-6" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={companyLogoSrc(name)}
          alt={name}
          onError={() => setFailed(true)}
          className="size-full object-contain"
        />
      )}
    </div>
  );
}

function Separator() {
  return <span aria-hidden className="h-4 w-px shrink-0 bg-[#D0D0D0]" />;
}

function Position({ position }: { position: CompanyPosition }) {
  const lastIndex = position.tags.length - 1;

  return (
    <div className="group cursor-pointer">
      <div className="flex items-baseline justify-between gap-3 text-[13px] font-semibold leading-5">
        <span className="min-w-0 truncate text-[#333] transition-colors group-hover:text-[#1672E0]">
          {position.title}
        </span>
        {position.salary ? (
          <span className="shrink-0 text-[#1672E0]">{position.salary}</span>
        ) : (
          <span className="shrink-0 text-[#8C8C8C]">Gaji Tidak Ditampilkan</span>
        )}
      </div>

      <div className="mt-1 flex gap-1.5 overflow-hidden">
        {position.tags.map((t, i) => (
          <span
            key={t}
            className={`whitespace-nowrap rounded bg-[#F0F0F0] px-2.5 py-1 text-sm leading-5 text-[#333] ${
              i === lastIndex ? "min-w-0 truncate" : "shrink-0"
            }`}
          >
            {formatTag(t)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[#E5E5E5] bg-white">
      {/* Header: putih di mobile, gradasi biru muda di desktop */}
      <div className="bg-white p-3 md:bg-gradient-to-b md:from-[#E4F1F8] md:to-[#F5F9FC] md:px-4 md:pb-[10px] md:pt-4">
        <div className="flex items-start gap-3 md:gap-4">
          <CompanyLogo name={company.name} />
          <div className="min-w-0">
            <h3
              className="truncate text-[13px] font-semibold leading-5 text-[#333] md:text-base md:leading-6"
              title={company.name}
            >
              {company.name}
            </h3>
            <p className="truncate text-xs leading-5 text-[#666] md:text-sm md:leading-[22px]">
              {company.location}
            </p>
          </div>
        </div>

        <div className="mt-2 flex h-5 items-center gap-3 text-[13px] md:mt-1 md:h-7 md:text-sm">
          {company.premium && (
            <span className="shrink-0 rounded-[3px] bg-[#FFE9CC] px-2 py-0.5 text-xs font-medium leading-4 tracking-wide text-[#E5871A] md:text-[13px]">
              Premium
            </span>
          )}
          {company.premium && <Separator />}
          <span className="min-w-0 truncate text-[#333]">{company.industry}</span>
          <Separator />
          <span className="shrink-0 text-[#1672E0]">{company.openJobs} loker</span>
        </div>
      </div>

      {/* Daftar posisi: hanya desktop */}
      <div className="hidden flex-1 flex-col px-4 pt-4 md:flex">
        <div className="space-y-[11px]">
          {company.positions.slice(0, 2).map((p) => (
            <Position key={p.title} position={p} />
          ))}
        </div>
        <div className="mt-auto pb-[23px] pt-5 text-center">
          <span className="cursor-pointer text-sm font-semibold text-[#1672E0] hover:underline">
            Lihat Selebihnya
          </span>
        </div>
      </div>
    </article>
  );
}