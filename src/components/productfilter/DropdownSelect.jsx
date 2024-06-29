import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function DropdownSelect({ title, items }) {
  const [query, setQuery] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const queryKey = title.toLowerCase();
  const selectedItemsFromQuery = query.get(queryKey)
    ? query.get(queryKey).split(",")
    : [];

  const handleCheckboxChange = (label) => {
    if (selectedItemsFromQuery.includes(label)) {
      const filtered = selectedItemsFromQuery.filter(
        (selected) => selected !== label
      );
      const copy = new URLSearchParams(query);
      copy.set(queryKey, filtered.join(","));
      setQuery(copy);
    } else {
      const updated = [...selectedItemsFromQuery, label];
      const copy = new URLSearchParams(query);
      copy.set(queryKey, updated.join(","));
      setQuery(copy);
    }
  };

  return (
    <li>
      <div className="overflow-hidden rounded border border-gray-600">
        <button
          onClick={toggleDropdown}
          className="w-full flex cursor-pointer items-center justify-between gap-2 px-4 py-2 transition bg-gray-900 text-white hover:bg-gray-800 hover:text-gray-200"
        >
          <span className="text-lg capitalize">{title}</span>

          <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
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
        {isOpen && (
          <div className="border-t border-gray-700 bg-gray-900">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-200">
                {selectedItemsFromQuery.length} Selected
              </span>

              <button
                type="button"
                className="text-sm text-white"
                onClick={() => {
                  const copy = new URLSearchParams(query);
                  copy.delete(queryKey);
                  setQuery(copy);
                }}
              >
                Clear all
              </button>
            </header>

            <ul className="space-y-1 border-t p-4 border-gray-700">
              {items.map((label, index) => (
                <li key={index}>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="size-5 rounded border-gray-600 bg-gray-900 focus:ring-offset-gray-900"
                      checked={selectedItemsFromQuery.includes(label)}
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
