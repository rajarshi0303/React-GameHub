import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useUserStore } from "@/store/userStore";

export default function UserInformation() {
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
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
          ...userData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log(formData);
    // Here, you can perform any necessary operations to update the user's name in your application
    axios
      .put(`http://localhost:3000/users/${user.id}`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-auto">
      <div className="w-full border rounded-lg shadow bg-gray-900 border-gray-700">
        <div className="flex flex-col items-center py-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/public/images/icons/profilepicture.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-white">Bonnie Green</h5>
          <span className="text-sm text-gray-400">Visual Designer</span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Upload Image
            </a>
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Remove Image
            </a>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 border rounded-lg shadow bg-gray-900 border-gray-700">
        <div className="px-4 lg:px-8 py-5 border-b rounded-t-lg border-gray-600">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-400">
                Account Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the user.
              </p>
            </div>
            {isEditing ? (
              <button
                className="px-4 py-1 lg:px-6 lg:py-2 font-medium tracking-wide text-white border-2 border-gray-700 capitalize transition-colors duration-300 transform bg-gray-800 rounded-md hover:bg-gray-900"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                className="px-4 py-1 lg:px-6 lg:py-2 font-medium tracking-wide text-white border-2 border-gray-700 capitalize transition-colors duration-300 transform bg-gray-800 rounded-md hover:bg-gray-900"
                onClick={handleUpdateClick}
              >
                Update
              </button>
            )}
          </div>
        </div>

        <div className=" px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-700">
            <div className="py-3 sm:py-5 grid grid-cols-6 sm:px-8">
              <dt className="text-sm font-medium text-gray-400 col-span-2 lg:col-span-1">
                Full Name :{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 col-span-4 lg:col-span-5">
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  formData.name
                )}
              </dd>
            </div>
            <div className="py-3 sm:py-5 grid grid-cols-6 sm:px-8">
              <dt className="text-sm font-medium text-gray-400 col-span-2 lg:col-span-1 ">
                Email Address :{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 col-span-4 lg:col-span-5">
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  formData.email
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 grid grid-cols-6 sm:px-8">
              <dt className="text-sm font-medium text-gray-400 col-span-2 lg:col-span-1">
                Phone number :{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 col-span-4 lg:col-span-5">
                {isEditing ? (
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  formData.number
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 grid grid-cols-6 sm:px-8">
              <dt className="text-sm font-medium text-gray-400 col-span-2 lg:col-span-1">
                Address :{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 col-span-4 lg:col-span-5">
                {isEditing ? (
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  formData.address
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 grid grid-cols-6 sm:px-8">
              <dt className="text-sm font-medium text-gray-400 col-span-2 lg:col-span-1">
                City :{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 col-span-4 lg:col-span-5">
                {isEditing ? (
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  formData.city
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 grid grid-cols-6 sm:px-8">
              <dt className="text-sm font-medium text-gray-400 col-span-2 lg:col-span-1">
                State :{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 col-span-4 lg:col-span-5">
                {isEditing ? (
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  formData.state
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 grid grid-cols-6 sm:px-8">
              <dt className="text-sm font-medium text-gray-400 col-span-2 lg:col-span-1">
                ZipCode :{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 col-span-4 lg:col-span-5">
                {isEditing ? (
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    className="bg-gray-700 text-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  formData.zipcode
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
