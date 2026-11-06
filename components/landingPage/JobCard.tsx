import { BadgeCheck, Bookmark, Building2, MapPin } from "lucide-react";
import { Chip, PremiumChip } from "@/components/ui/Chip";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import type { Job } from "@/lib/data";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex min-h-[248px] flex-col rounded border border-[#E5E5E5] bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate text-base font-medium leading-6 text-black">{job.title}</h3>
        <span
          className={`shrink-0 whitespace-nowrap ${
            job.salary ? "text-sm font-semibold text-[#1672E0]" : "pt-0.5 text-[13px] text-[#777]"
          }`}
        >
          {job.salary ?? "Gaji Tidak Ditampilkan"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.premium && <PremiumChip />}
        {job.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <CompanyLogo name={job.company} />
        <div className="min-w-0 text-sm leading-5">
          <p className="flex items-center gap-1 text-[#1672E0]">
            {job.verified ? (
              <BadgeCheck className="size-4 shrink-0 text-[#2CB66B]" />
            ) : (
              <Building2 className="size-4 shrink-0 text-[#888]" />
            )}
            <span className="truncate">{job.company}</span>
          </p>
          <p className="flex items-center gap-1 text-[#333]">
            <MapPin className="size-4 shrink-0 text-[#666]" />
            <span className="truncate">{job.location}</span>
          </p>
        </div>
      </div>

      <button aria-label={`Simpan lowongan ${job.title}`} className="mt-auto self-end pt-3 text-[#1672E0] hover:text-[#0F5FC2]">
        <Bookmark className="size-5" />
      </button>
    </article>
  );
}
