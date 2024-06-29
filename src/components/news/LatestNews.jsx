import React from "react";
import LatestNewsSlider from "./LatestNewsSlider";
import LatestArtical from "./LatestArtical";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function LatestNews() {
  return (
    <div
      className="mt-20 max-w-screen-2xl mx-auto "
      style={{
        backgroundImage: "url('/public/images/news/streaming_bg.jpg')",
      }}
    >
      <section className="pt-4 pb-8 mx-4 lg:mx-20">
        <div className="flex items-center justify-between ">
          <h1 className="my-4 text-base font-bold uppercase px-3 border-l-8 text-gray-100 border-amber-600 lg:text-xl">
            Latest News
          </h1>
        </div>
        <div className="grid grid-cols-2 space-x-4 md:grid-cols-12">
          <div className="relative overflow-hidden rounded-lg  col-span-4 row-span-2">
            <LatestNewsSlider />
          </div>
          <div className=" relative overflow-hidden rounded-lg bg-gray-950 col-span-4 row-span-2 space-y-4">
            <Card image="/public/images/news/stream_thumb02.jpg" />
            <Card image="/public/images/news/stream_thumb03.jpg" />
          </div>
          <div className="relative overflow-hidden rounded-lg col-span-4 row-span-2">
            <LatestArtical />
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ image }) {
  return (
    <div className="relative rounded-lg">
      <div className="absolute bottom-0 left-0 w-full h-full rounded-md bg-gradient-to-t from-slate-950/50"></div>
      <LazyLoadImage
        src={image}
        loading="lazy"
        alt="Photo by Himanshu Dewangan"
        className="h-72 w-full object-cover object-center rounded-lg"
      />

      <div className="flex justify-center items-center absolute bottom-0 left-0 w-full h-full rounded-md bg-gradient-to-t from-slate-950/70">
        <span className="relative inline-flex h-16 w-16 ">
          <svg
            className="w-16 h-16 text-white rounded-full"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
            ></path>
          </svg>
        </span>
      </div>

      <div className="absolute w-full bottom-0 left-0 px-10 py-8 flex flex-col text-white group-hover:inset-0 group-hover:items-center justify-center group-hover:text-center">
        <button className="w-fit px-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-600 rounded-md ">
          Spotrts
        </button>
        <h1 className="mt-3 text-gray-400 font-bold text-sm">
          JANUARY 25, 2022
        </h1>
        <h1 className="mt-3text-white font-bold text-xl capitalize hover:cursor-pointer ">
          Mark was in night before NFL
        </h1>
      </div>
    </div>
  );
}
