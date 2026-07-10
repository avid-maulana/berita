export default function GlobalLoading() {
  return (
    <main className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-slate-50/50">
      <div className="flex flex-col items-center gap-8 p-4">
        
        {/* Windows Style Spinner — Dijamin Muncul */}
        <div className="windows-loader relative h-12 w-12">
          <div className="dot"><span className="bg-sky-600" /></div>
          <div className="dot"><span className="bg-sky-500" /></div>
          <div className="dot"><span className="bg-sky-400" /></div>
          <div className="dot"><span className="bg-sky-300" /></div>
          <div className="dot"><span className="bg-sky-200" /></div>
        </div>

        {/* Teks Pendukung dengan Kontras Tinggi */}
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-slate-800">
            Sedang menyiapkan halaman
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Mohon tunggu sebentar...
          </p>
        </div>

      </div>

      {/* Style tag khusus lokal agar tidak mengotori global CSS dan aman di Server Component */}
      <style>{`
        .windows-loader {
          position: relative;
          width: 48px;
          height: 48px;
        }
        .windows-loader .dot {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: rotate(225deg);
          animation: windows-spin 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .windows-loader .dot span {
          position: absolute;
          top: 0;
          left: 50%;
          width: 6px;
          height: 6px;
          transform: translateX(-50%);
          border-radius: 50%;
          display: block;
        }
        .windows-loader .dot:nth-child(1) { animation-delay: 0ms; }
        .windows-loader .dot:nth-child(2) { animation-delay: 150ms; }
        .windows-loader .dot:nth-child(3) { animation-delay: 300ms; }
        .windows-loader .dot:nth-child(4) { animation-delay: 450ms; }
        .windows-loader .dot:nth-child(5) { animation-delay: 600ms; }

        @keyframes windows-spin {
          0% { transform: rotate(225deg); opacity: 1; animation-timing-function: ease-out; }
          7% { transform: rotate(345deg); animation-timing-function: linear; }
          30% { transform: rotate(455deg); animation-timing-function: ease-in-out; }
          39% { transform: rotate(570deg); animation-timing-function: linear; }
          70% { transform: rotate(815deg); opacity: 1; animation-timing-function: ease-out; }
          75% { transform: rotate(945deg); animation-timing-function: ease-out; }
          76% { transform: rotate(945deg); opacity: 0; }
          100% { transform: rotate(945deg); opacity: 0; }
        }
      `}</style>
    </main>
  );
}