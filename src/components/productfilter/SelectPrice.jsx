import React from "react";
import { useState } from "react";

export default function SelectPrice() {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const togglePrice = () => {
    setIsPriceOpen(!isPriceOpen);
  };
  return (
    <>
      <li>
        <div className="overflow-hidden rounded border border-gray-600 ">
          <button
            onClick={togglePrice}
            className="w-full flex cursor-pointer items-center justify-between gap-2 px-4 py-2  transition bg-gray-900 text-white hover:bg-gray-800 hover:text-gray-200"
          >
            <span className="text-lg"> Price </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
          {isPriceOpen && (
            <div className="border-t border-gray-700 bg-gray-900">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-200">
                  {" "}
                  The highest price is $600{" "}
                </span>

                <button
                  type="button"
                  className="text-sm underline underline-offset-4 text-white"
                >
                  Reset
                </button>
              </header>

              <div className="border-t p-4 border-gray-700">
                <div className="flex justify-between gap-4">
                  <label
                    for="FilterPriceFrom"
                    className="flex items-center gap-2"
                  >
                    <span className="text-base text-gray-300">$</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      placeholder="From"
                      className="w-full px-2 py-1 rounded-md shadow-sm sm:text-sm border border-gray-700 bg-gray-900 text-white focus:ring-offset-gray-900"
                    />
                  </label>

                  <label
                    for="FilterPriceTo"
                    className="flex items-center gap-2"
                  >
                    <span className="text-base text-gray-300">$</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      placeholder="To"
                      className="w-full px-2 py-1 rounded-md shadow-sm sm:text-sm border border-gray-700 bg-gray-900 text-white focus:ring-offset-gray-900"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </li>
    </>
  );
}
