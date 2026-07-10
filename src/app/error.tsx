"use client";

export default function Error({
    reset,
}:{
    reset:()=>void
}){

    return(

        <div className="flex h-screen items-center justify-center">

            <div className="text-center">

                <h1 className="text-4xl font-bold">
                    Terjadi Kesalahan
                </h1>

                <p className="mt-4 text-slate-500">
                    Gagal mengambil data berita.
                </p>

                <button
                    onClick={()=>reset()}
                    className="mt-8 rounded-xl bg-sky-600 px-6 py-3 text-white"
                >
                    Coba Lagi
                </button>

            </div>

        </div>

    )

}