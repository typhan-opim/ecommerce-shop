import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import Context from "../context";
import displayUSDCurrency from "../helpers/displayCurrency";

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
  const [data, setData] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context) as ContextType;
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    })();
  }, []);

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
      fetchData();
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
        fetchData();
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
      fetchData();
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
    console.log("payment response", responseData);
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
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded flex gap-4 items-center"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage?.[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative w-full">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-orange-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex gap-2 items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayUSDCurrency(
                            product?.productId?.sellingPrice || 0
                          )}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg line-through">
                          {displayUSDCurrency(
                            (product?.productId?.price || 0) *
                              (product?.quantity || 0)
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-orange-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQty(product._id, product.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-orange-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product._id, product.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-orange-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayUSDCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-blue-600 p-2 text-white w-full mt-2"
                  onClick={handlePayment}
                >
                  Payment
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
