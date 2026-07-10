"use client";

import Link from "next/link";
import { Loader2, Search, X } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  mobile?: boolean;
  scrolled?: boolean;
  onActiveChange?: (active: boolean) => void;
}

export default function NavbarSearch({
  mobile = false,
  scrolled = false,
  onActiveChange,
}: Props) {
  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState("");
  const [focused, setFocused] = useState(false);

  const [news, setNews] = useState<NewsItem[]>([]);

  const [loading, setLoading] = useState(true);

  const debouncedKeyword = useDebounce(keyword, 250);

  // Search is "active" once the user taps in or starts typing.
  // On mobile this is what tells the Navbar to hide the logo
  // and let the search bar take over the row.
  const active = focused || keyword.length > 0;

  useEffect(() => {
    if (mobile) {
      onActiveChange?.(active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mobile]);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/search");

        const data = await res.json();

        setNews(data);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setKeyword("");
        setFocused(false);
      }
    }

    document.addEventListener(
      "mousedown",
      outside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        outside
      );
  }, []);

  const filteredNews = useMemo(() => {
    if (debouncedKeyword.length < 2)
      return [];

    const q =
      debouncedKeyword.toLowerCase();

    return news
      .filter((item) => {
        return (
          item.title
            .toLowerCase()
            .includes(q) ||
          item.contentSnippet
            .toLowerCase()
            .includes(q) ||
          item.category
            .toLowerCase()
            .includes(q)
        );
      })
      .slice(0, 6);
  }, [debouncedKeyword, news]);

  const showDropdown = keyword.length >= 2;

  // Mobile: transparent/glass style on the sky-600 scrolled header,
  // plain white style on the default header.
  const mobileInputClasses = scrolled
    ? "border-white/25 bg-white/15 text-white placeholder-white/60 focus:border-white/60 focus:bg-white/20"
    : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white";

  return (
    <div
      ref={wrapperRef}
      className={`relative ${
        mobile
          ? "w-full"
          : "w-[340px]"
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!filteredNews.length)
            return;

          router.push(
            `/berita/${slugify(
              filteredNews[0].title
            )}`
          );

          setKeyword("");
          inputRef.current?.blur();
        }}
        className={`relative transition-transform duration-300 ease-out ${
          mobile && focused
            ? "scale-[1.02]"
            : "scale-100"
        }`}
      >
        <Search
          size={18}
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            mobile
              ? scrolled
                ? "text-white/70"
                : "text-slate-400"
              : "text-slate-400"
          }`}
        />

        <input
          ref={inputRef}
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Cari berita..."
          className={`w-full rounded-xl border pl-11 pr-9 text-sm outline-none transition-all duration-300 ${
            mobile
              ? `h-11 ${mobileInputClasses} ${
                  focused ? "shadow-lg" : "shadow-none"
                }`
              : "h-11 border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-sky-500"
          }`}
        />

        <AnimatePresence>
          {(mobile ? active : keyword.length > 0) && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -45 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                setKeyword("");

                if (mobile) {
                  // Fully cancel: close the keyboard and let the
                  // Navbar collapse the search bar back down.
                  setFocused(false);
                  inputRef.current?.blur();
                } else {
                  inputRef.current?.focus();
                }
              }}
              aria-label={
                mobile
                  ? "Batalkan pencarian"
                  : "Bersihkan pencarian"
              }
              className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 ${
                mobile && scrolled
                  ? "text-white/70 hover:text-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 mt-3 overflow-hidden rounded-2xl border bg-white shadow-2xl"
          >

            {loading && (
              <div className="flex justify-center py-8">

                <Loader2
                  size={28}
                  className="animate-spin text-sky-600"
                />

              </div>
            )}

            {!loading &&
              filteredNews.length === 0 && (
                <div className="py-10 text-center text-sm text-slate-500">
                  Berita tidak ditemukan
                </div>
              )}

            {!loading &&
              filteredNews.map((item, index) => (
                <motion.div
                  key={item.link}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.03,
                  }}
                >
                  <Link
                    href={`/berita/${slugify(
                      item.title
                    )}`}
                    onClick={() =>
                      setKeyword("")
                    }
                    className="flex gap-3 border-b p-3 transition hover:bg-slate-50 last:border-none"
                  >
                    <img
                      src={item.image.small}
                      alt={item.title}
                      className="h-20 w-28 rounded-lg object-cover"
                    />

                    <div className="flex-1">

                      <span className="text-xs font-medium capitalize text-sky-600">
                        {item.category}
                      </span>

                      <h4 className="mt-1 line-clamp-2 text-sm font-semibold">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(
                          item.isoDate
                        ).toLocaleDateString("id-ID")}
                      </p>

                    </div>

                  </Link>
                </motion.div>
              ))}

            {!loading &&
              filteredNews.length > 0 && (
                <div className="border-t bg-slate-50 py-3 text-center text-xs text-slate-500">
                  Menampilkan{" "}
                  <strong>
                    {filteredNews.length}
                  </strong>{" "}
                  hasil
                </div>
              )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}