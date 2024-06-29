import React, { lazy } from "react";

import GamesPageSlider from "@/components/games/GamesPageSlider";
const GamesFilter = lazy(() => import("@/components/games/GamesFilter"));

import LazyComponent from "@/components/common/LazyComponent";

export default function Games() {
  return (
    <div className="bg-gray-950">
      <GamesPageSlider />
      <LazyComponent threshold={0.1} className="min-h-[400px]">
        <GamesFilter />
      </LazyComponent>
    </div>
  );
}
