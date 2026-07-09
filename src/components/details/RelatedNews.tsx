import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NewsItem } from "@/types/news";

interface Props {
  news: NewsItem[];
}

export default function RelatedNews({ news }: Props) {
  return (
    <section className="mt-20 border-t border-slate-200 pt-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-sky-500" />

          <h2 className="text-2xl font-bold text-slate-900">
            Berita Terkait
          </h2>
        </div>

        <Link
          href="/terbaru"
          className="inline-flex items-center gap-2 rounded-xl border border-sky-500 px-4 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-600 hover:text-white"
        >
          Lihat Semua
          <ArrowRight size={16} />
        </Link>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {news.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            target="_blank"
            className="group"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">

              <Image
                src={item.image.large}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            {/* Content */}
            <div className="pt-4">

              <h3 className="line-clamp-2 text-lg font-semibold leading-7 text-slate-900 transition group-hover:text-sky-600">
                {item.title}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-sm">

                <span className="font-medium text-sky-600">
                  Nasional
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
    </section>
  );
}