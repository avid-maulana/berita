import Container from "@/components/ui/Container";

export default function ArticleSlugLoading() {
  return (
    <>
      <div className="border-b border-slate-200 bg-slate-50">
        <Container>
          <div className="flex h-14 items-center gap-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-10 py-8 lg:grid-cols-[1fr_360px] lg:gap-14 lg:py-12">
          
          <main className="flex min-h-[45vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/20 p-8">
            <div className="flex flex-col items-center gap-8">
              
              {/* Windows Style Spinner — Dijamin Muncul */}
              <div className="windows-loader relative h-12 w-12">
                <div className="dot"><span className="bg-sky-600" /></div>
                <div className="dot"><span className="bg-sky-500" /></div>
                <div className="dot"><span className="bg-sky-400" /></div>
                <div className="dot"><span className="bg-sky-300" /></div>
                <div className="dot"><span className="bg-sky-200" /></div>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium tracking-wide text-slate-700">
                  Memuat Konten Berita
                </p>
              </div>

            </div>
          </main>

          <aside className="hidden space-y-6 lg:block">
            <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-16 w-24 shrink-0 animate-pulse rounded-lg bg-slate-200" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </aside>

        </div>
      </Container>

      {/* Style tag khusus lokal agar aman di Server Component */}
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
    </>
  );
}