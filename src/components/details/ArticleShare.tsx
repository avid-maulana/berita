"use client";

import {
  Share2,
  MessageCircle,
  Link2,
  Send,
} from "lucide-react";

interface Props {
  title: string;
}

export default function ArticleShare({
  title,
}: Props) {
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);

    alert("Link berhasil disalin");
  };

  return (
    <section className="mt-14 border-y border-slate-200 py-8">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Bagikan Artikel
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {title}
          </h3>

        </div>

        <div className="flex items-center gap-3">

          <button className="flex h-12 w-12 items-center justify-center rounded-full border transition hover:border-sky-500 hover:bg-sky-500 hover:text-white">
            <Share2 size={20} />
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-full border transition hover:border-sky-500 hover:bg-sky-500 hover:text-white">
            <MessageCircle size={20} />
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-full border transition hover:border-sky-500 hover:bg-sky-500 hover:text-white">
            <Send size={20} />
          </button>

          <button
            onClick={copyLink}
            className="flex h-12 w-12 items-center justify-center rounded-full border transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
          >
            <Link2 size={20} />
          </button>

        </div>

      </div>

    </section>
  );
}