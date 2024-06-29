import React from "react";
import { useGameStore } from "@/store/gameStore";
import { useProductStore } from "@/store/productStore";
import { useTotalAmountStore } from "@/store/totalAmountStore";
import { useNavigate } from "react-router-dom";

export default function PriceDetails() {
  const navigateTo = useNavigate();
  const games = useGameStore((state) => state.gameCart);
  const products = useProductStore((state) => state.productCart);
  const setTotalAmount = useTotalAmountStore((state) => state.setTotalAmount);

  const items = [...games, ...products];
  console.log("items", items);

  // Calculate the total price
  const subTotalPrice = items.reduce((total, item) => {
    return total + item.price * (item.count || 1);
  }, 0);
  setTotalAmount(subTotalPrice + 0.5 + 4);
  console.log("items", subTotalPrice);

  return (
    <div className="h-fit mt-8 lg:mt-0 flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-400 bg-gray-900 text-gray-300">
      <h2 className="text-2xl font-semibold">Price Details</h2>
      <ul className="flex flex-col pt-4 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start justify-between">
            <h3 className="capitalize">
              {item.name}
              {item.count && (
                <span className="text-sm dark:text-violet-600 px-2">
                  x {item.count}
                </span>
              )}
            </h3>
            <div className="text-right">
              <span className="block">${item.price}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="pt-4 space-y-2">
        <div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subTotalPrice}</span>
          </div>
        </div>
      </div>
      <div className="pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>$0.50</span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span>Delivery fee</span>
            <span>$4.00</span>
          </div>
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-xs hover:underline dark:text-violet-600"
          >
            How do our fees work?
          </a>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">${subTotalPrice + 0.5 + 4}</span>
          </div>
          <button
            onClick={() => navigateTo("/checkout")}
            type="button"
            className="w-full py-2 font-semibold border rounded dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600"
          >
            Go to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
