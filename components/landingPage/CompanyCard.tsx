import { Chip, PremiumChip } from "@/components/ui/Chip";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import type { Company } from "@/lib/data";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="flex flex-col overflow-hidden rounded border border-[#E5E5E5] bg-gradient-to-b from-[#E6F1FC] via-[#F2F8FE] to-white shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-sm bg-white shadow-sm">
            <CompanyLogo name={company.name} size={32} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold leading-5 text-black">{company.name}</h3>
            <p className="truncate text-xs leading-4 text-[#555]">{company.location}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs leading-4">
          {company.premium && <PremiumChip label="Premium" />}
          <span className="truncate text-[#333]">{company.industry}</span>
          <span className="shrink-0 text-[#1672E0]">{company.openJobs} loker</span>
        </div>
      </div>

      <div className="mt-3 space-y-3 border-t border-[#E5E5E5] bg-white px-4 py-3">
        {company.positions.map((p) => (
          <div key={p.title}>
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="min-w-0 truncate font-medium text-black">{p.title}</span>
              <span className={`shrink-0 whitespace-nowrap ${p.salary ? "font-medium text-[#1672E0]" : "text-[#777]"}`}>
                {p.salary ?? "Gaji Tidak Ditampilkan"}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {p.tags.map((t) => <Chip key={t}>{t}</Chip>)}
            </div>
          </div>
        ))}
      </div>

      <a href="#" className="block bg-white pb-3 text-center text-[13px] font-semibold text-[#1672E0] hover:underline">
        Lihat Selebihnya
      </a>
    </article>
  );
}
