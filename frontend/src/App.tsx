import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { ContextType } from "@/context";
import Context from "@/context";
import { useAddToCartProductCount } from "@/hooks/useAddToCartProductCount";
import { useCurrentUser } from "@/hooks/useCurrentUser";
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
  const { data: cartCountData, refetch: refetchCartCount } = useAddToCartProductCount();


  // React Query: fetch user details
  const { data: userData, refetch: refetchUser } = useCurrentUser();
  // fetchUserDetails luôn gọi refetchUser để lấy dữ liệu mới nhất
  const fetchUserDetails = useCallback(async () => {
    const { data } = await refetchUser();
    if (data?.success) {
      dispatch(setUserDetails(data.data));
    }
  }, [dispatch, refetchUser]);

  const fetchUserAddToCart = useCallback(async () => {
    await refetchCartCount();
  }, [refetchCartCount]);

  useEffect(() => {
    if (cartCountData?.data?.count !== undefined) {
      setCartProductCount(cartCountData.data.count);
    }
  }, [cartCountData]);

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, fetchUserAddToCart]);
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
