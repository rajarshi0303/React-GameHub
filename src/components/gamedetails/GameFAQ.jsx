import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import LoadingDots from "../common/LoadingDots";

export default function GameFAQ({ id }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [islLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/gamefaq/${id}`)
      .then((response) => {
        console.log(response.data);
        setUrl(response.data.url);
        setTitle(response.data.title);
        setFaqs(response.data.faqs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 404) {
          setIsLoading(false);
        }
      });
  }, []);

  if (faqs.length === 0) return null;
  return (
    <div>
      {islLoading ? (
        <LoadingDots />
      ) : (
        <header
          className="mt-12 w-full bg-center bg-cover relative"
          style={{ backgroundImage: `url('${url}')` }}
        >
          <div className="absolute inset-0 left-0 w-full h-8 lg:h-2/5 rounded-md bg-gradient-to-b from-slate-950"></div>
          <div className="bg-gray-900/20">
            <div className="container px-6 mx-auto ">
              <div className="flex flex-col items-center py-6 h-full lg:min-h-screen lg:flex-row">
                <div className="lg:w-1/2"></div>
                <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
                  <div className="px-4 py-6 lg:p-10 w-full bg-gray-950/70">
                    <h1 className="mb-4 lg:mb-8 text-2xl tracking-wide font-semibold text-gray-300 uppercase lg:text-4xl">
                      {title}
                    </h1>
                    <section className="w-full rounded">
                      {faqs.map((item, index) => (
                        <details
                          key={index}
                          className="p-4 group odd:bg-zinc-700/70 "
                        >
                          <summary className="[&::-webkit-details-marker]:hidden relative pr-8 font-medium list-none cursor-pointer text-gray-200 focus-visible:outline-none transition-colors duration-300 ">
                            {item.question}?
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute right-0 w-4 h-4 transition duration-300 top-1 stroke-gray-200 shrink-0 group-open:rotate-45"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              aria-labelledby="title-ac01 desc-ac01"
                            >
                              <title id={item.id}>Open icon</title>
                              <desc id={item.id}>
                                icon that represents the state of the summary
                              </desc>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </summary>
                          <p className="mt-4 text-gray-400">{item.answer}</p>
                        </details>
                      ))}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
