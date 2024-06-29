import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";

export default function UserOrders() {
  const navigateTo = useNavigate();
  const user = useUserStore((state) => state.user);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/userOrders?userId=${user.id}`)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  async function handleCancelOrder(orderId, itemId) {
    console.log(orderId, itemId);

    try {
      // Fetch the order by ID
      const response = await axios.get(
        `http://localhost:3000/userOrders/${orderId}`
      );
      const order = response.data;

      // Filter out the item to be cancelled
      const updatedOrderItems = order.orders.filter(
        (item) => item.id !== itemId
      );

      // If there are no items left in the order after removing the current item, delete the order
      if (updatedOrderItems.length === 0) {
        await axios.delete(`http://localhost:3000/userOrders/${orderId}`);
        console.log(`Order ${orderId} deleted successfully.`);

        // Update local state to remove the order
        setOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));
        return;
      }

      // Find the item to be cancelled
      const itemToRemove = order.orders.find((item) => item.id === itemId);
      // Calculate the new total by subtracting the price of the removed item
      let newTotal = order.total;
      if (itemToRemove) {
        const itemTotal = itemToRemove.count
          ? itemToRemove.price * itemToRemove.count
          : itemToRemove.price;
        newTotal -= itemTotal;
      }

      // Update the order with the new orders array and new total
      await axios.put(`http://localhost:3000/userOrders/${orderId}`, {
        ...order,
        orders: updatedOrderItems,
        total: newTotal,
      });

      console.log(
        `Order ${orderId} updated successfully, item ${itemId} removed.`
      );

      // Update local state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId
            ? { ...o, orders: updatedOrderItems, total: newTotal }
            : o
        )
      );
    } catch (error) {
      console.error("Error cancelling the order:", error);
    }
  }

  return (
    <div>
      <div className="w-full p-4 lg:p-6 space-y-8 sm:p-10 bg-gray-900 text-gray-800 rounded-xl">
        <h2 className="pb-4 text-2xl font-semibold capitalize text-gray-300">
          My Orders
        </h2>
        {orders.map((order) => (
          <div
            key={order.id}
            className="w-full mt-8 border rounded-lg shadow bg-gray-900 border-gray-700"
          >
            <div className="px-4 lg:px-6 py-5 border-b rounded-t-lg bg-gray-800 border-gray-600">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="lg:text-lg leading-6 font-medium text-gray-400">
                    Order{" "}
                    <span className="px-2 text-gray-300">#R{order.id}</span>
                  </h3>
                  <p className="text-sm lg:text-base mt-1 max-w-2xl font-semibold text-gray-400">
                    Order Placed {order.date}
                  </p>
                </div>
                <button className="px-4 lg:px-6 py-2 font-medium tracking-wide text-white border-2 border-gray-700 capitalize transition-colors duration-300 transform bg-gray-800 rounded-md hover:bg-gray-900">
                  Track
                </button>
              </div>
            </div>

            <ul className="flex flex-col divide-y divide-gray-500">
              {order.orders.map((item) => (
                <li key={item.id}>
                  <div className="px-4 lg:px-6 py-6 lg:grid grid-cols-5 grid-rows-1 items-center gap-4">
                    <div className="col-span-2">
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <img
                          onClick={() => {
                            if (item.productId) {
                              navigateTo(`/productdetils/${item.productId}`);
                            } else if (item.gameId) {
                              navigateTo(`/game/${item.gameId}`);
                            }
                          }}
                          className="flex-shrink-0 object-cover w-24 h-24 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                          src={item.thumbnail}
                          alt="Polaroid camera"
                        />
                        <div className="flex flex-col justify-between pb-1 ">
                          <div className="w-fit pb-2 space-x-2">
                            <div className="space-y-1">
                              <h3 className="text-base text-gray-200 uppercase font-semibold leading-snug sm:pr-8">
                                {item.name}
                              </h3>
                              {item.genres && (
                                <p className="text-sm capitalize text-gray-400">
                                  <span className="text-gray-300">Genres</span>{" "}
                                  :{item.genres}
                                </p>
                              )}
                              {item.platform && (
                                <p className="text-sm capitalize text-gray-400">
                                  <span className="text-gray-300">
                                    Platform
                                  </span>{" "}
                                  : {item.platform}
                                </p>
                              )}
                              {item.color && (
                                <p className="text-sm capitalize text-gray-400">
                                  <span className="text-gray-300">Color</span> :{" "}
                                  <button
                                    style={{ backgroundColor: item.color }}
                                    className="h-3 w-4 rounded-sm border border-gray-300 focus:outline-none"
                                  ></button>
                                </p>
                              )}
                              {item.size && (
                                <p className="text-sm capitalize text-gray-400">
                                  <span className="text-gray-300">Size</span> :{" "}
                                  {item.size}
                                </p>
                              )}
                              {item.count && (
                                <p className="text-sm capitalize text-gray-400">
                                  <span className="text-gray-300">Count</span> :{" "}
                                  {item.count}
                                </p>
                              )}
                            </div>
                          </div>
                          <p className="text-lg font-semibold text-gray-200 ">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 ">
                      <div className="lg:text-sm font-semibold text-gray-400">
                        Status
                      </div>
                      <div className="text-lg lg:text-base font-medium text-gray-200">
                        In-WarHouse
                      </div>
                    </div>
                    <div className="col-span-1 ">
                      <div className="lg:text-sm font-semibold text-gray-400">
                        Delivery Expected By
                      </div>
                      <div className="text-lg lg:text-base font-medium text-gray-200">
                        4 March, 2023
                      </div>
                    </div>

                    <div className="col-span-1 text-end lg:justify-self-center ">
                      <button
                        onClick={() => handleCancelOrder(order.id, item.id)}
                        className="px-4 lg:px-6 py-2 font-medium tracking-wide text-white border-2 border-gray-700 capitalize transition-colors duration-300 transform bg-gray-800 rounded-md hover:bg-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 py-4 border-t rounded-t-lg border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className=" leading-6 capitalize text-gray-400">
                  {order.paymentType}
                </h3>

                <h3 className="text-lg leading-6 text-gray-300 font-semibold">
                  ${order.total}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
