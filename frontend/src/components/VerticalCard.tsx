import { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "@/context";
import addToCart from "@/helpers/addToCart";
import displayUSDCurrency from "@/helpers/displayCurrency";
import scrollTop from "@/helpers/scrollTop";
import { useModal } from "@/context/ModalContext";

type Product = {
  _id: string;
  productImage: string[];
  productName: string;
  category: string;
  sellingPrice: number;
  price: number;
};

type VerticalCardProps = {
  loading: boolean;
  data?: Product[];
};

type ContextType = {
  fetchUserAddToCart: () => void;
};

const VerticalCard = ({ loading, data = [] }: VerticalCardProps) => {
  const loadingList = new Array(13).fill(null);
  const context = useContext(Context) as ContextType | null;
  const fetchUserAddToCart = context?.fetchUserAddToCart || (() => {});
  const { showModal } = useModal();

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    await addToCart(e, id, showModal);
    fetchUserAddToCart();
  };

  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 md:gap-4 transition-all">
      {loading
        ? loadingList.map((_, id) => {
            return (
              <div
                key={`loading-item-${id}`}
                className="w-full bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                  </div>
                  <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data.map((product) => {
            return (
              <Link
                key={`product-item-${product?._id}`}
                to={"/product/" + product?._id}
                className="w-full bg-white rounded-sm shadow "
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayUSDCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayUSDCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
