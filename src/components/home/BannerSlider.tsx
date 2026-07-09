"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import Container from "@/components/ui/Container";
import { NewsItem } from "@/types/news";
import { slugify } from "@/lib/slug";

interface Props {
  news: NewsItem[];
}

export default function BannerSlider({ news }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!news || news.length === 0) return null;

  return (
    <section className="pb-12 md:pb-24">
      <Container>
        <div className="group/banner relative w-full rounded-2xl md:rounded-[32px] overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              // realIndex aman dipakai di mode loop, beda sama activeIndex biasa
              setActiveIndex(swiper.realIndex);
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop
            className="w-full"
          >
            {news.map((item, index) => (
              <SwiperSlide key={item.link}>
                <Link
                  href={`/berita/${slugify(item.title)}`}
                  className="relative block overflow-hidden rounded-2xl md:rounded-[32px] w-full"
                >
                  <div className="relative w-full aspect-[16/11] sm:aspect-[16/9] md:h-[440px] md:aspect-auto">
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={item.image.large}
                        alt={item.title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                        className="object-cover scale-110 transition-transform duration-[6000ms] ease-out [.swiper-slide-active_&]:scale-100 group-hover/banner:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    <div className="absolute inset-0 flex items-end p-5 sm:p-8 md:p-12">
                      <div className="max-w-3xl min-w-0 w-full">
                        <span
                          className="inline-flex rounded-md bg-sky-500 px-2.5 py-1 text-[11px] md:text-sm font-semibold text-white tracking-wide uppercase
                          opacity-0 -translate-y-2 transition-all duration-700 ease-out delay-100
                          [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0"
                        >
                          {item.category || "Headline"}
                        </span>

                        <h2
                          className="mt-2 text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl lg:text-3xl tracking-tight line-clamp-2 drop-shadow-sm
                          opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200
                          [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0"
                        >
                          {item.title}
                        </h2>

                        <p
                          className="mt-3 hidden sm:block line-clamp-2 max-w-2xl text-xs md:text-sm lg:text-base leading-relaxed text-slate-200
                          opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300
                          [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0"
                        >
                          {item.contentSnippet}
                        </p>

                        <div
                          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-all duration-300 hover:bg-sky-500 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm
                          opacity-0 translate-y-4 transition-all duration-700 ease-out
                          [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0"
                          style={{ transitionDelay: "400ms" }}
                        >
                          <span className="inline-flex items-center gap-1.5 group">
                            Baca Selengkapnya
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrow navigation - desktop only */}
          <motion.button
            aria-label="Slide sebelumnya"
            onClick={() => swiperRef.current?.slidePrev()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur
            opacity-0 -translate-x-2 transition-all duration-300 group-hover/banner:opacity-100 group-hover/banner:translate-x-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            aria-label="Slide berikutnya"
            onClick={() => swiperRef.current?.slideNext()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur
            opacity-0 translate-x-2 transition-all duration-300 group-hover/banner:opacity-100 group-hover/banner:translate-x-0"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          {/* Pagination dots - React state, bukan DOM manipulation Swiper */}
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5">
            <AnimatePresence initial={false}>
              {news.map((item, index) => (
                <motion.button
                  key={item.link}
                  aria-label={`Ke slide ${index + 1}`}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className="h-2 rounded-full bg-white/50 transition-all duration-300"
                  animate={{
                    width: activeIndex === index ? 22 : 8,
                    backgroundColor: activeIndex === index ? "#0ea5e9" : "rgba(255,255,255,0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}