import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import Container from "@/components/ui/Container";
import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";

interface HeroProps {
  news: NewsItem;
}

export default function Hero({ news }: HeroProps) {
  return (
    <section className="pb-12 pt-6 md:pb-20 md:pt-10">
      <Container>
        {/* Grid utama diatur menjadi single-column di mobile.
          Kita menggunakan flexbox atau grid internal untuk menyusun urutan elemen teks dan gambar.
        */}
        <div className="grid gap-6 items-center lg:grid-cols-[1fr_1.2fr] lg:gap-16">

          {/* LEFT CONTENT CONTAINER */}
          {/* Menggunakan kelas flex-col untuk kontrol urutan kustom via properti 'order' di mobile */}
          <div className="flex flex-col items-start min-w-0 w-full">
            
            {/* 1. Badge Headline (Order 1 di mobile) */}
            <span className="order-1 inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-xs md:text-sm font-semibold text-sky-600 tracking-wide">
              Headline
            </span>

            {/* 2. Judul Utama (Order 2 di mobile) */}
            <h1 className="order-2 mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
              {news.title}
            </h1>

            {/* 3. GAMBAR - TAMPIL DI SINI SAAT MOBILE (Order 3, tersembunyi di desktop) */}
            <div className="order-3 mt-6 w-full block lg:hidden">
              <Link
                href={`/berita/${slugify(news.title)}`}
                className="group block overflow-hidden rounded-2xl shadow-xl shadow-slate-100"
              >
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={news.image.large}
                    alt={news.title}
                    fill
                    priority
                    sizes="(max-w: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>

            {/* 4. Deskripsi Teks (Order 4 di mobile) */}
            <p className="order-4 mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-8">
              {news.contentSnippet}
            </p>

            {/* 5. Info Tanggal (Order 5 di mobile) */}
            <div className="order-5 mt-4 flex items-center gap-2 text-xs md:text-sm text-slate-400 font-medium">
              <CalendarDays size={16} className="text-slate-400" />
              <span>
                {new Date(news.isoDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* 6. Tombol Aksi (Order 6 di mobile) */}
            <Link
              href={`/berita/${slugify(news.title)}`}
              className="order-6 mt-8 inline-flex items-center gap-2.5 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/10 transition duration-300 hover:bg-sky-700 hover:shadow-lg active:scale-95 sm:text-base"
            >
              Baca Selengkapnya
              <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* DESKTOP IMAGE CONTAINER (Tersembunyi di mobile, aktif di lg:) */}
          <div className="hidden lg:block w-full">
            <Link
              href={`/berita/${slugify(news.title)}`}
              className="group block overflow-hidden rounded-[32px] shadow-xl shadow-slate-100"
            >
              <div className="relative w-full lg:h-[520px] overflow-hidden rounded-[32px] bg-slate-100">
                <Image
                  src={news.image.large}
                  alt={news.title}
                  fill
                  priority
                  sizes="(min-w: 1024px) 50vw, 700px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}