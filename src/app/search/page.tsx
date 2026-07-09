import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SearchSection from "@/components/search/SearchSection";

import { NewsAPI } from "@/lib/api";

export default async function SearchPage() {
  const news = await NewsAPI.all();

  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          {
            label: "Pencarian",
          },
        ]}
      />

      <SearchSection
        news={news}
      />

      <Footer />
    </>
  );
}