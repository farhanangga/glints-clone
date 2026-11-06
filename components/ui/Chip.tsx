export function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-sm border border-[#E0E0E0] bg-[#F5F5F5] px-2 py-1 text-xs leading-4 text-[#333] ${className}`}
    >
      {children}
    </span>
  );
}

export function PremiumChip({ label = "Perusahaan Premium" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-[#FFEBD6] px-2 py-1 text-xs leading-4 text-[#E67E22]">
      {label}
    </span>
  );
}
