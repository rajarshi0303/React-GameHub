import React, { lazy } from "react";

import NewsHero from "@/components/news/NewsHero";
const TrendingNews = lazy(() => import("@/components/news/TrendingNews"));
const LatestNews = lazy(() => import("@/components/news/LatestNews"));
const FeaturedArticles = lazy(() =>
  import("@/components/news/FeaturedArticles")
);

import LazyComponent from "@/components/common/LazyComponent";

export default function NewsPage() {
  return (
    <div className="bg-gray-950">
      <NewsHero />
      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <TrendingNews />
      </LazyComponent>
      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <LatestNews />
      </LazyComponent>
      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <FeaturedArticles />
      </LazyComponent>
    </div>
  );
}
