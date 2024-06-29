import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { useUserStore } from "@/store/userStore";
import { useGameStore } from "@/store/gameStore";
import { useProductStore } from "@/store/productStore";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const signOut = useUserStore((state) => state.clearUser);
  const initGameCart = useGameStore((state) => state.initGameCart);
  const initProductCart = useProductStore((state) => state.initProductCart);
  const gameCount = useGameStore((state) => state.getGameCount());
  const productCount = useProductStore((state) => state.getProductCount());

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleResponsive() {
    setIsMobile(!isMobile);
  }
  function handleActive({ isActive }) {
    return isActive
      ? "block py-2 px-4 text-amber-600"
      : "block py-2 px-4 text-white hover:text-amber-600";
  }

  //Navbar Animation Code
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState("");

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.02 || current === 1) {
        setColor("bg-gray-950 lg:bg-transparent");
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
          setColor("bg-gray-950");
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    setPopoverOpen(false);
    if (user) {
      initGameCart(user.id);
      initProductCart(user.id);
    }
  }, [user]);
  console.log("Navbar");
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          initial={{
            opacity: 1,
            // Initial opacity set to 0 for fade-in effect
            // Initially transparent background
          }}
          animate={{
            opacity: visible ? 1 : 0, // Black color code with full opacity when visible, transparent otherwise
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className={`fixed w-full top-0 z-50 ${color}`}
        >
          <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 z-10">
            <NavLink
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/src/assets/logo.png"
                className="h-8"
                alt="Flowbite Logo"
              />
            </NavLink>
            <button
              onClick={handleResponsive}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden "
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`${
                isMobile ? "block" : "hidden"
              } w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul className="font-semibold flex flex-col p-4 text-base capitalize md:p-0 mt-4 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to="/" className={handleActive}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/games" className={handleActive}>
                    Games
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/playonline" className={handleActive}>
                    PlayOnline
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/store" className={handleActive}>
                    Store
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news" className={handleActive}>
                    News
                  </NavLink>
                </li>
                {user ? (
                  <>
                    <li
                      onMouseEnter={() => setPopoverOpen(true)}
                      onMouseLeave={() => setPopoverOpen(false)}
                      className="relative"
                    >
                      <a
                        onClick={() => setPopoverOpen(!isPopoverOpen)}
                        className="block py-2 px-4 text-white cursor-pointer hover:text-amber-600"
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6  "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="px-1 ">
                            {user.name ? user.name : "User"}
                          </span>
                        </div>
                      </a>

                      <AnimatePresence>
                        {isPopoverOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="lg:absolute right-0 z-20 lg:w-48 py-1 origin-top-right "
                          >
                            <div className="mt-2 py-1 bg-gray-900 rounded-md shadow-xl ">
                              <NavLink
                                to="/useraccount"
                                className="flex items-center px-3 py-3 text-sm  capitalize transition-colors duration-300 transform text-gray-300  hover:bg-gray-800 hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                                    fill="currentColor"
                                  ></path>
                                  <path
                                    d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>

                                <span className="mx-1">view profile</span>
                              </NavLink>

                              <NavLink
                                to="/useraccount/myorders"
                                className="flex items-center p-3 text-sm  capitalize transition-colors duration-300 transform text-gray-300 hover:bg-gray-800 hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 20"
                                >
                                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>

                                <span className="mx-1">My Orders</span>
                              </NavLink>

                              <a
                                href="#"
                                className="flex items-center p-3 text-sm  capitalize transition-colors duration-300 transform text-gray-300 hover:bg-gray-800 hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21 19H3C1.89543 19 1 18.1046 1 17V16H3V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V16H23V17C23 18.1046 22.1046 19 21 19ZM5 7V16H19V7H5Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>

                                <span className="mx-1">Shipping Address</span>
                              </a>

                              <hr className="border-gray-700 " />
                              <a
                                href="#"
                                className="flex items-center p-3 text-sm  capitalize transition-colors duration-300 transform text-gray-300 hover:bg-gray-800 hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C6.47967 21.9939 2.00606 17.5203 2 12V11.8C2.10993 6.30452 6.63459 1.92794 12.1307 2.00087C17.6268 2.07379 22.0337 6.56887 21.9978 12.0653C21.9619 17.5618 17.4966 21.9989 12 22ZM11.984 20H12C16.4167 19.9956 19.9942 16.4127 19.992 11.996C19.9898 7.57928 16.4087 3.99999 11.992 3.99999C7.57528 3.99999 3.99421 7.57928 3.992 11.996C3.98979 16.4127 7.56729 19.9956 11.984 20ZM13 18H11V16H13V18ZM13 15H11C10.9684 13.6977 11.6461 12.4808 12.77 11.822C13.43 11.316 14 10.88 14 9.99999C14 8.89542 13.1046 7.99999 12 7.99999C10.8954 7.99999 10 8.89542 10 9.99999H8V9.90999C8.01608 8.48093 8.79333 7.16899 10.039 6.46839C11.2846 5.76778 12.8094 5.78493 14.039 6.51339C15.2685 7.24184 16.0161 8.57093 16 9.99999C15.9284 11.079 15.3497 12.0602 14.44 12.645C13.6177 13.1612 13.0847 14.0328 13 15Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>

                                <span className="mx-1">Help</span>
                              </a>
                              <a
                                onClick={signOut}
                                className="flex items-center p-3 text-sm  capitalize transition-colors duration-300 transform text-gray-300 hover:bg-gray-800 hover:text-white"
                              >
                                <svg
                                  className="w-5 h-5 mx-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>

                                <span className="mx-1">Sign Out</span>
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>

                    <li>
                      <NavLink to="/cart">
                        <button
                          type="button"
                          className="mx-2 relative inline-flex items-center py-2 text-sm font-medium text-center text-white "
                        >
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
                          <span className="sr-only">Notifications</span>
                          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-sm font-base text-white bg-gray-900 border border-white rounded-full top-1 -end-2 dark:border-gray-900">
                            {gameCount + productCount}
                          </div>
                        </button>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink to="/signin" className={handleActive}>
                      SignIn
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
