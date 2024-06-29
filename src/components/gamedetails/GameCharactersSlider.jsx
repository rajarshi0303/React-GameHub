import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingDots from "../common/LoadingDots";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function GameCharactersSlider({ id }) {
  const [characters, setCharacters] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/gameCharacters/${id}`)
      .then((response) => {
        setCharacters(response.data.characters);
        setTitle(response.data.title);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleDotClick = (index) => {
    setCurrent(index);
    api.scrollTo(index);
  };

  if (characters.length === 0) return null;
  return (
    <div>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="max-w-screen-2xl mx-auto bg-gray-950 lg:pt-8 ">
          <p className="text-amber-600 text-center text-base font-semibold capitalize">
            Game Characters
          </p>
          <h1 className="px-4 lg:px-14 mb-8 text-center text-3xl tracking-wide text-gray-300 font-semibold capitalize lg:text-2xl">
            {title}
          </h1>
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {characters.map((character, index) => (
                <CarouselItem
                  key={index}
                  className=" basis-auto flex items-center justify-center "
                >
                  <div
                    className={` my-10 lg:my-20 px-3  lg:px-14 ${
                      current === index ? "scale-125" : "brightness-50"
                    }`}
                  >
                    <LazyLoadImage
                      className="rounded-xl h-72 lg:h-96 "
                      src={character.url}
                      alt=""
                    />
                    <h3 className="mt-4 mb-4 lg:mb-0 text-lg text-center font-medium capitalize text-gray-300">
                      {character.name}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 lg:left-10" />
            <CarouselNext className="right-4 lg:right-10" />
          </Carousel>
          <div className="flex justify-center pb-4">
            {Array.from({ length: characters.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`mx-1 w-4 h-1 rounded-full ${
                  current === index ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
