// Data contoh untuk API (cukup untuk mengisi 2 section di halaman).

export type Job = {
  id: string;
  title: string;
  salary: string | null; // null = "Gaji Tidak Ditampilkan"
  tags: string[];
  premium: boolean;
  verified: boolean;
  company: string;
  location: string;
  category: string; // slug kategori
};

export type CompanyPosition = {
  title: string;
  salary: string | null;
  tags: string[];
};

export type Company = {
  id: string;
  name: string;
  location: string;
  industry: string;
  openJobs: number;
  premium: boolean;
  positions: CompanyPosition[];
};

export const JOB_CATEGORIES = [
  { slug: "administrasi-hrd", label: "Administrasi & HRD" },
  { slug: "komputer-perangkat-lunak", label: "Komputer & Perangkat Lunak" },
  { slug: "marketing", label: "Marketing" },
  { slug: "industri-jasa", label: "Industri Jasa" },
  { slug: "operasional-pelayanan", label: "Operasional & Pelayanan Pelanggan" },
] as const;

export const LOCATIONS = [
  "Jakarta Pusat, DKI Jakarta",
  "Jakarta Selatan, DKI Jakarta",
  "Jakarta Utara, DKI Jakarta",
  "Tangerang Selatan, Banten",
  "Bandung, Jawa Barat",
  "Bekasi, Jawa Barat",
  "Cirebon, Jawa Barat",
  "Semarang, Jawa Tengah",
  "Yogyakarta, DI Yogyakarta",
  "Surabaya, Jawa Timur",
  "Denpasar, Bali",
];

const FT = "Penuh Waktu";

