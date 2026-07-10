import Link from "next/link";

import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";

interface Props {
  news: NewsItem;
}

export default function NewsCard({ news }: Props) {
  return (
    <article className="group">
      <Link
        href={`/berita/${slugify(news.title)}`}
        className="block"
      >
        {/* Image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={news.image.large}
            alt={news.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="pt-5">
          <h3 className="line-clamp-2 text-lg font-semibold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
            {news.title}
          </h3>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="font-medium capitalize text-sky-600">
  {news.category}
</span>

            <span className="text-slate-400">•</span>

            <span className="text-slate-500">
              {new Date(news.isoDate).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}