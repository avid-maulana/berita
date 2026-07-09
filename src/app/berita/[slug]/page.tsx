import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";

import ArticleShare from "@/components/details/ArticleShare";
import ArticleNavigation from "@/components/details/ArticleNavigation";
import ArticleHeader from "@/components/details/ArticleHeader";
import ArticleContent from "@/components/details/ArticleContent";
import PopularSidebar from "@/components/details/PopularSidebar";
import CommentSection from "@/components/details/CommentSection";
import RelatedNews from "@/components/details/RelatedNews";

import Container from "@/components/ui/Container";

import { NewsAPI } from "@/lib/api";
import { slugify } from "@/lib/slug";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params;

  const allNews = await NewsAPI.all();

  const article = allNews.find(
    (item) => slugify(item.title) === slug
  );

  if (!article) {
    notFound();
  }

  const relatedNews = allNews
    ? allNews
        .filter(
          (item) =>
            item.category === article.category &&
            item.title !== article.title
        )
        .slice(0, 4)
    : [];

  const popularNews = allNews
    ? allNews
        .filter((item) => item.title !== article.title)
        .slice(0, 5)
    : [];

  return (
  <>
    <Navbar />

    <Breadcrumb
      items={[
        {
          label: "Beranda",
          href: "/",
        },
        {
          label: article.category,
          href: `/${article.category.toLowerCase()}`,
        },
        {
          label: article.title,
        },
      ]}
    />

    <Container>
      <div className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">

        {/* Main Content */}
        <main className="min-w-0">

          <ArticleHeader article={article} />

          <ArticleContent article={article} />

          {/* Share */}
          <ArticleShare
            title={article.title}
          />

          {/* Previous & Next */}
          <ArticleNavigation
            previous={allNews.find(
              (item) =>
                item.title !== article.title
            )}
            next={allNews.find(
              (item) =>
                item.title !== article.title &&
                item.link !==
                  allNews.find(
                    (i) =>
                      i.title !== article.title
                  )?.link
            )}
          />

          {/* Comment */}
          <div className="mt-14">
            <CommentSection />
          </div>

          {/* Related */}
          <div className="mt-16">
            <RelatedNews
              news={relatedNews}
            />
          </div>

        </main>

        {/* Sidebar */}
        <aside className="h-fit lg:sticky lg:top-28">
          <PopularSidebar
            news={popularNews}
          />
        </aside>

      </div>
    </Container>

    <Footer />
  </>
);
}