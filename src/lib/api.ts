import { NewsItem, NewsResponse } from "@/types/news";

const BASE_URL =
  "https://berita-indo-api-next.vercel.app/api/cnn-news";

async function fetchNews(
  endpoint = "",
  category?: string
): Promise<NewsResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
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
      category: category ?? "Terbaru",
    })),
  };
}

const categories = [
  "terbaru",
  "nasional",
  "internasional",
  "hiburan",
  "gaya-hidup",
  "olahraga",
] as const;

export const NewsAPI = {
  latest: () => fetchNews("", "Terbaru"),

  category: (category: string) =>
    fetchNews(`/${category}`, category),

  all: async (): Promise<NewsItem[]> => {
    const responses = await Promise.all(
      categories.map((category) =>
        category === "terbaru"
          ? fetchNews("", "Terbaru")
          : fetchNews(`/${category}`, category)
      )
    );

    return responses.flatMap((item) => item.data);
  },
};