export const JOBS: Job[] = [
  // Administrasi & HRD
  { id: "j1", title: "Admin Warehouse", salary: "Rp 5,2-5,3jt", tags: [FT, "1-3 tahun", "Minimal SMA/SMK"], premium: false, verified: true, company: "Group BIKA", location: "Tangerang Selatan, Banten", category: "administrasi-hrd" },
  { id: "j2", title: "Admin Staff Gudang", salary: "Rp 2,5-3,5jt", tags: [FT], premium: true, verified: false, company: "Home Decor Indonesia", location: "Jakarta Utara, DKI Jakarta", category: "administrasi-hrd" },
  { id: "j3", title: "ADMIN STORE SHOE CARE", salary: "Rp 2,5-3,5jt", tags: [FT], premium: true, verified: true, company: "Preev Shoes And Apparel Care", location: "Jakarta Utara, DKI Jakarta", category: "administrasi-hrd" },
  { id: "j4", title: "Admin", salary: "Rp 2,4-3,5jt", tags: [FT, "1-3 tahun", "Minimal SMA/SMK"], premium: false, verified: true, company: "PT Mahameru Insan Mandiri", location: "Sukabumi, Jawa Barat", category: "administrasi-hrd" },
  { id: "j5", title: "Facilities & General Affairs", salary: null, tags: [FT], premium: true, verified: true, company: "Sail Global", location: "Jakarta Selatan, DKI Jakarta", category: "administrasi-hrd" },
  { id: "j6", title: "Admin eccomers", salary: "Rp 4-4,5jt", tags: [FT], premium: true, verified: true, company: "PT. Pengrajin Jaya International", location: "Tangerang, Banten", category: "administrasi-hrd" },
  { id: "j7", title: "Administrasi", salary: "Rp 3-3,5jt", tags: [FT, "1-3 tahun", "Minimal SMA/SMK"], premium: false, verified: true, company: "PT. Bintang Terang Bercahaya", location: "Tangerang, Banten", category: "administrasi-hrd" },
  { id: "j8", title: "Admin Dealer Motor", salary: null, tags: [FT], premium: true, verified: false, company: "PD Terus Maju", location: "Kab. Cianjur, Jawa Barat", category: "administrasi-hrd" },
  { id: "j9", title: "Administrasi Support", salary: null, tags: [FT], premium: true, verified: true, company: "Solusi Global Marketindo", location: "Kab. Wonogiri, Jawa Tengah", category: "administrasi-hrd" },

  // Komputer & Perangkat Lunak
  { id: "j10", title: "Frontend Developer", salary: "Rp 8-12jt", tags: [FT, "1-3 tahun", "Minimal S1"], premium: true, verified: true, company: "Nusantara Digital", location: "Jakarta Selatan, DKI Jakarta", category: "komputer-perangkat-lunak" },
  { id: "j11", title: "UI/UX Designer", salary: "Rp 6-9jt", tags: [FT, "1-3 tahun"], premium: false, verified: true, company: "Kreasi Antar Bangsa", location: "Bandung, Jawa Barat", category: "komputer-perangkat-lunak" },
  { id: "j12", title: "Backend Developer (Node.js)", salary: null, tags: [FT, "3-5 tahun"], premium: true, verified: true, company: "Teknologi Maju Bersama", location: "Yogyakarta, DI Yogyakarta", category: "komputer-perangkat-lunak" },

  // Marketing
  { id: "j13", title: "Digital Marketing Specialist", salary: "Rp 7-8jt", tags: [FT, "1-3 tahun", "Minimal S1"], premium: true, verified: true, company: "Pasar Online Indonesia", location: "Jakarta Pusat, DKI Jakarta", category: "marketing" },
  { id: "j14", title: "Content Creator", salary: "Rp 4-6jt", tags: [FT, "Minimal SMA/SMK"], premium: false, verified: true, company: "Studio Kata Visual", location: "Bandung, Jawa Barat", category: "marketing" },
  { id: "j15", title: "Social Media Executive", salary: null, tags: [FT], premium: true, verified: false, company: "Warung Nusantara", location: "Surabaya, Jawa Timur", category: "marketing" },

  // Industri Jasa
  { id: "j16", title: "Staff Operasional Hotel", salary: "Rp 3-4jt", tags: [FT, "Minimal SMA/SMK"], premium: false, verified: true, company: "Hotel Bahari", location: "Denpasar, Bali", category: "industri-jasa" },
  { id: "j17", title: "Tour Consultant", salary: "Rp 4-5jt", tags: [FT, "1-3 tahun"], premium: true, verified: true, company: "Jelajah Nusantara Tour", location: "Yogyakarta, DI Yogyakarta", category: "industri-jasa" },
  { id: "j18", title: "Barista", salary: null, tags: ["Kontrak", "Minimal SMA/SMK"], premium: false, verified: false, company: "Kopi Sudut Kota", location: "Semarang, Jawa Tengah", category: "industri-jasa" },

  // Operasional & Pelayanan Pelanggan
  { id: "j19", title: "Customer Service", salary: "Rp 4-5jt", tags: [FT, "Minimal SMA/SMK"], premium: true, verified: true, company: "PT Layanan Prima", location: "Jakarta Pusat, DKI Jakarta", category: "operasional-pelayanan" },
  { id: "j20", title: "Staff Logistik", salary: "Rp 3,5-4,5jt", tags: [FT, "1-3 tahun"], premium: false, verified: true, company: "Kargo Cepat", location: "Bekasi, Jawa Barat", category: "operasional-pelayanan" },
  { id: "j21", title: "Supervisor Operasional", salary: null, tags: [FT, "3-5 tahun"], premium: true, verified: true, company: "Gudang Sentral", location: "Cirebon, Jawa Barat", category: "operasional-pelayanan" },
];

