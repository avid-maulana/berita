import { SearchX } from "lucide-react";

export default function SearchEmpty() {
  return (
    <div className="py-12 text-center">

      <SearchX
        size={36}
        className="mx-auto text-slate-400"
      />

      <h3 className="mt-4 font-semibold">
        Berita tidak ditemukan
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Coba gunakan kata kunci lain.
      </p>

    </div>
  );
}