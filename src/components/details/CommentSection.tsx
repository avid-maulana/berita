"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CornerDownRight } from "lucide-react";

const comments = [
  {
    id: 1,
    name: "Ujang Yusmeidi S.P., M.Agr.",
    avatar: "https://i.pravatar.cc/150?img=12",
    date: "28 Mar 2026 11:15",
    comment:
      "Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh? Karena saya mau download muncul konfirmasi TOTP aktivasi salah. Bagaimana solusinya?",
  },
  {
    id: 2,
    name: "Dina Rikha Riyanawati, S.Pd",
    avatar: "https://i.pravatar.cc/150?img=32",
    date: "28 Mar 2026 11:15",
    comment: "Saya mengunduh sertifikatnya kok juga belum bisa.",
  },
];

export default function CommentSection() {
  const [comment, setComment] = useState("");
  const CHARACTER_LIMIT = 500; // Mengubah limit agar muat kalimat panjang

  return (
    <section className="mt-14 border-t border-slate-100 pt-10">
      
      {/* Heading */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-sky-500" />
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
          Komentar Pembaca
        </h2>
      </div>

      {/* Form Input Komentar */}
      <div className="rounded-2xl border border-slate-200 p-4 md:p-6 bg-white shadow-sm">
        <div className="flex gap-3 md:gap-4">
          <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 overflow-hidden rounded-full bg-slate-100">
            <Image
              src="https://i.pravatar.cc/150?img=1"
              alt="Avatar Pengguna"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, CHARACTER_LIMIT))}
              placeholder="Tulis opini atau pertanyaan Anda di sini..."
              className="h-28 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm md:text-base text-slate-700 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />

            <div className="mt-3 flex items-center justify-between">
              <button 
                disabled={!comment.trim()}
                className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                Kirim Komentar
              </button>
              <span className={`text-xs ${comment.length >= CHARACTER_LIMIT ? "text-red-500 font-medium" : "text-slate-400"}`}>
                {comment.length}/{CHARACTER_LIMIT}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* List Komentar */}
      <div className="mt-8 divide-y divide-slate-100">
        {comments.map((item) => (
          <div key={item.id} className="py-6 first:pt-2">
            <div className="flex gap-3 md:gap-4">
              <div className="relative h-10 w-10 md:h-11 md:w-11 shrink-0 overflow-hidden rounded-full bg-slate-100">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs text-slate-400 sm:before:content-['•'] sm:before:mr-2">
                    {item.date}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
                  {item.comment}
                </p>

                <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 transition hover:text-sky-700">
                  <CornerDownRight size={14} />
                  Balas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}