export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// "PT. Pengrajin Jaya International" -> /assets/perusahaan/pt-pengrajin-jaya-international.png
export function companyLogoSrc(company: string) {
  return `/assets/perusahaan/${slugify(company)}.png`;
}

// "1-3 tahun" -> "1–3 tahun" (Glints memakai en dash untuk rentang pengalaman)
export function formatTag(tag: string) {
  return tag.replace(/(\d)-(\d)/, "$1–$2");
}