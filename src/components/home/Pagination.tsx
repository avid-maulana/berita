"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  basePath: string;
  scrollTarget?: string;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  basePath,
  scrollTarget = "recommendation",
}: Props) {
  const router = useRouter();

  const totalPages = Math.ceil(
    totalItems / itemsPerPage
  );

  const firstItem =
    (currentPage - 1) * itemsPerPage + 1;

  const lastItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  const navigate = (page: number) => {
  router.push(`${basePath}?page=${page}`);
};

  return (
    <section className="pb-24">
      <Container>
        <div className="flex flex-col gap-6 border-t border-slate-200 pt-8 lg:flex-row lg:items-center lg:justify-between">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {firstItem} to {lastItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {totalItems}
            </span>{" "}
            results
          </p>

          <div className="flex flex-wrap items-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                navigate(
                  Math.max(1, currentPage - 1)
                )
              }
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                currentPage === 1
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {pages.map((page, index) => {
              if (page === "...") {
                return (
                  <MoreHorizontal
                    key={`ellipsis-${index}`}
                    size={18}
                    className="text-slate-400"
                  />
                );
              }

              return (
                <button
                  key={`${page}-${index}`}
                  onClick={() =>
                    navigate(page as number)
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                    currentPage === page
                      ? "bg-sky-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                navigate(
                  Math.min(
                    totalPages,
                    currentPage + 1
                  )
                )
              }
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                currentPage === totalPages
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>

          </div>
        </div>
      </Container>
    </section>
  );
}