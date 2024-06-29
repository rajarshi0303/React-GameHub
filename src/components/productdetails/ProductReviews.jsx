import React from "react";

export default function ProductReviews() {
  return (
    <div>
      <div className="mt-8 overflow-hidden rounded border border-gray-600 ">
        <div className="border-t border-gray-700 bg-gray-950">
          <div className=" p-4 border-gray-700">
            <header className="flex justify-between">
              <h1 className="text-base font-semibold text-gray-300 md:text-2xl">
                Ratings & Reviews
              </h1>
              <button class="px-6 py-2 font-medium tracking-wide text-white border-2 border-gray-700 capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-800 ">
                Rate Product
              </button>
            </header>

            <div className="mt-6 grid grid-cols-12 gap-4">
              <div class="col-span-2 flex flex-col items-center">
                <div class="mb-2 text-base flex items-baseline text-gray-300">
                  <span className="px-1 text-4xl">4.1</span>
                  <svg
                    class=" w-5 h-5 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>

                <h3 class="mb-2 text-center text-gray-500 text-base ">
                  5,37,385 Ratings & <br /> 34,431 Reviews
                </h3>
              </div>

              <div className="col-span-4">
                <RatingBar
                  rating={5}
                  percentage={80}
                  count={312863}
                  color="bg-green-600"
                />
                <RatingBar
                  rating={4}
                  percentage={60}
                  count={106515}
                  color="bg-green-600"
                />
                <RatingBar
                  rating={3}
                  percentage={40}
                  count={41952}
                  color="bg-green-600"
                />
                <RatingBar
                  rating={2}
                  percentage={10}
                  count={21125}
                  color="bg-amber-600"
                />
                <RatingBar
                  rating={1}
                  percentage={20}
                  count={54930}
                  color="bg-red-600"
                />
              </div>

              <div className="col-span-6 justify-self-center flex items-center  gap-4 ">
                <RatingCircle
                  color="text-green-600"
                  title="Battery "
                  ratingValue="3.7"
                />
                <RatingCircle
                  color="text-green-600"
                  title="Display"
                  ratingValue="4.0"
                />
                <RatingCircle
                  color="text-green-600"
                  title="Design"
                  ratingValue="4.1"
                />
                <RatingCircle
                  color="text-green-600"
                  title="Activity"
                  ratingValue="3.8"
                />
              </div>
            </div>
          </div>

          <div className="border-t p-4 border-gray-700">
            <div className="mt-2 grid grid-cols-8 gap-4">
              <h3 className="col-span-3 lg:col-span-2 text-gray-300">
                Hellow World
              </h3>

              <p className="col-span-5 lg:col-span-6 text-gray-500 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Blanditiis similique eligendi nisi beatae adipisci rerum dolore
                vel culpa in repudiandae ipsa eos nemo, ullam assumenda illo
                quidem deleniti qui debitis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RatingBar = ({ rating, percentage, count, color }) => {
  return (
    <div className="min-w-96 flex items-center">
      <div className="text-base flex items-center font-medium text-gray-300">
        <span className="px-1">{rating}</span>
        <svg
          className="w-3 h-3 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
      <div className="w-2/4 h-2 mx-3 bg-gray-200 rounded dark:bg-gray-700">
        <div
          className={`h-2 ${color} rounded`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {count}
      </span>
    </div>
  );
};

const RatingCircle = ({ color, title, ratingValue }) => {
  const percentage = ratingValue * 20;
  const strokeDashoffset = 100 - percentage;

  return (
    <div className="relative size-20">
      <svg
        className="size-full"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-300"
          strokeWidth="2"
        ></circle>

        <g className="origin-center -rotate-90 transform">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current ${color}`}
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
          ></circle>
        </g>
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <span className="text-center text-lg font-bold text-white">
          {ratingValue}
        </span>
      </div>
      <h3 className="mb-2 text-center text-gray-200 text-base">{title}</h3>
    </div>
  );
};
