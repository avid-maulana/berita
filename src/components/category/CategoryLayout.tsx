import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScrollToSection from "@/components/shared/ScrollToSection";

import CategoryHeader from "./CategoryHeader";
import CategoryNewsGrid from "./CategoryNewsGrid";

import Pagination from "@/components/home/Pagination";

import { NewsItem } from "@/types/news";

interface Props {
  title: string;
  description: string;
  news: NewsItem[];

  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  basePath: string;
}

export default function CategoryLayout({
  title,
  description,
  news,
  currentPage,
  totalItems,
  itemsPerPage,
  basePath,
}: Props) {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          {
            label: title,
          },
        ]}
      />

      <CategoryHeader
        title={title}
        description={description}
      />
<ScrollToSection
  targetId="category-news"
/>

<CategoryNewsGrid
  news={news}
/>
      <CategoryNewsGrid
        news={news}
      />

      <Pagination
  currentPage={currentPage}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  basePath={basePath}
/>

      <Footer />
    </>
  );
}