export const COMPANIES: Company[] = [
  { id: "c1", name: "PT Summarecon Agung Tbk", location: "Jakarta Pusat, DKI Jakarta", industry: "Real Estate", openJobs: 4, premium: true, positions: [
    { title: "DOSEN TETAP PROGRAM STUDI", salary: null, tags: [FT, "3-5 tahun", "+11"] },
    { title: "INTERNSHIP - GRAPHIC DESIGNER", salary: null, tags: ["Magang", "Minimal Sarjana (S1)"] } ] },
  { id: "c2", name: "J&T Cargo Indonesia (PT Global Yimi)", location: "Jakarta Utara, DKI Jakarta", industry: "Logistics and Supply Chain", openJobs: 62, premium: true, positions: [
    { title: "Product Specialist (Mandarin)", salary: null, tags: [FT, "1-3 tahun", "+4"] },
    { title: "Operational Support Staff", salary: null, tags: [FT, "Minimal SMA/SMK", "+5"] } ] },
  { id: "c3", name: "BCA Finance", location: "Jakarta Selatan, DKI Jakarta", industry: "Financial Services", openJobs: 54, premium: true, positions: [
    { title: "Relationship Officer (Sampit)", salary: "Rp 3,8-4,5jt", tags: [FT, "Minimal Diploma"] },
    { title: "Relationship Officer (Bekasi)", salary: "Rp 6-7jt", tags: [FT, "Minimal Diploma"] } ] },
  { id: "c4", name: "PT XLSMART Telecom Sejahtera Tbk", location: "Jakarta Pusat, DKI Jakarta", industry: "Telecommunications", openJobs: 15, premium: true, positions: [
    { title: "Direct Sales XLC Gresik", salary: null, tags: [FT, "Minimal SMA/SMK"] },
    { title: "Customer Relation Representative", salary: "Rp 3-3,2jt", tags: ["Kontrak", "1-3 tahun", "+1"] } ] },
  { id: "c5", name: "Astra Credit Companies (ACC)", location: "Jakarta Selatan, DKI Jakarta", industry: "Financial Services", openJobs: 99, premium: true, positions: [
    { title: "Underwriting and Service Officer", salary: null, tags: [FT, "1-3 tahun", "+5"] },
    { title: "Commercial Business Messenger", salary: null, tags: [FT, "Minimal SMA/SMK"] } ] },
  { id: "c6", name: "PT BFI Finance Indonesia, Tbk", location: "Tangerang Selatan, Banten", industry: "Financial Services", openJobs: 28, premium: true, positions: [
    { title: "Credit Marketing Syariah Multiguna", salary: "Rp 4-5jt", tags: [FT, "1-3 tahun", "+1"] },
    { title: "Staff Marketing Lapangan (ARE)", salary: "Rp 2,7-3jt", tags: [FT, "1-3 tahun", "+1"] } ] },
  { id: "c7", name: "PT. Transcosmos Indonesia", location: "Jakarta Pusat, DKI Jakarta", industry: "Outsourcing/Offshoring", openJobs: 13, premium: true, positions: [
    { title: "Customer Service (English Language)", salary: null, tags: [FT, "Minimal Sarjana (S1)"] },
    { title: "Customer Service (Spanish Language)", salary: null, tags: [FT, "1-3 tahun", "+1"] } ] },
  { id: "c8", name: "PT. Artha Dana Teknologi (Indodana)", location: "Jakarta Pusat, DKI Jakarta", industry: "Financial Services", openJobs: 16, premium: true, positions: [
    { title: "Sales Promoter Team Leader", salary: null, tags: [FT, "1-3 tahun", "+8"] },
    { title: "Sales Promoter (SPG/SPB)", salary: null, tags: [FT, "Minimal SMA/SMK", "+5"] } ] },
  { id: "c9", name: "PT K24 Indonesia", location: "Yogyakarta, DI Yogyakarta", industry: "Pharmaceuticals", openJobs: 6, premium: false, positions: [
    { title: "Coordinator Legal Contract", salary: "Rp 4-6jt", tags: [FT, "3-5 tahun", "+4"] },
    { title: "Tenaga Vokasi Farmasi", salary: null, tags: [FT, "Minimal Diploma", "+10"] } ] },
];

/* -------------------------------------------------------------------------- */
/* Data tambahan untuk halaman beranda detail                                 */
/* -------------------------------------------------------------------------- */

export type CategoryGroup = { id: string; name: string; subs: string[] };

const CATEGORY_SEED: [string, string[]][] = [
  ["Administrasi & HRD", ["Admin"]],
  ["Akuntansi", ["Akuntansi"]],
  ["Business Development & Sales", []],
  ["Desain", ["Desain Non-Visual"]],
  ["Hotel & Travel", ["Perhotelan", "Tour & Travel"]],
  ["Industri Jasa", ["Salon & Spa", "Kebersihan"]],
  ["Keuangan", ["Analis Keuangan", "Perpajakan"]],
  ["Komputer & Perangkat Lunak", ["Frontend", "Backend", "QA"]],
  ["Konstruksi & Bangunan", ["Arsitek", "Sipil"]],
  ["Konsultan", ["Manajemen"]],
  ["Layanan Pelanggan", ["Customer Service"]],
  ["Manufaktur", ["Produksi", "QC"]],
  ["Marketing", ["Digital Marketing", "Content"]],
  ["Media & Komunikasi", ["Public Relations"]],
  ["Pendidikan", ["Guru", "Dosen"]],
  ["Kesehatan", ["Perawat", "Farmasi"]],
  ["Logistik & Supply Chain", ["Gudang", "Kurir"]],
  ["Hukum", ["Legal"]],
  ["Properti", ["Agen Properti"]],
  ["Retail", ["Kasir", "Merchandiser"]],
  ["Makanan & Minuman", ["Koki", "Barista"]],
  ["Teknik", ["Mesin", "Listrik"]],
  ["Sains", ["Laboratorium"]],
  ["Pertanian", ["Perkebunan"]],
  ["Seni & Hiburan", ["Fotografi", "Video"]],
  ["Otomotif", ["Mekanik"]],
  ["Energi & Pertambangan", ["Migas"]],
  ["Pemerintahan", []],
  ["Telekomunikasi", ["Jaringan"]],
  ["Asuransi & Perbankan", ["Teller", "Agen"]],
];

