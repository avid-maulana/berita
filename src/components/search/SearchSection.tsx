"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import Container from "@/components/ui/Container";
import NewsCard from "@/components/cards/NewsCard";

import { NewsItem } from "@/types/news";

interface Props {
  news: NewsItem[];
}

export default function SearchSection({
  news,
}: Props) {
  const [keyword, setKeyword] = useState("");

 const filteredNews = useMemo(() => {
  const keywordLower = keyword.toLowerCase();

  return news.filter((item) => {
    return (
      item.title.toLowerCase().includes(keywordLower) ||
      item.contentSnippet.toLowerCase().includes(keywordLower) ||
      item.category.toLowerCase().includes(keywordLower)
    );
  });
}, [keyword, news]);

  return (
    <section className="py-14">
      <Container>
        {/* Header */}
        <div className="mb-12">

          <h1 className="text-4xl font-bold text-slate-900">
            Pencarian Berita
          </h1>

          <p className="mt-3 text-slate-500">
            Cari berita berdasarkan judul.
          </p>

        </div>

        {/* Search */}
        <div className="relative mb-10">

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari berita..."
            className="w-full rounded-2xl border border-slate-200 py-4 pl-14 pr-5 outline-none transition focus:border-sky-500"
          />

        </div>

        {/* Result */}
        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Hasil Pencarian
          </h2>

          <span className="text-sm text-slate-500">
            {filteredNews.length} berita ditemukan
          </span>

        </div>

        {/* Empty */}
        {filteredNews.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              Berita tidak ditemukan
            </h3>

            <p className="mt-3 text-slate-500">
              Coba gunakan kata kunci yang lain.
            </p>
          </div>
        )}

        {/* Grid */}
        {filteredNews.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {filteredNews.map((item) => (
              <NewsCard
                key={item.link}
                news={item}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}