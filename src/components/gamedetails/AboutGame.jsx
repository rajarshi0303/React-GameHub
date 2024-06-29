import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import LoadingDots from "../common/LoadingDots";

export default function AboutGame({ id }) {
  const [about, setAbout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/aboutgames/${id}`)
      .then((response) => {
        setAbout(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!about) return null;
  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div
          className="lg:h-screen max-w-screen-2xl mx-auto bg-center bg-cover relative"
          style={{ backgroundImage: `url('${about.url}')` }}
        >
          <div className="absolute bottom-0 left-0 w-full h-1/6 lg:h-1/3 rounded-md bg-gradient-to-t from-slate-950"></div>
          <section className="w-full h-full py-20 px-2 lg:px-6 bg-gradient-to-b from-slate-950">
            <div className="container px-6 m-auto ">
              <p className="font-semibold text-gray-300 capitalize">
                What is {about.name} ?
              </p>
              <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                <div className="col-span-4 lg:col-span-6">
                  <h5 className="mb-2 text-3xl font-semibold font-sans uppercase text-gray-300 lg:text-4xl">
                    {about.title}
                  </h5>
                </div>
                <div className="col-span-4 lg:col-span-6">
                  <p className="font-normal text-gray-300 whitespace-pre-line">
                    {about.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
