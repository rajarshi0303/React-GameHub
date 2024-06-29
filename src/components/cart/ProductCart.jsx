import React from "react";
import { useProductStore } from "@/store/productStore";
import { useNavigate } from "react-router-dom";

export default function ProductCart() {
  const navigateTo = useNavigate();
  const products = useProductStore((state) => state.productCart);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const increaseProductCount = useProductStore(
    (state) => state.increaseProductCount
  );
  const decreaseProductCount = useProductStore(
    (state) => state.decreaseProductCount
  );

  console.log("product cart");
  return (
    <ul className="flex flex-col divide-y divide-gray-500">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col py-6 sm:flex-row sm:justify-between"
        >
          <div className="flex w-full space-x-2 sm:space-x-4">
            <img
              onClick={() => navigateTo(`/productdetils/${product.productId}`)}
              className="flex-shrink-0 object-cover w-24 h-24 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
              src={product.thumbnail}
              alt="Polaroid camera"
            />
            <div className="flex flex-col justify-between w-full pb-1">
              <div className="flex justify-between w-full pb-2 space-x-2">
                <div className="space-y-1">
                  <h3 className="text-base lg:text-lg text-gray-200 uppercase font-semibold leading-snug sm:pr-8">
                    {product.name}
                  </h3>
                  <p className="text-sm capitalize text-gray-400">
                    <span className="text-gray-300">Brand</span> :{" "}
                    {product.brand}
                  </p>
                  <div className="lg:flex items-center lg:space-x-8">
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-300 font-semibold">
                        Color :
                      </span>
                      <button
                        style={{ backgroundColor: product.color }}
                        className="h-5 w-5 rounded-full border-2 border-gray-300 focus:outline-none"
                      ></button>
                    </div>
                    {product.size && (
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-300 font-semibold">
                          Size :
                        </span>
                        <span className="text-heading text-sm uppercase text-gray-100 mr-2 flex items-center justify-center rounded border border-gray-500 px-3 font-semibold ">
                          {product.size}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className=" group flex items-center overflow-hidden">
                    <button
                      onClick={() => {
                        if (product.count > 1) {
                          decreaseProductCount(product.productId);
                        }
                      }}
                      type="button"
                      className=" border rounded-sm border-gray-300 hover:bg-gray-200 text-gray-200 hover:text-gray-900  px-1 inline-flex items-center"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>

                    <span className=" text-gray-300 mx-4">{product.count}</span>

                    <button
                      onClick={() => increaseProductCount(product.productId)}
                      type="button"
                      className=" border rounded-sm border-gray-300 hover:bg-gray-200 text-gray-200 hover:text-gray-900  px-1 inline-flex items-center"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14m-7 7V5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-200">
                    ${product.price}
                  </p>
                  {product.oldprice && (
                    <p className="text-sm line-through text-gray-400">
                      ${product.oldprice}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex text-sm ">
                <button
                  onClick={() => removeProduct(product.productId)}
                  type="button"
                  className="text-red-400 flex items-center px-2 pl-0 space-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 fill-current"
                  >
                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                    <rect width="32" height="200" x="168" y="216"></rect>
                    <rect width="32" height="200" x="240" y="216"></rect>
                    <rect width="32" height="200" x="312" y="216"></rect>
                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                  </svg>
                  <span>Remove</span>
                </button>
                <button
                  type="button"
                  className="text-gray-300 flex items-center px-2 space-x-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                  <span>Save for later</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
