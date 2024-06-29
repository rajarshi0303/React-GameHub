import React, { lazy } from "react";

import HomeHero from "../components/home/HomeHero";

const ReleasedGamesSlider = lazy(() =>
  import("@/components/home/ReleasedGamesSlider")
);
const JustForGamers = lazy(() => import("@/components/home/JustForGamers"));
const FeaturedGames = lazy(() => import("@/components/home/FeaturedGames"));
const Banner = lazy(() => import("@/components/home/Banner"));
const LatestNewsArticles = lazy(() =>
  import("@/components/home/LatestNewsArticles")
);
const FeaturedStore = lazy(() => import("@/components/home/FeaturedStore"));

import LazyComponent from "@/components/common/LazyComponent";

export default function HomePage() {
  return (
    <div className="bg-gray-950">
      <HomeHero />

      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <ReleasedGamesSlider />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <JustForGamers />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <FeaturedGames />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <Banner />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <FeaturedStore />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <LatestNewsArticles />
      </LazyComponent>
    </div>
  );
}
