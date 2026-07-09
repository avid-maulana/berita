import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-xl text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-100">
          <Newspaper
            size={42}
            className="text-sky-600"
          />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-extrabold text-slate-900">
          Berita Tidak Ditemukan
        </h1>

        <p className="mt-6 leading-8 text-slate-500">
          Maaf, berita yang kamu cari mungkin sudah dihapus,
          dipindahkan, atau URL yang dimasukkan tidak valid.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </Link>

          <Link
            href="/terbaru"
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:border-sky-600 hover:text-sky-600"
          >
            Lihat Berita Terbaru
          </Link>

        </div>

      </div>
    </main>
  );
}