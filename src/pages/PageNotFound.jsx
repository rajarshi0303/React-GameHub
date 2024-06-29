import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigateTo = useNavigate();

  return (
    <div>
      <section class="bg-gray-900 ">
        <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div class="flex flex-col items-center max-w-sm mx-auto text-center">
            <p class="p-3 text-sm font-medium text-amber-500 rounded-full bg-gray-800">
              <svg
                className="h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </p>
            <h1 class="mt-3 text-2xl font-semibold  text-white md:text-3xl">
              Page not found
            </h1>
            <p class="mt-4 text-gray-400">
              The page you are looking for doesn't exist. Here are some helpful
              links:
            </p>

            <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={() => navigateTo(-1)}
                class="flex items-center justify-center w-1/2 px-5 py-2 text-base font-semibold transition-colors duration-200  border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-800 bg-gray-900  text-gray-200 border-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>Go back</span>
              </button>

              <button
                onClick={() => navigateTo("/")}
                class="w-1/2 px-5 py-2 text-base tracking-wide text-white font-semibold transition-colors duration-200 rounded-lg shrink-0 sm:w-auto  hover:bg-amber-600 bg-amber-700"
              >
                Take me home
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
