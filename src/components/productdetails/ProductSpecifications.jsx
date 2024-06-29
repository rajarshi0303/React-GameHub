import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingDots from "../common/LoadingDots";

export default function ProductSpecifications({ id }) {
  id = 1; //just for dummy specification
  const [specifications, setSpecifications] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/productSpecifications/${id}`)
      .then((response) => {
        //console.log(response.data);
        setSpecifications(response.data.specifications);
        setIsLoading(false);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  if (!specifications) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="mt-8 overflow-hidden rounded border border-gray-600 ">
          <div className="border-t border-gray-700 bg-gray-950">
            <header className=" p-4">
              <h1 className="text-base font-semibold text-gray-300 md:text-2xl">
                Specifications
              </h1>
            </header>
            {specifications.map((section, index) => (
              <div key={index} className="border-t p-4 border-gray-700">
                <h1 className="text-base uppercase font-semibold text-gray-400 md:text-lg">
                  {section.specificationtype}
                </h1>
                {section.items.map((item, index) => (
                  <div key={index} className="mt-2 grid grid-cols-8 gap-4">
                    <h3 className="col-span-3 lg:col-span-2 text-gray-300">
                      {item.title}
                    </h3>

                    <p className="col-span-5 lg:col-span-6 text-gray-500 ">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
