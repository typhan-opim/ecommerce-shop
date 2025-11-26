import SummaryApi from "@/common";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { ContextType } from "@/context";
import Context from "@/context";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  }, [dispatch]);

  const fetchUserAddToCart = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  }, []);

  useEffect(() => {
    (async () => {
      await fetchUserDetails();
      await fetchUserAddToCart();
    })();
  }, [fetchUserDetails, fetchUserAddToCart]);
  return (
    <>
      <Context.Provider
        value={
          {
            fetchUserDetails,
            cartProductCount,
            fetchUserAddToCart,
          } as ContextType
        }
      >
        <ToastContainer position="top-center" />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
