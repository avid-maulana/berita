import Container from "@/components/ui/Container";
import PopularCard from "@/components/cards/PopularCard";
import { NewsItem } from "@/types/news";

interface Props {
  news: NewsItem[];
}

export default function PopularSection({ news }: Props) {
  return (
    // PERBAIKAN SPACING VERTIKAL: py-12 di mobile agar lebih kompak, kembali ke py-20 di desktop
    <section className="py-12 md:py-20">
      <Container>
        
        {/* Section Header */}
        {/* PERBAIKAN MARGIN: mb-6 di mobile, mb-12 di desktop */}
        <div className="mb-6 md:mb-12 flex items-center gap-3">
          {/* h-6 di mobile, h-8 di desktop agar tingginya selaras dengan ukuran teks judul */}
          <div className="h-6 md:h-8 w-1 rounded-full bg-sky-500" />

          {/* PERBAIKAN TIPOGRAFI: text-2xl di mobile, md:text-3xl di desktop */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Berita Terpopuler
          </h2>
        </div>

        {/* Cards Grid */}
        {/* PERBAIKAN GRID & GAP:
          - grid-cols-1 secara default (mobile) agar kartu memanjang penuh
          - sm:grid-cols-2 di tablet/HP lebar (mengantisipasi layout melar)
          - lg:grid-cols-3 di desktop kembali ke layout aslimu
          - gap-6 di mobile agar antar kartu tidak terlalu jauh jaraknya, md:gap-10 di desktop
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {news.map((item, index) => (
            <PopularCard
              key={item.link}
              news={item}
              index={index + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}