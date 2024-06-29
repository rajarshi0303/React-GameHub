import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SelectCategory() {
  const [isCategoriesOpen, setIsCategoriesOpenOpen] = useState(false);
  const toggleCategoriesOpen = () => setIsCategoriesOpenOpen(!isCategoriesOpen);

  const catogeriesItems = ["watch", "cloths", "headset", "gaming"];

  const [query, setQuery] = useSearchParams();
  const category = query.get("category");

  const handleCheckboxChange = (label) => {
    const copy = new URLSearchParams();
    copy.set("category", label);
    setQuery(copy);
  };

  return (
    <li>
      <div className="overflow-hidden rounded border border-gray-600">
        <button
          onClick={toggleCategoriesOpen}
          className="w-full flex cursor-pointer items-center justify-between gap-2 px-4 py-2 transition bg-gray-900 text-white hover:bg-gray-800 hover:text-gray-200"
        >
          <span className="text-lg capitalize">Categories</span>

          <span
            className={`transition ${isCategoriesOpen ? "rotate-180" : ""}`}
          >
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
        {isCategoriesOpen && (
          <div className="border-t border-gray-700 bg-gray-900">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm capitalize text-gray-200">
                {category || "Non"} Selected
              </span>

              <button
                type="button"
                className="text-sm text-white"
                onClick={() => {
                  const copy = new URLSearchParams(query);
                  copy.delete("category");
                  setQuery(copy);
                }}
              >
                Clear
              </button>
            </header>

            <ul className="space-y-1 border-t p-4 border-gray-700">
              {catogeriesItems.map((label, index) => (
                <li key={index}>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="catogeries"
                      className=" size-5 border-gray-200 bg-gray-200 focus:ring-offset-gray-100"
                      checked={category === label}
                      onChange={() => handleCheckboxChange(label)}
                    />
                    <span className="text-sm capitalize font-medium text-gray-200">
                      {label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}
