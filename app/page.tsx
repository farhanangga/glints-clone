/**
 * Clone beranda Glints TapLoker (glints.com/id).
 *
 * Token desain: biru #1672E0 (hover #0F5FC2), biru muda #E3EEFB, oranye chip #FFEBD6/#E67E22,
 * emas #F5A800, border #E5E5E5. Container konten 1180px. Font Noto Sans.
 * Semua data section diambil lewat GET /api (lihat app/api/route.ts).
 */
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AppBanner } from "@/components/landingPage/AppBanner";
import { CategorySidebar } from "@/components/landingPage/CategorySidebar";
import { FeaturedJobs } from "@/components/landingPage/FeaturedJobs";
import { Hero } from "@/components/landingPage/Hero";
import { PopularCities } from "@/components/landingPage/PopularCities";
import { PopularCompanies } from "@/components/landingPage/PopularCompanies";
import { PopularSearches } from "@/components/landingPage/PopularSearches";
import { PromoPanel } from "@/components/landingPage/PromoPanel";
import { Container } from "@/components/ui/Container";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap";

export default function BerandaPage() {
  return (
    <div
      className="min-h-screen bg-[#f6f6f6] text-black antialiased"
      style={{ fontFamily: "'Noto Sans', system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      {/* React 19 memindahkan <link> ini ke <head> secara otomatis */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={FONT_URL} precedence="default" />

      <Navbar stickySearch />
      <Hero />
      <Container className="mt-6">
        <Container className="mt-6">
          <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-4 lg:grid-cols-[488px_minmax(0,1fr)] lg:gap-6">
            <CategorySidebar />
            <PromoPanel />
          </div>
        </Container>
      </Container>
      <div className="flex flex-col">
        <div className="order-2 lg:order-1">
          <FeaturedJobs />
        </div>
        <div className="order-1 lg:order-2">
          <PopularCompanies />
        </div>
      </div>
      <PopularCities />
      <AppBanner />
      <PopularSearches />
      <Footer />
    </div>
  );
}