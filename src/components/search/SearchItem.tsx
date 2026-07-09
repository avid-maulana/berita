import Link from "next/link";

import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";

interface Props {
  news: NewsItem;
}

export default function SearchItem({
  news,
}: Props) {
  return (
    <Link
      href={`/berita/${slugify(news.title)}`}
      className="flex gap-4 rounded-xl p-3 transition hover:bg-slate-50"
    >
      <img
        src={news.image.small}
        alt={news.title}
        className="h-20 w-28 rounded-lg object-cover"
      />

      <div className="flex-1">

        <span className="text-xs font-medium capitalize text-sky-600">
          {news.category}
        </span>

        <h4 className="mt-1 line-clamp-2 font-semibold">
          {news.title}
        </h4>

        <p className="mt-2 text-xs text-slate-500">
          {new Date(news.isoDate).toLocaleDateString("id-ID")}
        </p>

      </div>
    </Link>
  );
}