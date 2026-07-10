"use client";

import {
  Share2,
  MessageCircle,
  Link2,
  Check,
  Send,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  title: string;
}

export default function ArticleShare({ title }: Props) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Mengamankan pembacaan window URL di Next.js Client Component
  const getUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      
      // Memicu animasi masuk ikon Check & Banner Toast
      setCopied(true);
      setShowToast(true);
    } catch (err) {
      console.error("Gagal menyalin tautan: ", err);
    }
  };

  // Efek otomatis menyembunyikan toast notification setelah beberapa detik
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // Reset ikon rantai kembali semula sesaat setelah toast menutup
      const iconTimer = setTimeout(() => {
        setCopied(false);
      }, 3300);

      return () => {
        clearTimeout(timer);
        clearTimeout(iconTimer);
      };
    }
  }, [showToast]);

  return (
    <>
      <section className="mt-14 border-y border-slate-200 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          
          {/* Teks Deskripsi Kiri */}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 md:text-sm">
              Bagikan Artikel
            </p>
            {/* Menggunakan text-xl di mobile dan line-clamp agar seimbang */}
            <h3 className="mt-2 text-xl font-bold text-slate-900 md:text-2xl line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Baris Tombol Media Sosial Kanan */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              aria-label="Bagikan ke Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500 hover:text-white active:scale-90"
            >
              <Share2 size={20} />
            </button>

            <button 
              aria-label="Bagikan ke WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white active:scale-90"
            >
              <MessageCircle size={20} />
            </button>

            <button 
              aria-label="Bagikan ke Telegram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all duration-300 hover:border-sky-400 hover:bg-sky-400 hover:text-white active:scale-90"
            >
              <Send size={20} />
            </button>

            {/* Tombol Salin Tautan Utama */}
            <button
              onClick={copyLink}
              disabled={showToast}
              aria-label="Salin tautan artikel"
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 active:scale-90 ${
                copied
                  ? "border-sky-500 bg-sky-500 text-white cursor-default"
                  : "border-slate-200 text-slate-600 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              }`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                {/* Ikon Rantai (Meluncur Berputar Keluar) */}
                <Link2
                  size={20}
                  className={`absolute transition-all duration-300 ease-in-out ${
                    copied ? "rotate-45 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                {/* Ikon Centang Sukses (Meluncur Berputar Masuk) */}
                <Check
                  size={20}
                  className={`absolute transition-all duration-300 ease-in-out ${
                    copied ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-50 opacity-0"
                  }`}
                />
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ANIMASI TOAST NOTIFICATION:
        - fixed bottom-6 / md:bottom-10: Posisinya melayang di dasar tengah layar agar mudah dilihat & dijangkau jempol.
        - cubic-bezier kustom + duration-500 memberikan efek meluncur lentur (spring effect) yang premium.
      */}
      <div
        className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3.5 rounded-2xl bg-slate-900/95 px-5 py-3.5 shadow-xl shadow-slate-900/10 backdrop-blur-md transition-all duration-500 ease-in-out sm:min-w-[320px] ${
          showToast
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
          <Check size={14} strokeWidth={3} />
        </div>
        
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-white tracking-wide">
            Berhasil Disalin!
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5 whitespace-nowrap">
            Tautan artikel siap dibagikan.
          </p>
        </div>
      </div>
    </>
  );
}