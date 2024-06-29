import React from "react";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function GameCard({ id, url, name, platform }) {
  return (
    <>
      <NavLink to={`/game/${id}`}>
        <div className="relative  group">
          <div className="pointer-events-none absolute inset-0 rounded-md group-hover:bg-gray-950/60"></div>
          <div className="absolute bottom-0 left-0 w-full h-full rounded-md bg-gradient-to-t from-slate-950/70"></div>
          <LazyLoadImage
            src={url}
            alt="game image"
            className="object-fit object-cover object-top w-full h-56 lg:h-80 rounded-md"
          />

          <div className="absolute w-full bottom-0 left-0 p-4 flex flex-col text-white group-hover:inset-0 group-hover:items-center justify-center group-hover:text-center">
            <LazyLoadImage
              className="w-8 hidden group-hover:block"
              src="public/images/icons/cta_icon.png"
              alt="cta_icon image"
            />
            <h3 className=" text-sm lg:text-xl uppercase font-bold">{name}</h3>
            <p className="text-xs opacity-75 flex items-center uppercase font-semibold">
              {platform.split(",").join(" / ")}
            </p>
          </div>
        </div>
      </NavLink>
    </>
  );
}
