import { NewsItem, NewsResponse } from "@/types/news";

const BASE_URL = "https://berita-indo-api-next.vercel.app/api";

export const SOURCES = {
  cnn: "cnn-news",
  cnbc: "cnbc-news",
} as const;

export type NewsSource = keyof typeof SOURCES;

export const CATEGORY_MAP = {
  terbaru: {
    cnn: "",
    cnbc: "",
  },

  nasional: {
    cnn: "nasional",
    cnbc: "news",
  },

  internasional: {
    cnn: "internasional",
    cnbc: "news",
  },

  ekonomi: {
    cnn: "ekonomi",
    cnbc: "market",
  },

  olahraga: {
    cnn: "olahraga",
    cnbc: "news",
  },

  teknologi: {
    cnn: "teknologi",
    cnbc: "tech",
  },

  hiburan: {
    cnn: "hiburan",
    cnbc: "lifestyle",
  },

  "gaya-hidup": {
    cnn: "gaya-hidup",
    cnbc: "lifestyle",
  },
} as const;

type Category = keyof typeof CATEGORY_MAP;

async function fetchNews(
  category: Category = "terbaru",
  source: NewsSource = "cnn"
): Promise<NewsResponse> {
  const endpoint = SOURCES[source];
  const apiCategory = CATEGORY_MAP[category][source];

  const url = apiCategory
    ? `${BASE_URL}/${endpoint}/${apiCategory}`
    : `${BASE_URL}/${endpoint}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data: NewsResponse = await response.json();

  return {
    ...data,
    data: data.data.map((item) => ({
      ...item,
      category:
        category === "terbaru"
          ? "Terbaru"
          : category.charAt(0).toUpperCase() + category.slice(1),
    })),
  };
}

const categories: Category[] = [
  "terbaru",
  "nasional",
  "internasional",
  "ekonomi",
  "olahraga",
  "teknologi",
  "hiburan",
  "gaya-hidup",
];

export const NewsAPI = {
  latest: (source: NewsSource = "cnn") =>
    fetchNews("terbaru", source),

  category: (
    category: Category,
    source: NewsSource = "cnn"
  ) => fetchNews(category, source),

  all: async (
    source: NewsSource = "cnn"
  ): Promise<NewsItem[]> => {
    const responses = await Promise.all(
      categories.map((category) => fetchNews(category, source))
    );

    return responses.flatMap((item) => item.data);
  },
};