import Link from "next/link";

import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";

interface Props {
  news: NewsItem;
  index: number;
  divider?: boolean;
}

export default function PopularCard({
  news,
  index,
  divider,
}: Props) {
  return (
    <article
      className={`flex gap-5 ${
        divider ? "lg:border-r lg:border-slate-200 lg:pr-8" : ""
      }`}
    >
      {/* Number */}
      <div className="shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {index}
        </div>
      </div>

      {/* Thumbnail */}
      <Link
        href={`/berita/${slugify(news.title)}`}
        className="group h-24 w-28 shrink-0 overflow-hidden rounded-xl"
      >
        <img
          src={news.image.large}
          alt={news.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <Link
          href={`/berita/${slugify(news.title)}`}
          className="line-clamp-3 text-base font-semibold leading-6 text-slate-900 transition-colors duration-300 hover:text-sky-600"
        >
          {news.title}
        </Link>

        <div className="mt-auto flex items-center gap-2 pt-4 text-sm">
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
    </article>
  );
}