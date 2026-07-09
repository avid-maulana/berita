import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import PopularSection from "@/components/home/PopularSection";
import RecommendationSection from "@/components/home/RecommendationSection";
import BannerSlider from "@/components/home/BannerSlider";
import Pagination from "@/components/home/Pagination";
import ScrollToSection from "@/components/shared/ScrollToSection";

import { NewsAPI } from "@/lib/api";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({
  searchParams,
}: Props) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const response = await NewsAPI.latest();

  const news = response.data;

  const ITEMS_PER_PAGE = 8;

  // Hero menggunakan berita pertama
  const heroNews = news[0];

  // Berita setelah hero
  const remainingNews = news.slice(1);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedNews = remainingNews.slice(start, end);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <Hero news={heroNews} />

        {/* Banner */}
        <BannerSlider
          news={news.slice(0, 5)}
        />

        {/* Berita Populer */}
        <PopularSection
          news={news.slice(1, 4)}
        />
<ScrollToSection
  targetId="recommendation"
/>

<RecommendationSection
  news={paginatedNews}
/>
        {/* Rekomendasi */}
        <RecommendationSection
          news={paginatedNews}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={remainingNews.length}
          itemsPerPage={ITEMS_PER_PAGE}
          basePath="/"
        />
      </main>

      <Footer />
    </>
  );
}