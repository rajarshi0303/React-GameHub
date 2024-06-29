import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingDots from "../common/LoadingDots";

import { useProductStore } from "@/store/productStore";
import { useUserStore } from "@/store/userStore";

export default function ProductDetails({ id, selectColor, selectedColor }) {
  const products = useProductStore((state) => state.productCart);
  const addProduct = useProductStore((state) => state.addProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const user = useUserStore((state) => state.user);

  const [details, setDetails] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        //console.log("productDetails", response.data);
        setDetails(response.data);
        if (response.data.variations) {
          selectColor(response.data.variations[0]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleColorClick = (color) => {
    selectColor(color);
  };

  const handleSize = (size) => {
    setSelectedSize(size);
    // add any additional logic here
  };

  const isProductInCart = products.some(
    (productCart) => productCart.productId === id
  );
  console.log(isProductInCart);
  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <div>
            <span className="mb-0.5 inline-block uppercase font-semibold text-gray-400">
              {details.brand}
            </span>
            <h2 className="text-2xl font-semibold text-gray-200 lg:text-3xl">
              {details.name}
            </h2>
          </div>

          <div className="hidden lg:block">
            <span className="flex items-center justify-center lg:justify-start gap-2 rounded">
              <span className="font-semibold text-lg text-amber-700">
                {details.rating}
              </span>
              <span
                className="flex gap-1 text-amber-700"
                role="img"
                aria-label="Rating: 4 out of 5 stars"
              >
                {Array.from({ length: details.rating }).map((_, index) => (
                  <span key={index} aria-hidden="true">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={
                        index < Math.round(details.rating)
                          ? "currentColor"
                          : "none"
                      }
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                ))}
              </span>
            </span>
          </div>

          {details.variations && (
            <div className="mt-4 ">
              <span className="mb-1 inline-block text-sm font-semibold text-gray-400 md:text-lg">
                Color
              </span>

              <div className="flex flex-wrap gap-2">
                {details.variations.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    style={{ backgroundColor: color }}
                    className={`h-8 w-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-gray-300"
                        : "border-gray-500"
                    } `}
                    onClick={() => handleColorClick(color)}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {details.sizes && (
            <div className="mt-4 ">
              <span className="mb-1 inline-block text-sm font-semibold text-gray-400 md:text-lg">
                Size
              </span>
              <div className="flex flex-wrap gap-3">
                {details.sizes.map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSize(size)}
                    className={`flex h-8 w-12 items-center justify-center rounded-md text-gray-100 ${
                      selectedSize === size ? "bg-amber-600 " : "bg-gray-500"
                    } uppercase text-center text-sm font-semibold transition duration-100   `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="flex items-end gap-2">
              <span className="text-xl font-semibold text-gray-300 md:text-3xl">
                ${details.price}.00
              </span>
              <span className="mb-0.5 text-red-500 line-through text-lg">
                ${details.oldprice}.00
              </span>
            </div>

            <span className="text-sm text-gray-400">
              incl. VAT plus shipping
            </span>
          </div>

          <div className="mb-4 flex items-center gap-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>

            <span className="text-sm">2-4 day shipping</span>
          </div>

          <div className="mt-8 grid lg:grid-cols-6 gap-4">
            {isProductInCart ? (
              <button
                onClick={() => removeProduct(id)}
                className="col-span-2 flex items-center justify-center rounded-sm bg-amber-600 px-4 py-3 uppercase text-center text-lg font-semibold text-white outline-none "
              >
                <svg
                  className="w-7 h-7 text-white"
                  data-slot="icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"></path>
                </svg>

                <span className="mx-2">Remove From Cart</span>
              </button>
            ) : (
              <button
                onClick={() =>
                  addProduct({
                    userId: user.id,
                    productId: details.id,
                    thumbnail: details.thumbnail,
                    name: details.name,
                    brand: details.brand,
                    price: details.price,
                    oldprice: details.oldprice,
                    color: selectedColor,
                    size: selectedSize,
                    count: 1,
                  })
                }
                className="col-span-2 flex items-center justify-center rounded-sm bg-amber-600 px-8 py-3 uppercase text-center text-lg font-semibold text-white outline-none "
              >
                <svg
                  className="w-7 h-7 text-white"
                  data-slot="icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"></path>
                </svg>

                <span className="mx-2">Add to cart</span>
              </button>
            )}

            <div className="col-span-2 flex items-center justify-center rounded-sm bg-gray-300 px-8 py-3 uppercase text-center text-lg font-semibold text-gray-500 outline-none ">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                height="200px"
                width="200px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                stroke="#ffffff"
              >
                <polygon points="426.667,213.333 288.36,213.333 333.706,0 148.817,0 85.333,298.667 227.556,298.667 227.556,512 "></polygon>{" "}
              </svg>
              <span className="mx-2">Buy Now</span>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded border border-gray-600 ">
            <div className="border-t border-gray-700 bg-gray-950">
              <header className=" p-4">
                <h1 className="text-base font-semibold text-gray-300 md:text-2xl">
                  Description
                </h1>
              </header>

              <div className="border-t p-4 border-gray-700">
                <p className="leading-relaxed text-gray-400">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tenetur rem amet repudiandae neque adipisci eum enim, natus
                  illo inventore totam? Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Nobis facilis ab est perspiciatis laborum
                  omnis exercitationem aspernatur praesentium nesciunt
                  perferendis, incidunt ut harum distinctio dicta nemo vero
                  tenetur dolore reiciendis.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
