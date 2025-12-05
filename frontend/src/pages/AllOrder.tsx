import moment from "moment";
import { useAllOrder } from "@/hooks/useAllOrder";
import displayUSDCurrency from "@/helpers/displayCurrency";
import Loading from "@/common/Loading";

const AllOrder = () => {
  const { data: queryData, isLoading } = useAllOrder();
  type Product = {
    productId: string;
    image: string[];
    name: string;
    price: number;
    quantity: number;
  };
  type Shipping = {
    shipping_rate: string;
    shipping_amount: number;
  };
  type PaymentDetails = {
    payment_method_type: string[];
    payment_status: string;
  };
  type Order = {
    userId: string;
    createdAt: string;
    productDetails: Product[];
    paymentDetails: PaymentDetails;
    shipping_options: Shipping[];
    totalAmount: number;
  };
  const data = (queryData?.data || []) as Order[];
  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      {!data[0] && !isLoading && (
        <div className="text-center text-slate-400 py-12 text-lg">
          No Order available
        </div>
      )}
      {isLoading && (
        <Loading />
      )}
      <div className="grid gap-3 md:gap-4">
        {data.map((item: Order, index: number) => (
          <div
            key={item.userId + index}
            className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-blue-700 font-bold text-lg">
                  {moment(item.createdAt).format("LL")}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ml-2 ${
                    item.paymentDetails.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.paymentDetails.payment_status === "paid"
                    ? "Paid"
                    : item.paymentDetails.payment_status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 text-sm">Order ID:</span>
                <span className="ml-2 font-mono text-slate-700 text-xs">
                  {item.userId.slice(-8)}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Product List */}
              <div className="flex-1 grid gap-3">
                {item.productDetails.map((product: Product, idx: number) => (
                  <div
                    key={product.productId + idx}
                    className="flex gap-4 bg-slate-50 rounded-xl p-3 hover:bg-blue-50 transition"
                  >
                    <img
                      src={product.image[0]}
                      className="w-20 h-20 rounded-lg bg-slate-200 object-contain p-2 border border-slate-300"
                      alt={product.name}
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-base text-ellipsis line-clamp-1">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-lg text-blue-600 font-bold">
                          {displayUSDCurrency(product.price)}
                        </span>
                        <span className="text-xs text-slate-500">
                          x{product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Payment & Shipping */}
              <div className="flex flex-col gap-4 p-2 min-w-[260px]">
                <div>
                  <div className="text-base font-semibold mb-1 text-slate-700">
                    Payment
                  </div>
                  <div className="ml-1 text-sm">
                    <div>
                      Method:{" "}
                      <span className="font-medium text-slate-600">
                        {item.paymentDetails.payment_method_type[0]}
                      </span>
                    </div>
                    <div>
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          item.paymentDetails.payment_status === "paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {item.paymentDetails.payment_status}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-base font-semibold mb-1 text-slate-700">
                    Shipping
                  </div>
                  <div className="ml-1 text-sm">
                    {item.shipping_options.map((shipping: Shipping) => (
                      <div key={shipping.shipping_rate}>
                        Shipping Amount:{" "}
                        <span className="font-medium">
                          {displayUSDCurrency(shipping.shipping_amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <div className="font-bold text-xl text-blue-700 bg-blue-50 px-6 py-2 rounded-full shadow">
                Total: {displayUSDCurrency(item.totalAmount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrder;
