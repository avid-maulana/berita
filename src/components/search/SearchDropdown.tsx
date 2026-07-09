import SearchItem from "./SearchItem";
import SearchEmpty from "./SearchEmpty";

import { NewsItem } from "@/types/news";

interface Props {
  news: NewsItem[];
}

export default function SearchDropdown({
  news,
}: Props) {
  if (!news.length) {
    return <SearchEmpty />;
  }

  return (
    <div className="max-h-[420px] overflow-y-auto">

      {news.slice(0, 6).map((item) => (
        <SearchItem
          key={item.link}
          news={item}
        />
      ))}

    </div>
  );
}