export const CATEGORY_GROUPS: CategoryGroup[] = CATEGORY_SEED.map(([name, subs], i) => ({
  id: `cat-${i + 1}`,
  name,
  subs,
}));
export const CATEGORY_PAGE_SIZE = 5;

export type City = { slug: string; name: string; image: string };

export const CITIES: City[] = [
  { slug: "dki-jakarta", name: "DKI Jakarta", image: "/assets/kota/jakarta.jpg" },
  { slug: "banten", name: "Banten", image: "/assets/kota/banten.jpg" },
  { slug: "bandung", name: "Bandung", image: "/assets/kota/bandung.jpg" },
  { slug: "bekasi", name: "Bekasi", image: "/assets/kota/bekasi.jpg" },
  { slug: "surabaya", name: "Surabaya", image: "/assets/kota/surabaya.jpg" },
  { slug: "bogor", name: "Bogor", image: "/assets/kota/bogor.jpg" },
  { slug: "bali", name: "Bali", image: "/assets/kota/bali.jpg" },
  { slug: "di-yogyakarta", name: "DI Yogyakarta", image: "/assets/kota/yogyakarta.jpg" },
];

export const POPULAR_TAGS = [
  "Admin",
  "Human Resources (HR)",
  "Akuntansi",
  "Marketing",
  "Content Creator",
  "Staff Operasional Sales",
];

export const POPULAR_SEARCH_TABS = [
  { slug: "posisi", label: "Posisi Pekerjaan" },
  { slug: "kategori", label: "Kategori Pekerjaan" },
  { slug: "lokasi", label: "Lokasi" },
  { slug: "kata-kunci", label: "Kata Kunci" },
] as const;

// Urutan baris demi baris (3 kolom x 5 baris)
export const POPULAR_SEARCHES: Record<string, string[]> = {
  posisi: [
    "Loker Penulis", "Loker Rekruter", "Loker Customer Service",
    "Loker Akuntan", "Loker Manager Sales", "Loker Sales Executive",
    "Loker Manajer Akun", "Loker Desainer UI/UX", "Loker Editor Video & Film",
    "Loker Digital Marketing Manager", "Loker Developer Frontend", "Loker Pengembang Backend",
    "Loker Developer Android", "Loker Desainer Grafis & Brand", "Loker Manajer Perkantoran",
  ],
  kategori: [
    "Loker Administrasi & HRD", "Loker Akuntansi", "Loker Desain",
    "Loker Hotel & Travel", "Loker Keuangan", "Loker Komputer & Perangkat Lunak",
    "Loker Konstruksi & Bangunan", "Loker Layanan Pelanggan", "Loker Manufaktur",
    "Loker Marketing", "Loker Media & Komunikasi", "Loker Pendidikan",
    "Loker Kesehatan", "Loker Logistik & Supply Chain", "Loker Retail",
  ],
  lokasi: [
    "Loker Jakarta", "Loker Bandung", "Loker Surabaya",
    "Loker Tangerang", "Loker Bekasi", "Loker Bogor",
    "Loker Depok", "Loker Semarang", "Loker Yogyakarta",
    "Loker Bali", "Loker Medan", "Loker Makassar",
    "Loker Cirebon", "Loker Malang", "Loker Palembang",
  ],
  "kata-kunci": [
    "Loker Fresh Graduate", "Loker Remote", "Loker Part Time",
    "Loker Magang", "Loker Freelance", "Loker Gaji Tinggi",
    "Loker Tanpa Pengalaman", "Loker SMA/SMK", "Loker Lulusan S1",
    "Loker Work From Home", "Loker Walk In Interview", "Loker BUMN",
    "Loker Shift Malam", "Loker Penempatan Luar Kota", "Loker Karyawan Tetap",
  ],
};