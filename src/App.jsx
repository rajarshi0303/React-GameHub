import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

//Layout
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
//Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const Games = lazy(() => import("./pages/Games"));
const GameDetails = lazy(() => import("./pages/GameDetails"));
const PlayOnline = lazy(() => import("./pages/PlayOnline"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Store = lazy(() => import("./pages/Store"));
const ProductFilter = lazy(() => import("./pages/ProductFilter"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const Cart = lazy(() => import("./pages/Cart"));
const CheckoutForm = lazy(() => import("./components/cart/CheckoutForm"));
const PaymentForm = lazy(() => import("./components/cart/PaymentForm"));
const UserAccount = lazy(() => import("./pages/UserAccount"));
const UserInformation = lazy(() =>
  import("./components/useraccount/UserInformation")
);
const UserOrders = lazy(() => import("./components/useraccount/UserOrders"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

//PlayOnline Games
const HomeContent = lazy(() => import("./components/playonline/HomeContent"));
const GameGenre = lazy(() => import("./components/playonline/GameGenre"));
const PlayOnlineLibrary = lazy(() =>
  import("./components/playonline/PlayOnlineLibrary")
);

import PageLoading from "./components/skeleton/PageLoading";
import ScrollToTop from "./layouts/ScrollToTop";

export default function App() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<PageLoading />}>
        <ScrollToTop />
        <Routes>
          <Route index element={<HomePage />} />

          <Route path="/games" element={<Games />} />
          <Route path="/game/:id" element={<GameDetails />} />

          <Route path="/playonline" element={<PlayOnline />}>
            <Route index element={<HomeContent />} />
            <Route path="genre" element={<GameGenre />} />
            <Route path="library" element={<PlayOnlineLibrary />} />
          </Route>

          <Route path="/news" element={<NewsPage />}></Route>

          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/store" element={<Store />}></Route>
          <Route path="/productfilter" element={<ProductFilter />}></Route>
          <Route
            path="/productdetils/:id"
            element={<ProductDetailsPage />}
          ></Route>

          <Route path="/useraccount" element={<UserAccount />}>
            <Route index element={<UserInformation />}></Route>
            <Route path="myorders" element={<UserOrders />}></Route>
          </Route>

          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<CheckoutForm />}></Route>
          <Route path="/paymentform" element={<PaymentForm />}></Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
}
