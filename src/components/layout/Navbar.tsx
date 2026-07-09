"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

import Container from "@/components/ui/Container";
import NavbarSearch from "@/components/search/NavbarSearch";
import { NAVIGATION } from "@/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect untuk background navbar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu otomatis jika rute berpindah
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Mengunci scroll body saat menu terbuka
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* PERBAIKAN: Menambahkan 'border-b' default di header dan mengontrol warnanya 
        secara eksplisit menggunakan 'border-transparent' saat dicrop/scroll.
      */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "bg-sky-600 border-transparent shadow-xl"
            : "border-slate-200 bg-white/95 backdrop-blur-xl"
        }`}
      >
        <Container>
          <div className="flex h-20 items-center justify-between gap-3">

            {/* Logo — collapses out of view on mobile while search is active */}
            <Link
              href="/"
              aria-hidden={mobileSearchActive}
              tabIndex={mobileSearchActive ? -1 : undefined}
              className={`shrink-0 overflow-hidden transition-all duration-300 ease-out xl:!max-w-none xl:!opacity-100 xl:!scale-100 ${
                mobileSearchActive
                  ? "max-w-0 scale-90 opacity-0 pointer-events-none"
                  : "max-w-[160px] scale-100 opacity-100"
              }`}
            >
              <img
                src={
                  scrolled
                    ? "/images/logo-color.svg"
                    : "/images/logo-white.svg"
                }
                alt="Berita Kini"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 xl:flex">
              {NAVIGATION.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative pb-1 text-[15px] font-medium transition ${
                      active
                        ? scrolled
                          ? "text-white"
                          : "text-sky-600"
                        : scrolled
                        ? "text-white/80 hover:text-white"
                        : "text-slate-600 hover:text-sky-600"
                    }`}
                  >
                    {item.name}

                    <span
                      className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ${
                        active ? "w-full" : "w-0"
                      } ${scrolled ? "bg-white" : "bg-sky-600"}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Search */}
            <div className="hidden xl:block">
              <NavbarSearch scrolled={scrolled} />
            </div>

            {/* Mobile: logo _ [search icon] ____ input ____ _ hamburger */}
            <div className="flex min-w-0 flex-1 items-center gap-3 xl:hidden">

              <div className="min-w-0 flex-1">
                <NavbarSearch
                  mobile
                  scrolled={scrolled}
                  onActiveChange={setMobileSearchActive}
                />
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 active:scale-90 ${
                  scrolled
                    ? "border-white/20 text-white"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <Menu
                    size={20}
                    className={`absolute transition-all duration-300 ${
                      menuOpen
                        ? "rotate-90 opacity-0 scale-50"
                        : "rotate-0 opacity-100 scale-100"
                    }`}
                  />
                  <X
                    size={20}
                    className={`absolute transition-all duration-300 ${
                      menuOpen
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 opacity-0 scale-50"
                    }`}
                  />
                </span>
              </button>

            </div>

          </div>
        </Container>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`overflow-hidden transition-all duration-300 ease-out xl:hidden ${
            menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          } ${scrolled ? "bg-sky-600" : "bg-white"}`}
        >
          <Container>
            <nav className="flex flex-col gap-1 py-5">
              {NAVIGATION.map((item, index) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
                    }}
                    className={`rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                      menuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    } ${
                      active
                        ? scrolled
                          ? "bg-white/10 text-white"
                          : "bg-sky-50 text-sky-600"
                        : scrolled
                        ? "text-white hover:bg-white/10"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>
      </header>

      {/* Backdrop overlay untuk menutup menu saat diklik di luar */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm xl:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}