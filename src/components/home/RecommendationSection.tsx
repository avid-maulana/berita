import Container from "@/components/ui/Container";
import NewsCard from "@/components/cards/NewsCard";
import { NewsItem } from "@/types/news";

interface Props {
  news: NewsItem[];
}

export default function RecommendationSection({
  news,
}: Props) {
  return (
    <section
      id="recommendation"
      className="scroll-mt-28 pb-12 md:pb-20"
    >
      <Container>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:mb-12 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3">

            <div className="h-6 w-1 rounded-full bg-sky-500 md:h-8" />

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Rekomendasi Untuk Anda
            </h2>

          </div>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {news.map((item) => (
            <NewsCard
              key={item.link}
              news={item}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}