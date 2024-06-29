import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { motion } from "framer-motion";

export default function PlayOnlineGameLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const navigateTo = useNavigate();
  let location = useLocation();

  const [query, setQuery] = useSearchParams();
  const search = query.get("search");

  function handleSearch(event) {
    const searchGame = event.target.value;
    const copy = new URLSearchParams(query);
    copy.set("search", searchGame);
    setQuery(copy);
  }

  useEffect(() => {
    if (search) {
      //Creating the copy with the exisiting params using URLSearchParams()
      navigateTo("/playonline/genre/?" + query);
    }
  }, [search]);

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto mt-20">
        <div className="flex justify-center lg:mx-4">
          <aside className="w-96 h-auto bg-gray-900 rounded-xl mr-3 hidden lg:block">
            <Sidebar />
          </aside>

          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed bottom-0 left-0 right-0 z-40 w-full h-screen bg-gray-900/60 lg:hidden"
            >
              <motion.aside
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
                className="absolute z-10 bottom-0 w-full p-4 rounded-t-3xl border-2 border-gray-400 bg-gray-900 overflow-y-auto transition-transform  transform-none "
              >
                <button
                  onClick={() => setIsMobile(!isMobile)}
                  type="button"
                  data-drawer-hide="drawer-bottom-example"
                  aria-controls="drawer-bottom-example"
                  class="bg-transparent text-gray-100 border-2 border-gray-400 rounded-full p-2 mx-4 mt-2 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close menu</span>
                </button>
                <Sidebar />
                <div className="flex items-center justify-between px-4 mb-4">
                  <h1></h1>
                  <button
                    onClick={() => setIsMobile(!isMobile)}
                    type="button"
                    class="px-4 py-2  text-white bg-gray-600  font-semibold rounded-lg text-base "
                  >
                    Apply
                  </button>
                </div>
              </motion.aside>
            </motion.div>
          )}
          <main className="w-full h-auto bg-gray-900 rounded-xl">
            <nav className="px-6 py-8 lg:p-8 z-20">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center">
                  <button className="px-2 cursor-pointer flex items-center text-gray-300">
                    <h1 className="text-2xl capitalize font-semibold whitespace-nowrap text-white hidden lg:block">
                      {location.pathname === "/playonline" ||
                      location.pathname === "/playonline/"
                        ? "Home"
                        : location.pathname.split("/")[2]}
                    </h1>
                  </button>
                </div>

                <div className="flex items-center lg:order-2 w-full lg:w-fit">
                  <form className="md:pl-2 w-full">
                    <label htmlFor="topbar-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative md:w-96">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        onChange={handleSearch}
                        type="text"
                        name="search"
                        id="topbar-search"
                        value={search ? search : ""}
                        className="border  text-base rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>

                <div className="flex justify-start items-center order-last px-4 lg:hidden">
                  <button
                    onClick={() => setIsMobile(!isMobile)}
                    className="rounded-lg cursor-pointer text-gray-300"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      id="filter-alt"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M12,9a3.66,3.66,0,0,0,1-.13V21a1,1,0,0,1-2,0V8.87A3.66,3.66,0,0,0,12,9Z"></path>
                        <path d="M19,16a3.66,3.66,0,0,0,1-.13V21a1,1,0,0,1-2,0V15.87A3.66,3.66,0,0,0,19,16Z"></path>
                        <path d="M20,3V8.13a3.91,3.91,0,0,0-2,0V3a1,1,0,0,1,2,0Z"></path>
                        <path d="M6,3V15.13A3.66,3.66,0,0,0,5,15a3.66,3.66,0,0,0-1,.13V3A1,1,0,0,1,6,3Z"></path>
                        <path d="M8,19a3,3,0,1,1-4-2.82,2.87,2.87,0,0,1,2,0A3,3,0,0,1,8,19Z"></path>
                        <path d="M15,5a3,3,0,0,1-2,2.82,2.87,2.87,0,0,1-2,0A3,3,0,1,1,15,5Z"></path>
                        <path d="M22,12a3,3,0,0,1-2,2.82,2.87,2.87,0,0,1-2,0,3,3,0,0,1,0-5.64,2.87,2.87,0,0,1,2,0A3,3,0,0,1,22,12Z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
