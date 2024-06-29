import React from "react";
import { lazy } from "react";

import StoreHero from "@/components/store/StoreHero";

const PopularCatogeries = lazy(() =>
  import("@/components/store/PopularCatogeries")
);
const StoreFeatures = lazy(() => import("@/components/store/StoreFeatures"));
const StoreCTA = lazy(() => import("@/components/store/StoreCTA"));
const PopularProducts = lazy(() =>
  import("@/components/store/PopularProducts")
);
const NewProducts = lazy(() => import("@/components/store/NewProducts"));

import LazyComponent from "@/components/common/LazyComponent";

export default function Store() {
  return (
    <div>
      <StoreHero />

      <LazyComponent threshold={0.1} className="min-h-[200px]">
        <PopularCatogeries />
      </LazyComponent>

      <LazyComponent threshold={0.1}>
        <StoreFeatures />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[50px]">
        <StoreCTA
          bg_image="/public/images/store/cta/cta01_bg.jpg"
          image="/public/images/store/cta/cta01.png"
          discount="30"
          title="NewBand Wireless"
          name="Headset SD21"
          date="10 Jan to 28 Jan"
          company="Air Solo Bass"
          sale="Summer Sale"
          description=" This is a section of some simple filler text, also known as
        placeholder text Lorem ipsum dolor, sit amet consectetur
        adipisicing elit."
        />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[200px]">
        <PopularProducts />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[50px]">
        <StoreCTA
          bg_image="/public/images/store/cta/cta02_bg.png"
          image="/public/images/store/cta/cta02.png"
          discount="30"
          title="New Controller"
          name="Controller GS16"
          date="10 Jan to 28 Jan"
          company="Brand Bass"
          sale="Summer Sale"
          description=" This is a section of some simple filler text, also known as
        placeholder text Lorem ipsum dolor, sit amet consectetur
        adipisicing elit."
        />
      </LazyComponent>

      <LazyComponent threshold={0.1} className="min-h-[200px]">
        <NewProducts />
      </LazyComponent>
    </div>
  );
}
