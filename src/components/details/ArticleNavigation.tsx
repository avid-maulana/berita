import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";

interface Props {
  previous?: NewsItem;
  next?: NewsItem;
}

export default function ArticleNavigation({
  previous,
  next,
}: Props) {
  return (
    <section className="mt-14 border-y border-slate-200 py-10">

      <div className="mb-8 flex items-center gap-3">

        <div className="h-8 w-1 rounded-full bg-sky-500" />

        <h2 className="text-2xl font-bold text-slate-900">
          Jelajahi Artikel Lainnya
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Previous */}
        {previous ? (
          <Link
            href={`/berita/${slugify(previous.title)}`}
            className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:border-sky-500 hover:shadow-lg"
          >

            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">

              <Image
                src={previous.image.small}
                alt={previous.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            <div className="flex flex-1 flex-col">

              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-sky-600">
                <ArrowLeft size={16} />
                Artikel Sebelumnya
              </span>

              <h3 className="line-clamp-3 font-semibold leading-6 text-slate-900 transition group-hover:text-sky-600">
                {previous.title}
              </h3>

            </div>

          </Link>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <Link
            href={`/berita/${slugify(next.title)}`}
            className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:border-sky-500 hover:shadow-lg"
          >

            <div className="flex flex-1 flex-col text-right">

              <span className="mb-2 flex items-center justify-end gap-2 text-sm font-medium text-sky-600">
                Artikel Selanjutnya
                <ArrowRight size={16} />
              </span>

              <h3 className="line-clamp-3 font-semibold leading-6 text-slate-900 transition group-hover:text-sky-600">
                {next.title}
              </h3>

            </div>

            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">

              <Image
                src={next.image.small}
                alt={next.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

          </Link>
        ) : (
          <div />
        )}

      </div>

    </section>
  );
}