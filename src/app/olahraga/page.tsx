import CategoryLayout from "@/components/category/CategoryLayout";
import { NewsAPI } from "@/lib/api";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function OlahragaPage({
  searchParams,
}: Props) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const response = await NewsAPI.category("olahraga");

  const ITEMS_PER_PAGE = 8;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedNews = response.data.slice(start, end);

  return (
    <CategoryLayout
      title="Olahraga"
      description="Berita olahraga terbaru dari dalam dan luar negeri."
      news={paginatedNews}
      currentPage={currentPage}
      totalItems={response.data.length}
      itemsPerPage={ITEMS_PER_PAGE}
      basePath="/olahraga"
    />
  );
}