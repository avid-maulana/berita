"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "@/components/ui/Container";

const categories = [
  { name: "Terbaru", href: "/terbaru" },
  { name: "Nasional", href: "/nasional" },
  { name: "Internasional", href: "/internasional" },
  { name: "Olahraga", href: "/olahraga" },
  { name: "Hiburan", href: "/hiburan" },
];

const pages = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "#" },
  { name: "Kebijakan Privasi", href: "#" },
  { name: "Disclaimer", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 md:mt-24">
      <Container className="py-12 md:py-16">

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[2fr_1fr_1fr]">
          
          {/* Logo & Deskripsi — Dipaksa mengambil 2 kolom penuh di mobile/tablet (col-span-2) */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="inline-flex transition active:scale-95"
            >
              <Image
                src="/images/logo-white.svg"
                alt="Berita Kini"
                width={180}
                height={42}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 md:text-base md:leading-8">
              Portal berita modern yang menyajikan informasi terbaru dari Indonesia dan dunia secara cepat, akurat, dan nyaman dibaca di berbagai perangkat.
            </p>
          </div>

          {/* Kategori — Sekarang otomatis di kolom 1 sebelah kiri */}
          <div className="col-span-1">
            <h3 className="mb-4 text-base font-semibold text-slate-900 md:text-lg">
              Kategori
            </h3>
            <ul className="space-y-2.5">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-slate-600 transition hover:text-sky-600 md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigasi — Sekarang otomatis mengisi kekosongan kolom 2 di sebelah kanan */}
          <div className="col-span-1">
            <h3 className="mb-4 text-base font-semibold text-slate-900 md:text-lg">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-slate-600 transition hover:text-sky-600 md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bagian bawah footer */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:text-sm md:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="order-2 md:order-1">
            © {new Date().getFullYear()} Berita Kini. All Rights Reserved.
          </p>
          <p className="order-1 md:order-2 text-slate-400">
            Built with Next.js • TypeScript • Tailwind CSS
          </p>
        </div>

      </Container>
    </footer>
  );
}