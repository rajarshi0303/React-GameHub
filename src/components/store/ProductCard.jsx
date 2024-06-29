import React from "react";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductCard({
  id,
  name,
  image,
  price,
  oldprice,
  tag,
  rating,
}) {
  return (
    <NavLink to={`/productdetils/${id}`}>
      <div className="group relative mb-2 block overflow-hidden shadow-lg rounded-lg bg-gray-800 lg:mb-3">
        <LazyLoadImage
          src={image}
          loading="lazy"
          alt="Photo by Rachit Tank"
          className="h-44 lg:h-64 w-full object-contain object-center transition duration-300 ease-in-out group-hover:scale-110"
        />
        {tag && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-red-700 px-1.5 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm uppercase tracking-wider text-white">
            {tag}
          </span>
        )}
      </div>

      <div>
        <h1 className=" mb-1 font-semibold text-gray-200 transition duration-100 hover:gray-800 lg:text-lg">
          {name}
        </h1>
        <div className="flex justify-between">
          <div className="flex gap-2 text-xs lg:text-lg">
            <span className="font-bold text-gray-300">${price}.00</span>
            {oldprice && (
              <span className="mb-0.5 text-red-700 line-through">
                ${oldprice}.00
              </span>
            )}
          </div>
          {rating && (
            <div className="flex items-center space-x-1 bg-green-700 px-2 rounded-full text-white">
              <span className="text-xs lg:text-base font-semibold">
                {rating}
              </span>
              <svg
                className="w-3 h-3 lg:w-4 lg:h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
}
