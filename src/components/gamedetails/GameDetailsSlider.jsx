import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import LoadingDots from "../common/LoadingDots";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyVideo from "../common/LazyVideo";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function GameDetailsSlider({ id }) {
  const [slides, setSlides] = useState([]);
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/gamesildes/${id}`)
      .then((response) => {
        console.log("siders", response.data);
        setSlides(response.data.slides);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  if (slides.length === 0) return null;

  return (
    <>
      {isLoding ? (
        <LoadingDots />
      ) : (
        <div className=" max-w-screen-2xl mx-auto bg-gray-950 lg:py-10">
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="basis-2/3 md:basis-1/2">
                  <div
                    className={`flex my-10 lg:my-20 items-center justify-center px-3 lg:px-9 ${
                      current === index ? "scale-125" : "brightness-50"
                    }`}
                  >
                    {slide.type === "image" && (
                      <LazyLoadImage
                        className="object-cover w-full h-full lg:h-[360px] rounded-xl"
                        src={slide.url}
                        alt=""
                      />
                    )}
                    {slide.type === "video" && (
                      <LazyVideo
                        className="object-cover w-full h-full lg:h-[360px] rounded-xl"
                        src={slide.url}
                        type="video/mp4"
                        autoPlay
                        loop
                        muted
                      ></LazyVideo>
                    )}
                    {slide.type === "youtube" && (
                      <iframe
                        allowFullScreen={true}
                        className="rounded-xl w-full h-full lg:h-[360px]"
                        src={slide.url}
                      ></iframe>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 lg:left-10" />
            <CarouselNext className="right-3 lg:right-10" />
          </Carousel>
          <div className="flex justify-center">
            {Array.from({ length: slides.length }).map((_, index) => (
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
    </>
  );
}
