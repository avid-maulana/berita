import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { NewsItem } from "@/types/news";

interface Props {
  article: NewsItem;
}

export default function ArticleContent({
  article,
}: Props) {
  return (
    <article className="mx-auto mt-6 max-w-3xl md:mt-10">

      {/* Cover */}
      <figure className="group">

        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">

          <Image
            src={article.image.large}
            alt={article.title}
            fill
            priority
            sizes="(max-width:768px)100vw,800px"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />

        </div>

        <figcaption className="mt-3 border-l-2 border-slate-200 pl-3 text-xs text-slate-500 md:text-sm">
          Foto: Dokumentasi berita terkait —{" "}
          <span className="italic">
            {article.title}
          </span>
        </figcaption>

      </figure>

      {/* Content */}
      <div className="mt-10 space-y-8">

        <p className="text-lg font-medium leading-9 text-slate-900">
          {article.contentSnippet}
        </p>

        <blockquote className="rounded-r-xl border-l-4 border-sky-500 bg-sky-50 p-6 italic leading-8 text-slate-700">
          "{article.contentSnippet}"
        </blockquote>

        {/* Informasi */}
        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6">

          <h3 className="text-lg font-semibold text-slate-900">
            Informasi
          </h3>

          <p className="mt-3 leading-8 text-slate-600">
            Artikel ini merupakan ringkasan berita yang
            diperoleh melalui API berita. Karena sumber API
            tidak menyediakan isi artikel secara lengkap,
            hanya ringkasan yang dapat ditampilkan pada
            halaman ini.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Untuk membaca berita secara lengkap beserta
            informasi terbaru, silakan kunjungi sumber resmi
            dari media terkait.
          </p>

          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
          >
            Baca Artikel Lengkap
            <ExternalLink size={18} />
          </Link>

        </div>

      </div>

    </article>
  );
}