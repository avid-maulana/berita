export interface NewsImage {
  small: string;
  large: string;
}

export interface NewsItem {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: string;

  /**
   * Ditambahkan saat fetch API
   * supaya setiap berita tahu berasal dari kategori mana
   */
  category: string;

  image: NewsImage;
}

export interface NewsResponse {
  message: string;
  total: number;
  data: NewsItem[];
}