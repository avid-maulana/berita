"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  targetId: string;
}

export default function ScrollToSection({
  targetId,
}: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");

    if (!page) return;

    const timer = setTimeout(() => {
      document
        .getElementById(targetId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);

    return () => clearTimeout(timer);
  }, [searchParams, targetId]);

  return null;
}