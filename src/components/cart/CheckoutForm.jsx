import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { useTotalAmountStore } from "@/store/totalAmountStore";
import { useUserStore } from "@/store/userStore";

export default function CheckoutForm() {
  const navigateTo = useNavigate();
  const user = useUserStore((state) => state.user);
  const totalAmount = useTotalAmountStore((state) => state.totalAmount);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users?id=${user.id}`)
      .then((response) => {
        const userData = response.data[0]; // Assuming the response is an array with one object
        setFormData({
          firstName: (userData.name || "").split(" ")[0] || "",
          lastName: (userData.name || "").split(" ").slice(-1)[0] || "",
          email: userData.email || "",
          number: userData.number || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          zipcode: userData.zipcode || "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    navigateTo("/paymentform");
  }
  console.log("Checkout form component");
  return (
    <div className="p-4 mt-24 max-w-screen-sm mx-auto">
      <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
        <div className="mb-4 flex items-center rounded-lg py-2">
          <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
            <svg
              className="h-6 w-8 hover:text-amber-700"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>ionicons-v5-d</title>
                <circle cx="176" cy="416" r="32"></circle>
                <circle cx="400" cy="416" r="32"></circle>
                <path d="M456.8,120.78A23.92,23.92,0,0,0,438.24,112H133.89l-6.13-34.78A16,16,0,0,0,112,64H48a16,16,0,0,0,0,32H98.58l45.66,258.78A16,16,0,0,0,160,368H416a16,16,0,0,0,0-32H173.42l-5.64-32H409.44A24.07,24.07,0,0,0,433,284.71l28.8-144A24,24,0,0,0,456.8,120.78Z"></path>
              </g>
            </svg>
          </div>
          <div className="flex flex-1">
            <p className="text-sm font-medium">
              You have <strong>4</strong> items in cart. Sub total is{" "}
              <strong>${totalAmount}</strong>
            </p>
          </div>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            View Items
          </button>
        </div>
        <p className="text-xl font-bold text-gray-900">Shipping Address</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your first name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your last name"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="number"
                >
                  Phone Number
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="tel"
                  placeholder="Enter your phone number"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  className="flex h-24 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your address"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your city"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="state"
              >
                State
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your state"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter your zip code"
                id="zipCode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              ></input>
            </div>

            <div className="col-span-2 grid">
              <button
                type="submit"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next Step
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
