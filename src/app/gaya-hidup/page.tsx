import CategoryLayout from "@/components/category/CategoryLayout";
import { NewsAPI } from "@/lib/api";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function GayaHidupPage({
  searchParams,
}: Props) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const response = await NewsAPI.category("gaya-hidup");

  const ITEMS_PER_PAGE = 8;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedNews = response.data.slice(start, end);

  return (
    <CategoryLayout
      title="Gaya Hidup"
      description="Berita gaya hidup terbaru dari Indonesia dan dunia."
      news={paginatedNews}
      currentPage={currentPage}
      totalItems={response.data.length}
      itemsPerPage={ITEMS_PER_PAGE}
      basePath="/gaya-hidup"
    />
  );
}