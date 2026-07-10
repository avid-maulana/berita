import Container from "@/components/ui/Container";
import NewsCard from "@/components/cards/NewsCard";
import { NewsItem } from "@/types/news";

interface Props {
  news: NewsItem[];
}

export default function CategoryNewsGrid({
  news,
}: Props) {
  return (
    <section
      id="category-news"
      className="scroll-mt-28 pb-20"
    >
      <Container>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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