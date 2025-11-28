import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import displayUSDCurrency from "../helpers/displayCurrency";
import UploadProduct from "./UploadProduct";

type Product = {
  _id: string;
  productImage: string[];
  productName: string;
  sellingPrice: number;
  brandName: string;
  category: string;
  description: string;
  price: number;
};

interface AdminProductCardProps {
  data: Product;
  fetchdata: () => void;
}

const AdminProductCard = ({ data, fetchdata }: AdminProductCardProps) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 relative">
      <div className="w-full flex flex-col gap-3">
        <div className="w-32 h-32 mx-auto flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayUSDCurrency(data.sellingPrice)}
          </p>

          <div
            className="w-fit absolute top-2 right-2 p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <UploadProduct
          isEdit={true}
          productData={{
            ...data,
            price: String(data.price),
            sellingPrice: String(data.sellingPrice),
          }}
          onClose={() => setEditProduct(false)}
          fetchData={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
