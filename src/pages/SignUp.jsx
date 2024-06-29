import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";

export default function SignUp() {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoaing] = useState(false);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    name: "",
  });

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { access_token } = codeResponse;
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
            },
          }
        );
        console.log("Google response", response.data);
        const { email, name } = response.data;
        axios
          .post("http://localhost:3000/users", {
            email: email,
            password: "",
            name: name,
          })
          .then((response) => {
            const { id, name } = response.data;
            // Save id and name in userStore
            setUser({ id, name });
            navigate("/games");
          })
          .catch((error) => {
            console.log(error);
            setLoaing(false);
          });
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleEmailChange(event) {
    const newEmail = event.target.value;
    setFormdata((prevformdata) => ({ ...prevformdata, email: newEmail }));
    if (newEmail.length > 0) {
      setEmailErrorMessage("");
    }
  }

  const handlePasswordChange = (event) => {
    const newPass = event.target.value;
    setFormdata((prevformdata) => ({ ...prevformdata, password: newPass }));

    // regular expressions to validate password
    let lowerCase = /[a-z]/g;
    let upperCase = /[A-Z]/g;
    let numbers = /[0-9]/g;
    if (!newPass.match(lowerCase)) {
      setErrorMessage("Password should contains lowercase letters!");
    } else if (!newPass.match(upperCase)) {
      setErrorMessage("Password should contain uppercase letters!");
    } else if (!newPass.match(numbers)) {
      setErrorMessage("Password should contains numbers also!");
    } else if (newPass.length < 8) {
      setErrorMessage("Password length should be more than 8.");
    } else {
      setErrorMessage("");
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //execute only when both fields are non-empty and both pass the validation
    if (formdata.email === "") {
      setEmailErrorMessage("Email Is Required");
    } else if (!emailRegex.test(formdata.email)) {
      setEmailErrorMessage("Please enter a valid email address");
    } else if (formdata.password === "") {
      setErrorMessage("Password Is Required");
    } else if (errorMessage.length) {
      // do nothing if there is error message for password
    } else {
      // Proceed with form submission or other actions
      console.log(formdata);
      setLoaing(true);
      axios
        .post("http://localhost:3000/users", formdata)
        .then((response) => {
          console.log(response.data);
          const { id, name } = response.data;
          // Save id and name in userStore
          setUser({ id, name });
          navigate("/games");
        })
        .catch((error) => {
          console.log(error);
          setLoaing(false);
        });
    }
  }

  return (
    <div>
      <section
        className="min-h-screen bg-cover "
        style={{
          backgroundImage: "url('/public/images/design/signup_bg.jpg')",
        }}
      >
        <div className="flex items-center justify-center min-h-screen bg-black/60">
          <div className="container flex flex-col flex-1 px-2 lg:px-6 py-12 mx-auto">
            <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
              <div className="text-white lg:w-1/2 lg:mx-6"></div>

              <div className="mt-8 lg:w-1/2 lg:mx-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-lg"
                >
                  <div className="flex justify-center mx-auto">
                    <img
                      className="w-auto h-10 sm:h-12"
                      src="src\assets\lion_logo.png"
                      alt=""
                    />
                  </div>

                  <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    Welcome To Gaming!
                  </p>

                  <div
                    onClick={login}
                    className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <div className="px-4 py-2">
                      <svg className="w-6 h-6" viewBox="0 0 40 40">
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                          fill="#FF3D00"
                        />
                        <path
                          d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#1976D2"
                        />
                      </svg>
                    </div>

                    <span className="w-5/6 px-4 py-3 font-bold text-center">
                      Sign up with Google
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                    <a
                      href="#"
                      className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      or sign up with email
                    </a>

                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                        htmlFor="LoggingEmailAddress"
                      >
                        Email Address
                      </label>
                      <input
                        id="LoggingEmailAddress"
                        type="text"
                        name="email"
                        value={formdata.email}
                        onChange={handleEmailChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                      <div className="text-red-700"> {emailErrorMessage} </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                          htmlFor="loggingPassword"
                        >
                          Password
                        </label>
                      </div>

                      <input
                        id="loggingPassword"
                        type="password"
                        name="password"
                        value={formdata.password}
                        onChange={handlePasswordChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                      {errorMessage && (
                        <div className="text-red-700">{errorMessage}</div>
                      )}
                    </div>

                    <div className="mt-6">
                      {loading ? (
                        <button
                          disabled
                          type="button"
                          className="w-full px-6 py-3 text-white font-medium text-sm text-center me-2 inline-flex items-center justify-center bg-gray-800 rounded-lg "
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                        >
                          Sign Up
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="flex items-center justify-center mt-4">
                    <NavLink to="/signin">
                      <div className="text-base font-semibold text-gray-500 capitalize dark:text-gray-400 hover:text-gray-800">
                        Have An Account ?{" "}
                        <span className="text-amber-600">SignIn</span>
                      </div>
                    </NavLink>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
/*The useGoogleLogin hook is used to handle the Google sign-up process. It takes an object as an argument that
specifies two callback functions: onSuccess and onError. The onSuccess function sets the user state variable 
to the codeResponse object returned by Google after a successful login. The onError function logs an error 
message if the login fails.
The useEffect hook is used to fetch the user's profile data from Google once the user state variable is set. 
It takes an array as a second argument, which specifies that the effect should only run when the user variable
changes. Inside the effect, an axios GET request is made to the Google API with the user's access token. 
The response data is then set as the profile state variable. */
