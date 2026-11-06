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

// Grup role untuk flyout sidebar kategori (panel di kanan saat kategori di-hover).
export type RoleGroup = { title: string; roles: string[] };

export type CategoryGroup = {
  id: string;
  name: string;
  subs: string[];
  roleGroups: RoleGroup[];
};

// [nama kategori, subs di sidebar, [[judul grup flyout, [role...]], ...]]
// "Administrasi & HRD" disalin dari glints.com/id; sisanya perkiraan, silakan sesuaikan.
const CATEGORY_SEED: [string, string[], [string, string[]][]][] = [
  ["Administrasi & HRD", ["Admin"], [
    ["Admin", ["Admin", "Admin Data Entry", "Arsiparis", "General Affair", "Manager Administrasi", "Pengendali Dokumen", "Resepsionis", "Sekretaris"]],
    ["Human Resources (HR)", ["Direktur Human Resources (HR)", "Employer Branding Specialist", "HRBP", "Manager Human Resources (HR)", "Rekruter", "Spesialis Learning & Development", "Staf HRGA", "Staf Penggajian", "Staff HRD & Personalia"]],
  ]],
  ["Akuntansi", ["Akuntansi"], [
    ["Akuntansi", ["Akuntan", "Akuntan Pajak", "Auditor", "Kasir", "Manager Akuntansi", "Staf Akuntansi", "Staf Pajak", "Staf Penagihan"]],
  ]],
  ["Business Development & Sales", [], [
    ["Business Development", ["Business Development Executive", "Business Development Manager", "Partnership Manager", "Strategic Partnership"]],
    ["Sales", ["Account Executive", "Admin Sales", "Manager Penjualan", "Sales Executive", "Sales Marketing", "Staff Operasional Sales"]],
  ]],
  ["Desain", ["Desain Non-Visual"], [
    ["Desain Non-Visual", ["Arsitek", "Desainer Interior", "Product Designer", "UI/UX Designer", "UX Researcher", "UX Writer"]],
    ["Desain Visual", ["Desainer Grafis", "Desainer Kemasan", "Ilustrator", "Motion Graphic Designer"]],
  ]],
  ["Hotel & Travel", ["Perhotelan", "Tour & Travel"], [
    ["Perhotelan", ["Concierge", "Front Office", "Guest Relation", "Housekeeping", "Manager Hotel", "Reservasi Hotel", "Room Attendant"]],
    ["Tour & Travel", ["Staf Reservasi", "Staf Ticketing", "Tour Guide", "Tour Leader", "Tour Planner", "Travel Consultant", "Visa Officer"]],
  ]],
  ["Industri Jasa", ["Salon & Spa", "Kebersihan"], [
    ["Salon & Spa", ["Beautician", "Hairstylist", "Kapster", "Nail Artist", "Terapis Pijat", "Terapis Spa"]],
    ["Kebersihan", ["Cleaning Service", "Office Boy", "Petugas Kebersihan", "Staf Laundry", "Supervisor Kebersihan"]],
  ]],
  ["Keuangan", ["Analis Keuangan", "Perpajakan"], [
    ["Analis Keuangan", ["Analis Keuangan", "Financial Planner", "Manager Keuangan", "Staf Keuangan", "Staf Treasury"]],
    ["Perpajakan", ["Konsultan Pajak", "Manager Pajak", "Staf Pajak", "Tax Accountant"]],
  ]],
  ["Komputer & Perangkat Lunak", ["Frontend", "Backend", "QA"], [
    ["Frontend", ["Frontend Developer", "React Developer", "UI Developer", "Web Developer"]],
    ["Backend", ["Backend Developer", "Java Developer", "Node.js Developer", "Software Engineer"]],
    ["Mobile", ["Android Developer", "Flutter Developer", "iOS Developer"]],
    ["QA", ["QA Automation", "QA Engineer", "QA Tester"]],
  ]],
  ["Konstruksi & Bangunan", ["Arsitek", "Sipil"], [
    ["Arsitek", ["Arsitek", "Drafter", "Desainer Interior"]],
    ["Sipil", ["Estimator", "Insinyur Sipil", "Pelaksana Lapangan", "Project Manager Konstruksi", "Quantity Surveyor", "Site Engineer"]],
  ]],
  ["Konsultan", ["Manajemen"], [
    ["Manajemen", ["Business Analyst", "Business Consultant", "Konsultan Manajemen", "Management Trainee", "Project Manager"]],
  ]],
  ["Layanan Pelanggan", ["Customer Service"], [
    ["Customer Service", ["Call Center Agent", "Customer Care", "Customer Service", "Customer Service Online", "Customer Support", "Staf Helpdesk"]],
  ]],
  ["Manufaktur", ["Produksi", "QC"], [
    ["Produksi", ["Leader Produksi", "Operator Produksi", "PPIC", "Staf Produksi", "Supervisor Produksi"]],
    ["QC", ["Inspektur QC", "Staf QA", "Staf QC"]],
  ]],
  ["Marketing", ["Digital Marketing", "Content"], [
    ["Marketing", ["Brand Manager", "Manager Marketing", "Marketing Communication", "Staf Marketing"]],
    ["Digital Marketing", ["Digital Marketing Specialist", "Marketplace Specialist", "Performance Marketer", "SEO Specialist", "Social Media Specialist"]],
    ["Content", ["Content Creator", "Content Strategist", "Content Writer", "Copywriter"]],
  ]],
  ["Media & Komunikasi", ["Public Relations"], [
    ["Public Relations", ["Communication Specialist", "Corporate Communication", "Humas", "Public Relations"]],
    ["Media", ["Editor", "Jurnalis", "Penulis", "Penyiar", "Reporter"]],
  ]],
  ["Pendidikan", ["Guru", "Dosen"], [
    ["Guru", ["Guru Bahasa Inggris", "Guru Les Privat", "Guru Matematika", "Guru SD", "Guru TK", "Tutor"]],
    ["Dosen", ["Asisten Dosen", "Dosen Tetap", "Dosen Tidak Tetap", "Instruktur Pelatihan"]],
  ]],
  ["Kesehatan", ["Perawat", "Farmasi"], [
    ["Perawat", ["Bidan", "Caregiver", "Perawat", "Perawat Gigi"]],
    ["Farmasi", ["Admin Apotek", "Apoteker", "Asisten Apoteker", "Tenaga Vokasi Farmasi"]],
    ["Tenaga Medis", ["Analis Kesehatan", "Dokter Gigi", "Dokter Umum", "Fisioterapis", "Radiografer"]],
  ]],
  ["Logistik & Supply Chain", ["Gudang", "Kurir"], [
    ["Gudang", ["Admin Gudang", "Checker Gudang", "Operator Forklift", "Staf Gudang", "Supervisor Gudang"]],
    ["Kurir", ["Driver", "Kurir", "Staf Logistik", "Staf Pengiriman", "Supervisor Logistik"]],
  ]],
  ["Hukum", ["Legal"], [
    ["Legal", ["Compliance Officer", "Corporate Lawyer", "Legal Officer", "Paralegal", "Staf Legal"]],
  ]],
  ["Properti", ["Agen Properti"], [
    ["Agen Properti", ["Agen Properti", "Leasing Executive", "Marketing Properti", "Property Consultant", "Property Manager"]],
  ]],
  ["Retail", ["Kasir", "Merchandiser"], [
    ["Kasir", ["Kasir", "Pramuniaga", "Staf Toko", "Store Crew", "Store Manager"]],
    ["Merchandiser", ["Area Supervisor", "Merchandiser", "Sales Promoter (SPG/SPB)", "Staf Display", "Visual Merchandiser"]],
  ]],
  ["Makanan & Minuman", ["Koki", "Barista"], [
    ["Koki", ["Baker", "Commis", "Cook Helper", "Koki", "Pastry Chef"]],
    ["Barista", ["Barista", "Bartender", "Crew Restoran", "Manager Restoran", "Waiter/Waitress"]],
  ]],
  ["Teknik", ["Mesin", "Listrik"], [
    ["Mesin", ["Insinyur Mekanik", "Operator CNC", "Staf Maintenance", "Teknisi AC", "Teknisi Mesin"]],
    ["Listrik", ["Insinyur Elektro", "Teknisi Elektronika", "Teknisi Listrik"]],
  ]],
  ["Sains", ["Laboratorium"], [
    ["Laboratorium", ["Analis Laboratorium", "Asisten Laboratorium", "Chemist", "Peneliti", "Staf R&D", "Teknisi Laboratorium"]],
  ]],
  ["Pertanian", ["Perkebunan"], [
    ["Perkebunan", ["Agronomis", "Asisten Kebun", "Mandor Kebun", "Petugas Lapangan Pertanian", "Staf Budidaya", "Staf Perkebunan"]],
  ]],
  ["Seni & Hiburan", ["Fotografi", "Video"], [
    ["Fotografi", ["Asisten Fotografer", "Fotografer", "Photo Editor"]],
    ["Video", ["Kameramen", "Videografer", "Video Editor"]],
  ]],
  ["Otomotif", ["Mekanik"], [
    ["Mekanik", ["Mekanik Mobil", "Mekanik Motor", "Service Advisor", "Teknisi Otomotif"]],
    ["Penjualan Otomotif", ["Admin Dealer Motor", "Sales Otomotif"]],
  ]],
  ["Energi & Pertambangan", ["Migas"], [
    ["Migas", ["Geologist", "HSE Officer", "Operator Produksi Migas", "Petroleum Engineer", "Staf Migas", "Surveyor"]],
  ]],
  ["Pemerintahan", [], [
    ["Pemerintahan", ["Analis Kebijakan", "Staf Administrasi Pemerintahan", "Staf Kelurahan", "Tenaga Honorer"]],
  ]],
  ["Telekomunikasi", ["Jaringan"], [
    ["Jaringan", ["NOC Engineer", "Network Administrator", "Network Engineer", "Teknisi Fiber Optik", "Teknisi Jaringan"]],
  ]],
  ["Asuransi & Perbankan", ["Teller", "Agen"], [
    ["Teller", ["Analis Kredit", "Customer Service Bank", "Relationship Officer", "Staf Operasional Bank", "Teller"]],
    ["Agen", ["Agen Asuransi", "Financial Advisor", "Manager Agensi", "Staf Klaim", "Underwriter"]],
  ]],
];

export const CATEGORY_GROUPS: CategoryGroup[] = CATEGORY_SEED.map(([name, subs, groups], i) => ({
  id: `cat-${i + 1}`,
  name,
  subs,
  roleGroups: groups.map(([title, roles]) => ({ title, roles })),
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