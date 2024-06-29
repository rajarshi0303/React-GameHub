import React from "react";
import { useSearchParams } from "react-router-dom";

import SelectCategory from "./SelectCategory";
import SelectPrice from "./SelectPrice";

import ProductWatchFilter from "./ProductWatchFilter";
import ProductClothsFilter from "./ProductClothsFilter";
import ProductHeadsetFilter from "./ProductHeadsetFilter";
import ProductGamingFilter from "./ProductGamingFilter";

export default function StoreSidebar() {
  const [query, setQuery] = useSearchParams();
  const selectedCategory = query.get("category");

  return (
    <div>
      <div className="overflow-y-auto h-full lg:px-4 py-8">
        <div className="flex justify-start items-center">
          <h1 className="px-2 text-2xl font-semibold whitespace-nowrap text-white">
            Filters
          </h1>
        </div>
        <div className="mt-2 flex flex-wrap">
          <button className="flex items-center px-3 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600">
            <span className="px-1">Docomo</span>
            <svg
              className="w-4 h-5"
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              ></path>
            </svg>
          </button>
        </div>

        <ul className="space-y-2 mt-4">
          <SelectCategory />
          <SelectPrice />
          {selectedCategory === "watch" && <ProductWatchFilter />}
          {selectedCategory === "cloths" && <ProductClothsFilter />}
          {selectedCategory === "headset" && <ProductHeadsetFilter />}
          {selectedCategory === "gaming" && <ProductGamingFilter />}
        </ul>
      </div>
    </div>
  );
}
