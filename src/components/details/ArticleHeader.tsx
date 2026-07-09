import { NewsItem } from "@/types/news";

interface Props {
  article: NewsItem;
}

export default function ArticleHeader({ article }: Props) {
  return (
    <>
      <span className="text-sm font-semibold text-sky-600 capitalize">
        {article.category}
      </span>

      <span className="ml-3 text-sm text-slate-400">
        {new Date(article.isoDate).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>

      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
        {article.title}
      </h1>
    </>
  );
}