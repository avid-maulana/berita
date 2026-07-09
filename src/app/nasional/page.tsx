import CategoryLayout from "@/components/category/CategoryLayout";
import { NewsAPI } from "@/lib/api";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function NasionalPage({
  searchParams,
}: Props) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const response = await NewsAPI.category("nasional");

  const ITEMS_PER_PAGE = 8;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedNews = response.data.slice(start, end);

  return (
    <CategoryLayout
      title="Nasional"
      description="Berita nasional terbaru dari seluruh Indonesia."
      news={paginatedNews}
      currentPage={currentPage}
      totalItems={response.data.length}
      itemsPerPage={ITEMS_PER_PAGE}
      basePath="/nasional"
    />
  );
}   