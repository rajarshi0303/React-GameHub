import React from "react";
import { useState, useEffect } from "react";
import PriceDetails from "@/components/cart/PriceDetails";
import GameCart from "@/components/cart/GameCart";
import ProductCart from "@/components/cart/ProductCart";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/store/userStore";
import { useGameStore } from "@/store/gameStore";
import { useProductStore } from "@/store/productStore";

export default function Cart() {
  const navigateTo = useNavigate();
  const user = useUserStore((state) => state.user);
  const gameCount = useGameStore((state) => state.getGameCount());
  const productCount = useProductStore((state) => state.getProductCount());

  useEffect(() => {
    if (!user) {
      navigateTo("/signin");
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState("games");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="max-w-screen-2xl mx-auto lg:flex justify-center mt-20 space-x-4">
      <div className="flex flex-col lg:w-3/5 p-6 space-y-4 sm:p-10 bg-gray-900 text-gray-800">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold capitalize text-gray-300">
            My cart ({gameCount + productCount})
          </h2>
          <div className="flex space-x-4 overflow-x-auto overflow-y-hidden whitespace-nowrap ">
            <button
              className={`inline-flex items-center h-10 px-2 -mb-px text-lg text-center font-semibold bg-transparent ${
                activeTab === "games"
                  ? "text-amber-600 border-2 border-amber-600 rounded-md"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabClick("games")}
            >
              Games
            </button>

            <button
              className={`inline-flex items-center h-10 px-2 -mb-px text-lg text-center font-semibold bg-transparent ${
                activeTab === "products"
                  ? "text-amber-600 border-2 border-amber-600 rounded-md"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabClick("products")}
            >
              Products
            </button>
          </div>
        </div>

        {activeTab === "games" ? <GameCart /> : <ProductCart />}
      </div>
      <PriceDetails />
    </div>
  );
}
