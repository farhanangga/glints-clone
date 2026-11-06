const LOGO_COLORS = ["#E3EEFB", "#E6F6EC", "#FFF1DB", "#F3E8FB", "#FDE7E7", "#E4F4F7"];
const LOGO_TEXT = ["#1672E0", "#1E8A4C", "#C77700", "#7B3FB0", "#C93636", "#0F7C8C"];

// Tidak ada aset logo perusahaan, jadi dipakai kotak inisial berwarna.
export function CompanyLogo({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .replace(/^(PT\.?|PD|CV)\s+/i, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .slice(0, 2)
    .toUpperCase();
  const idx = name.length % LOGO_COLORS.length;
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-sm border border-[#EEE] text-xs font-bold"
      style={{ width: size, height: size, background: LOGO_COLORS[idx], color: LOGO_TEXT[idx] }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
