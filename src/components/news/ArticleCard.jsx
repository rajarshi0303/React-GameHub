import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ArticleCard({ image }) {
  return (
    <div>
      <article className="">
        <LazyLoadImage
          alt=""
          src={image}
          className="h-64 w-full rounded-xl object-cover shadow-xl"
        />

        <div className="mt-4 hover:cursor-pointer">
          <div className="mb-2 flex items-center text-white text-base">
            <div className="flex items-center text-sm font-semibold">
              <span className="w-4 h-4 mr-2 text-gray-400 font-bold">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </span>
              March 10, 2022
            </div>
            <span className="px-3 text-gray-500">|</span>
            <div className="flex items-center text-sm font-semibold">
              <span className="w-5 h-5 mr-2 text-gray-400 font-bold">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
              </span>
              23 Comments
            </div>
          </div>
          <h1 className="text-white font-semibold text-xl max-w-sm">
            Popular card game is a modern Max
          </h1>

          <p className="mt-1 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
            autem iusto temporibus?
          </p>
          <h1 className="mt-2 text-base font-semibold text-amber-600">
            Read More
          </h1>
        </div>
      </article>
    </div>
  );
}
