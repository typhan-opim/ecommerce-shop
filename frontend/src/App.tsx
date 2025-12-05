import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalContainer from "@/components/ModalContainer";
import Context from "@/context";
import { ModalProvider } from "@/context/ModalContext";
import { useAddToCartProductCount } from "@/hooks/useAddToCartProductCount";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCallback } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  // React Query fetch (tự cache toàn app)
  const { data: userData, refetch: refetchUser } = useCurrentUser();
  const { data: cartData, refetch: refetchCartCount } = useAddToCartProductCount();
  console.log("Current User Data:", userData);

  // lấy từ React Query luôn, không cần state
  const cartProductCount = cartData?.data?.count ?? 0;

  const fetchUserDetails = useCallback(async () => {
    await refetchUser();
  }, [refetchUser]);

  const fetchUserAddToCart = useCallback(async () => {
    await refetchCartCount();
  }, [refetchCartCount]);

  return (
    <ModalProvider>
      <ModalContainer />
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </ModalProvider>
  );
}

export default App;