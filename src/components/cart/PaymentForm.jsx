import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/store/userStore";
import { useGameStore } from "@/store/gameStore";
import { useProductStore } from "@/store/productStore";
import { useTotalAmountStore } from "@/store/totalAmountStore";

export default function PaymentForm() {
  const navigateTo = useNavigate();
  const user = useUserStore((state) => state.user);
  const games = useGameStore((state) => state.gameCart);
  const products = useProductStore((state) => state.productCart);
  const totalAmount = useTotalAmountStore((state) => state.totalAmount);
  const currentDate = new Date();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    expiredate: "",
    cvv: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const orders = {
      userId: user.id,
      paymentType: "Payment done by credit card",
      total: totalAmount,
      date: currentDate.toDateString(),
      orders: [...games, ...products],
    };
    console.log(orders);
    axios
      .post("http://localhost:3000/userOrders", orders)
      .then((response) => {
        console.log(response.data);
        navigateTo("/useraccount/myorders");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCashOnDelivery() {
    const orders = {
      userId: user.id,
      paymentType: "cash on delivery",
      total: totalAmount,
      date: currentDate.toDateString(),
      orders: [...games, ...products],
    };
    console.log(orders);
    axios
      .post("http://localhost:3000/userOrders", orders)
      .then((response) => {
        console.log(response.data);
        navigateTo("/useraccount/myorders");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log("Payment form component");
  return (
    <div className="p-4 mt-24 max-w-screen-sm mx-auto">
      <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
        <p className="text-2xl font-bold text-gray-900">Payment</p>
        <div className="flex items-center">
          <img
            className="h-16"
            src="/public/images/icons/creditcard01.png"
            alt=""
          />
          <img
            className="h-12 px-2"
            src="/public/images/icons/creditcard02.png"
            alt=""
          />
          <img
            className="h-14 px-2"
            src="/public/images/icons/creditcard03.png"
            alt=""
          />
          <img
            className="h-14"
            src="/public/images/icons/creditcard04.webp"
            alt=""
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gap-6 md:grid md:grid-cols-2 md:space-y-0">
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Name on Card
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="cardNumber"
                >
                  Credit Card Number
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9\s]*"
                  placeholder="Enter your card number"
                  id="cardNumber"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="expireDate"
              >
                Expiration Date (MM/YY)
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                inputMode="numeric"
                pattern="(0[1-9]|1[0-2])/\d{2}"
                placeholder="Enter expiration date"
                id="expireDate"
                name="expiredate"
                value={formData.expiredate}
                onChange={handleChange}
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                inputMode="numeric"
                pattern="\d{3,4}"
                placeholder="Enter CVV"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
              ></input>
            </div>

            <div className="col-span-2 grid">
              <button
                type="submit"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or pay with cash
            </a>

            <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
          </div>
        </div>

        <div className="mt-4 mb-2">
          <button
            onClick={handleCashOnDelivery}
            type="button"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-400 rounded-lg cursor-pointer hover:text-gray-300 dark:text-gray-400 hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold text-start">
                Cash On Delivery
              </div>
              <div className="w-full text-start">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </div>
            <svg
              className="w-5 h-5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
