import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { usePlayOnlineLibrary } from "@/store/playonlineLibraryStore";

export default function Sidebar() {
  const getOnlineGameCount = usePlayOnlineLibrary((state) =>
    state.getOnlineGameCount()
  );
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const genres = ["action", "car", "shooting", "racing"];

  const [query, setQuery] = useSearchParams();
  const navigateTo = useNavigate();

  const genre = query.get("genres");
  const [selectedCategories, setSelectedCategories] = useState(
    genre ? genre.split(",") : []
  );

  function handleGenres(event) {
    const copy = new URLSearchParams(query);
    const category = event.target.name.toLowerCase();
    //If the selected category already exists then remove it else add it
    if (selectedCategories.includes(category)) {
      const genres = selectedCategories.filter((item) => item !== category);
      setSelectedCategories(genres);
      copy.set("genres", genres.join(","));
    } else {
      const genres = [...selectedCategories, category];
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
      copy.set("genres", genres.join(","));
    }
    setQuery(copy);
  }

  useEffect(() => {
    if (selectedCategories.length > 0) {
      navigateTo("/playonline/genre/?" + query);
    }
  }, [selectedCategories]);

  console.log(selectedCategories);

  function clearFilter() {
    setSelectedCategories([]);
    navigateTo("/playonline/");
  }
  return (
    <div>
      <div className="overflow-y-auto h-full lg:px-4 py-8">
        <div className="flex justify-start items-center">
          <button className="px-2 cursor-pointer flex items-center text-gray-300">
            <svg
              className="w-12 h-12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6669 6.13443L10.165 5.77922C9.44862 5.27225 8.59264 5 7.71504 5H7.10257C6.69838 5 6.29009 5.02549 5.90915 5.16059C3.52645 6.00566 1.88749 9.09504 2.00604 16.1026C2.02992 17.5145 2.3603 19.075 3.63423 19.6842C4.03121 19.8741 4.49667 20 5.02671 20C5.66273 20 6.1678 19.8187 6.55763 19.5632C6.96641 19.2953 7.32633 18.9471 7.68612 18.599C8.13071 18.1688 8.57511 17.7389 9.11125 17.4609C9.69519 17.1581 10.3434 17 11.0011 17H12.9989C13.6566 17 14.3048 17.1581 14.8888 17.4609C15.4249 17.7389 15.8693 18.1688 16.3139 18.599C16.6737 18.9471 17.0336 19.2953 17.4424 19.5632C17.8322 19.8187 18.3373 20 18.9733 20C19.5033 20 19.9688 19.8741 20.3658 19.6842C21.6397 19.075 21.9701 17.5145 21.994 16.1026C22.1125 9.09503 20.4735 6.00566 18.0908 5.16059C17.7099 5.02549 17.3016 5 16.8974 5H16.2849C15.4074 5 14.5514 5.27225 13.8351 5.77922L13.3332 6.13441C12.9434 6.41029 12.4776 6.55844 12 6.55844C11.5225 6.55844 11.0567 6.41029 10.6669 6.13443ZM16.75 9C17.1642 9 17.5 9.33579 17.5 9.75C17.5 10.1642 17.1642 10.5 16.75 10.5C16.3358 10.5 16 10.1642 16 9.75C16 9.33579 16.3358 9 16.75 9ZM7.5 9.25C7.91421 9.25 8.25 9.58579 8.25 10V10.75H9C9.41421 10.75 9.75 11.0858 9.75 11.5C9.75 11.9142 9.41421 12.25 9 12.25H8.25V13C8.25 13.4142 7.91421 13.75 7.5 13.75C7.08579 13.75 6.75 13.4142 6.75 13V12.25H6C5.58579 12.25 5.25 11.9142 5.25 11.5C5.25 11.0858 5.58579 10.75 6 10.75H6.75V10C6.75 9.58579 7.08579 9.25 7.5 9.25ZM19 11.25C19 11.6642 18.6642 12 18.25 12C17.8358 12 17.5 11.6642 17.5 11.25C17.5 10.8358 17.8358 10.5 18.25 10.5C18.6642 10.5 19 10.8358 19 11.25ZM15.25 12C15.6642 12 16 11.6642 16 11.25C16 10.8358 15.6642 10.5 15.25 10.5C14.8358 10.5 14.5 10.8358 14.5 11.25C14.5 11.6642 14.8358 12 15.25 12ZM17.5 12.75C17.5 12.3358 17.1642 12 16.75 12C16.3358 12 16 12.3358 16 12.75C16 13.1642 16.3358 13.5 16.75 13.5C17.1642 13.5 17.5 13.1642 17.5 12.75Z"
                fill="currentColor"
              ></path>{" "}
            </svg>
            <h1 className="px-2 text-2xl font-semibold whitespace-nowrap text-white">
              Play Games
            </h1>
          </button>
        </div>

        <ul className="space-y-2 mt-4">
          <li>
            <a
              onClick={clearFilter}
              className="flex items-center gap-3 rounded-md p-3 text-gray-200 transition-colors cursor-pointer hover:bg-gray-700 hover:text-gray-200"
            >
              <div className="flex items-center self-center">
                <svg
                  className="w-7 h-7 text-gray-300 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-lg">
                Home
              </div>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 rounded-md p-3 text-gray-200 transition-colors cursor-pointer hover:bg-gray-700 hover:text-gray-200">
              <div className="flex items-center self-center">
                <svg
                  className="w-7 h-7 text-gray-300 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
                    clipRule="evenodd"
                  />
                  <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z" />
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-lg">
                New Games
              </div>
            </a>
          </li>

          <li>
            <a
              onClick={() => setToggleDropdown(!toggleDropdown)}
              className="flex items-center gap-3 rounded-md p-3 text-gray-200 transition-colors cursor-pointer hover:bg-gray-700 hover:text-gray-200"
            >
              <div className="flex items-center self-center ">
                <svg
                  className="w-7 h-7 text-gray-300 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-lg">
                Catogeries
              </div>
              <span className="inline-flex items-center justify-center rounded-full  text-xs text-neutral-100 ">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </a>
            {toggleDropdown && (
              <ul id="dropdown-pages" className=" py-2 space-y-2">
                {genres.map((category, index) => (
                  <li key={index} className="mx-4">
                    <input
                      onChange={handleGenres}
                      id={category}
                      name={category}
                      type="checkbox"
                      value=""
                      className="hidden peer"
                    />
                    <label
                      htmlFor={category}
                      className={`w-full flex items-center p-2 font-semibold ${
                        selectedCategories.includes(category.toLowerCase())
                          ? "bg-gray-400 text-gray-900"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                      }
                      
                      rounded-lg cursor-pointer  `}
                    >
                      <span className="ml-3 capitalize">{category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <a className="flex items-center gap-3 rounded-md p-3 text-gray-200 transition-colors cursor-pointer hover:bg-gray-700 hover:text-gray-200">
              <div className="flex items-center self-center">
                <svg
                  className="w-7 h-7 text-gray-300 px-1"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 0v1h-.5c-.35 0-.56.1-.78.38l-1.41 1.78-1.53-1.78c-.22-.26-.44-.38-.78-.38h-1v1h1c-.05 0 .01.04.03.03l1.63 1.91-1.66 2.06h-1v1h1c.35 0 .56-.1.78-.38l1.53-1.91 1.66 1.91c.22.26.44.38.78.38h.25v1l2-1.5-2-1.5v1h-.22c-.01-.01-.05-.04-.06-.03l-1.75-2.06 1.53-1.91h.5v1l2-1.5-2-1.5z"></path>{" "}
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-lg">
                Random Game
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => navigateTo("/playonline/library")}
              className="flex items-center gap-3 rounded-md p-3 text-gray-200 transition-colors cursor-pointer hover:bg-gray-700 hover:text-gray-200"
            >
              <div className="flex items-center self-center ">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-lg">
                My Library
              </div>
              <span className="inline-flex items-center justify-center rounded-full bg-neutral-700 px-2 py-0.5 font-semibold text-sm text-neutral-100 ">
                {getOnlineGameCount}
                <span className="sr-only"> new notifications</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
