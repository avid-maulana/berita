import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

import Container from "@/components/ui/Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container>
        {/* PERBAIKAN: 
          - overflow-x-auto: mengaktifkan scroll horizontal jika konten meluap
          - whitespace-nowrap: memaksa konten tetap dalam satu baris horizontal
          - scrollbar-none (opsional): menyembunyikan scrollbar standar di Chrome/Safari/Firefox
        */}
        <div className="flex h-14 items-center gap-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-none py-1">
          
          {/* shrink-0 ditambahkan agar ikon & teks 'Beranda' tidak gepeng saat discroll */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-slate-500 transition hover:text-sky-600"
          >
            <House size={16} />
            <span>Beranda</span>
          </Link>

          {items.map((item, index) => (
            /* shrink-0 ditambahkan pada container per item */
            <div
              key={index}
              className="flex shrink-0 items-center gap-2"
            >
              <ChevronRight
                size={16}
                className="text-slate-400 shrink-0"
              />

              {item.href ? (
                <Link
                  href={item.href}
                  className="text-slate-500 transition hover:text-sky-600"
                >
                  {item.label}
                </Link>
              ) : (
                /* Menambahkan max-w untuk item terakhir agar tidak terlalu panjang jika judul berita sangat panjang */
                <span className="font-medium text-slate-900 max-w-[200px] sm:max-w-xs md:max-w-none truncate">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}