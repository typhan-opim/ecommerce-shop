import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { useAddToCartProductView } from "@/hooks/useAddToCartProductView";
import { MdDelete } from "react-icons/md";
import SummaryApi from "@/common";
import Context from "@/context";
import displayUSDCurrency from "@/helpers/displayCurrency";

type Product = {
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  sellingPrice: number;
};

type CartProduct = {
  _id: string;
  productId: Product;
  quantity: number;
  userId: string;
};

type ContextType = {
  fetchUserAddToCart: () => void;
} | null;

const Cart = () => {
  const context = useContext(Context) as ContextType;
  const { data: queryData, isLoading, refetch } = useAddToCartProductView();
  const data = (queryData?.success ? queryData.data : []) as CartProduct[];
  const loading = isLoading;
  const loadingCart = new Array(4).fill(null);

  // fetchData is now handled by React Query's refetch

  const increaseQty = async (id: string, qty: number) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      refetch();
    }
  };

  const decraseQty = async (id: string, qty: number) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        refetch();
      }
    }
  };

  const deleteCartProduct = async (id: string) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      refetch();
      context?.fetchUserAddToCart?.();
    }
  };

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });
    const responseData = await response.json();
    if (responseData?.id && stripePromise) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
    // console.log("payment response", responseData);
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) =>
      previousValue + (currentValue.quantity || 0),
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) =>
      preve + (curr.quantity || 0) * (curr?.productId?.sellingPrice || 0),
    0
  );
  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-8 rounded-xl shadow text-slate-400 text-xl">No products in your cart.</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/* Cart Products */}
        <div className="w-full">
          {loading
            ? loadingCart?.map((el, index) => (
                <div
                  key={el + "Add To Cart Loading" + index}
                  className="w-full bg-slate-200 h-36 my-3 first:mt-0 border border-slate-300 animate-pulse rounded-2xl"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id + "Add To Cart Loading"}
                  className="w-full bg-white h-36 my-3 first:mt-0 border border-slate-200 rounded-2xl flex gap-6 items-center shadow hover:shadow-lg transition p-2"
                >
                  <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={product?.productId?.productImage?.[0]}
                      className="w-full h-full object-contain mix-blend-multiply"
                      alt={product?.productId?.productName}
                    />
                  </div>
                  <div className="py-2 relative w-full pr-10">
                    {/* Delete product */}
                    <button
                      className="absolute right-0 top-0 text-red-600 rounded-full p-2 hover:bg-orange-600 hover:text-white cursor-pointer transition"
                      onClick={() => deleteCartProduct(product._id)}
                      title="Remove from cart"
                    >
                      <MdDelete size={22} />
                    </button>

                    <h2 className="text-lg lg:text-xl font-semibold text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500 text-sm mb-1">
                      {product?.productId?.category}
                    </p>
                    <div className="flex gap-2 items-center justify-between">
                      <p className="text-orange-600 font-bold text-lg">
                        {displayUSDCurrency(product?.productId?.sellingPrice || 0)}
                      </p>
                      <p className="text-slate-400 font-semibold text-base line-through">
                        {displayUSDCurrency((product?.productId?.price || 0) * (product?.quantity || 0))}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white w-8 h-8 flex justify-center items-center rounded-full text-lg font-bold transition"
                        onClick={() => decraseQty(product._id, product.quantity)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-semibold text-lg px-2">{product.quantity}</span>
                      <button
                        className="border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white w-8 h-8 flex justify-center items-center rounded-full text-lg font-bold transition"
                        onClick={() => increaseQty(product._id, product.quantity)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-44 bg-slate-200 border border-slate-300 animate-pulse rounded-2xl"></div>
            ) : (
              <div className="bg-white rounded-2xl shadow flex flex-col justify-between pb-6">
                <h2 className="text-white bg-orange-600 px-6 py-3 rounded-t-2xl text-xl font-bold tracking-wide">Summary</h2>
                <div className="flex items-center justify-between px-6 gap-2 font-medium text-lg text-slate-600 mt-4">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-6 gap-2 font-medium text-lg text-slate-600 mb-4">
                  <p>Total Price</p>
                  <p className="text-orange-600 font-bold">{displayUSDCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-orange-600 p-3 text-white w-11/12 mx-auto mt-4 rounded-full text-lg font-semibold shadow hover:bg-orange-700 transition"
                  onClick={handlePayment}
                >
                  Checkout & Pay
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
