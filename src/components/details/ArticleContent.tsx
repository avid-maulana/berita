import Image from "next/image";
import { NewsItem } from "@/types/news";

interface Props {
  article: NewsItem;
}

export default function ArticleContent({ article }: Props) {
  const paragraphs = [
    article.contentSnippet,
    "Hingga saat ini, tim redaksi masih terus mengumpulkan informasi tambahan dan melakukan verifikasi lebih lanjut terkait pengumpulan data di lapangan guna memastikan akurasi informasi yang disajikan.",
    "Pihak-pihak terkait dikabarkan telah memberikan respons awal, dan pembaruan berkala mengenai situasi ini akan terus disiarkan begitu mendapat pernyataan resmi berikutnya.",
  ];

  return (
    <article className="mt-6 md:mt-10 max-w-3xl mx-auto">
      {/* Cover Image Container */}
      <figure className="group">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-slate-100 aspect-[16/10] sm:aspect-[16/9]">
          <Image
            src={article.image.large}
            alt={article.title}
            fill
            priority
            sizes="(max-w: 768px) 100vw, (max-w: 1200px) 75vw, 800px"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {/* Keterangan Gambar */}
        <figcaption className="mt-3 px-1 text-xs md:text-sm leading-relaxed text-slate-500 border-l-2 border-slate-200 pl-3">
          Foto: Dok. Berita Kini — <span className="italic">{article.title}</span>
        </figcaption>
      </figure>

      {/* Konten Utama Artikel */}
      <div className="mt-8 md:mt-12 space-y-6 text-slate-800">
        
        {/* Paragraf pembuka / Lead Paragraph */}
        <p className="text-base font-medium leading-relaxed sm:text-lg sm:leading-8 text-slate-900">
          Kategori: <span className="capitalize text-sky-600 font-semibold">{article.category}</span> — {article.contentSnippet}
        </p>

        {/* Perulangan Paragraf Isi Dummy yang Terlihat Alami */}
        {paragraphs.slice(1).map((para, index) => (
          <p 
            key={index} 
            className="text-sm leading-7 sm:text-base sm:leading-8 text-slate-700 font-normal"
          >
            {para}
          </p>
        ))}

        {/* Kutipan Penting (Blockquote) */}
        <blockquote className="my-8 rounded-r-xl border-l-4 border-sky-500 bg-sky-50/70 p-5 md:p-6 text-base md:text-lg italic font-medium text-slate-800 leading-relaxed">
          &ldquo;{article.contentSnippet}&rdquo;
        </blockquote>

        <p className="text-sm leading-7 sm:text-base sm:leading-8 text-slate-700">
          Ikuti terus perkembangan berita utama lainnya di <span className="font-semibold">Berita Kini</span> untuk mendapatkan asupan informasi terpercaya dan aktual langsung dari genggaman Anda.
        </p>
      </div>
    </article>
  );
}