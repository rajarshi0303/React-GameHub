import React from "react";
import { lazy } from "react";
import { useParams } from "react-router-dom";

import GameDetailsHero from "@/components/gamedetails/GameDetailsHero";

const GameDetailsSlider = lazy(() =>
  import("@/components/gamedetails/GameDetailsSlider")
);
const AboutGame = lazy(() => import("@/components/gamedetails/AboutGame"));
const GameFeatures = lazy(() =>
  import("@/components/gamedetails/GameFeatures")
);
const GameCharactersSlider = lazy(() =>
  import("@/components/gamedetails/GameCharactersSlider")
);
const GameFAQ = lazy(() => import("@/components/gamedetails/GameFAQ"));

import LazyComponent from "@/components/common/LazyComponent";

export default function GameDetails() {
  const { id } = useParams();
  return (
    <>
      <GameDetailsHero id={id} />

      <LazyComponent threshold={0.1}>
        <GameDetailsSlider id={id} />
      </LazyComponent>

      <LazyComponent threshold={0.1}>
        <AboutGame id={id} />
      </LazyComponent>

      <LazyComponent threshold={0.1}>
        <GameFeatures id={id} />
      </LazyComponent>

      <LazyComponent threshold={0.1}>
        <GameCharactersSlider id={id} />
      </LazyComponent>

      <LazyComponent threshold={0.1}>
        <GameFAQ id={id} />
      </LazyComponent>
    </>
  );
}
