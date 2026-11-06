export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex h-12 items-center gap-2 rounded bg-[#1672E0] px-6 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#0F5FC2]">
      {children}
    </button>
  );
}
