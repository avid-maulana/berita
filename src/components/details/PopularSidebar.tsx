import Link from "next/link";

import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";

interface Props {
  news: NewsItem[];
}

export default function PopularSidebar({
  news,
}: Props) {
  return (
    <div className="sticky top-28">

      {/* Heading */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-sky-500" />

        <h2 className="text-2xl font-bold text-slate-900">
          Berita Terpopuler
        </h2>
      </div>

      {/* List */}
      <div className="space-y-6">
        {news.map((item, index) => (
          <Link
            href={`/berita/${slugify(item.title)}`}
            key={item.link}
            className="group flex gap-4 border-b border-slate-200 pb-6 last:border-none"
          >
            {/* Number */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl">

              <img
                src={item.image.large}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            {/* Content */}
            <div className="flex flex-col">

              <h3 className="line-clamp-3 text-sm font-semibold leading-6 text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
                {item.title}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-xs">

                <span className="font-medium capitalize text-sky-600">
                  {item.category}
                </span>

                <span className="text-slate-400">•</span>

                <span className="text-slate-500">
                  {new Date(item.isoDate).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

              </div>

            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}