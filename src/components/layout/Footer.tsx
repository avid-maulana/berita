import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";

const categories = [
  {
    name: "Terbaru",
    href: "/terbaru",
  },
  {
    name: "Nasional",
    href: "/nasional",
  },
  {
    name: "Internasional",
    href: "/internasional",
  },
  {
    name: "Olahraga",
    href: "/olahraga",
  },
  {
    name: "Hiburan",
    href: "/hiburan",
  },
];

const pages = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Tentang",
    href: "#",
  },
  {
    name: "Kebijakan Privasi",
    href: "#",
  },
  {
    name: "Disclaimer",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50">
      <Container className="py-16">

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">

          {/* Logo */}
          <div>

            <Link
              href="/"
              className="inline-flex"
            >
              <Image
                src="/images/logo-white.svg"
                alt="Berita Kini"
                width={180}
                height={42}
                className="h-11 w-auto"
              />
            </Link>

            <p className="mt-6 max-w-md leading-8 text-slate-600">
              Portal berita modern yang menyajikan informasi terbaru
              dari Indonesia dan dunia secara cepat, akurat, dan
              nyaman dibaca di berbagai perangkat.
            </p>

          </div>

          {/* Kategori */}
          <div>

            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Kategori
            </h3>

            <ul className="space-y-3">

              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 transition hover:text-sky-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Navigasi */}
          <div>

            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Navigasi
            </h3>

            <ul className="space-y-3">

              {pages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 transition hover:text-sky-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} Berita Kini. All Rights Reserved.
          </p>

          <p>
            Built with Next.js • TypeScript • Tailwind CSS
          </p>

        </div>

      </Container>
    </footer>
  );
}