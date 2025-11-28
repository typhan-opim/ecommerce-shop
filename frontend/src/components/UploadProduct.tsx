import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";

interface UploadProductProps {
  onClose: () => void;
  fetchData: () => void;
  isEdit?: boolean;
  productData?: Partial<ProductData>;
}

type ProductData = {
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: string;
  sellingPrice: string;
};

const UploadProduct = ({ onClose, fetchData, isEdit = false, productData }: UploadProductProps) => {
  const [data, setData] = useState<ProductData>(
    isEdit && productData
      ? {
          productName: productData.productName || "",
          brandName: productData.brandName || "",
          category: productData.category || "",
          productImage: productData.productImage || [],
          description: productData.description || "",
          price: productData.price || "",
          sellingPrice: productData.sellingPrice || "",
        }
      : {
          productName: "",
          brandName: "",
          category: "",
          productImage: [],
          description: "",
          price: "",
          sellingPrice: "",
        }
  );
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploadImageCloudinary = await uploadImage(file);
    setData((preve) => ({
      ...preve,
      productImage: [...preve.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = async (index: number) => {
    console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  {
    /**upload product */
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = SummaryApi.uploadProduct.url;
    let method = SummaryApi.uploadProduct.method;
    if (isEdit) {
      url = SummaryApi.updateProduct.url;
      method = SummaryApi.updateProduct.method;
    }
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl h-full max-h-[90vh] overflow-hidden relative animate-fade-in-up">
        <div className="flex justify-between items-center pb-3 mb-2">
          <h2 className="font-bold text-2xl text-orange-600">{isEdit ? "Edit Product" : "Upload Product"}</h2>
          <button
            className="w-10 h-10 flex items-center justify-center text-2xl text-slate-500 hover:text-red-600 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <CgClose />
          </button>
        </div>

        <form
          className="grid gap-3 overflow-y-auto h-full pb-5 pr-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName" className="font-semibold text-slate-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="brandName"
                className="mt-1 font-semibold text-slate-700 block"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                placeholder="Enter brand name"
                value={data.brandName}
                name="brandName"
                onChange={handleOnChange}
                className="p-3 bg-slate-100 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="mt-1 font-semibold text-slate-700 block"
              >
                Category
              </label>
              <select
                required
                value={data.category}
                name="category"
                onChange={handleOnChange}
                className="p-3 bg-slate-100 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
              >
                <option value={""}>Select Category</option>
                {productCategory.map((el, index) => (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label
            htmlFor="productImage"
            className="mt-1 font-semibold text-slate-700"
          >
            Product Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-3 bg-slate-100 border border-stone-300 rounded-lg h-32 w-full flex justify-center items-center cursor-pointer hover:bg-orange-50 transition">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 flex-wrap">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={el + index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className="bg-slate-100 border border-stone-300 rounded-lg cursor-pointer shadow hover:shadow-lg transition"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-orange-600 rounded-full hidden group-hover:block cursor-pointer shadow-lg"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-1 font-semibold text-slate-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <label
            htmlFor="sellingPrice"
            className="mt-1 font-semibold text-slate-700"
          >
            Selling Price
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <label
            htmlFor="description"
            className="mt-1 font-semibold text-slate-700"
          >
            Description
          </label>
          <textarea
            className="h-28 bg-slate-100 border border-stone-300 rounded-lg resize-none p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="mt-2 px-6 py-3 bg-orange-600 text-white rounded-full text-lg font-semibold shadow hover:bg-orange-700 transition mb-10">
            {isEdit ? "Update Product" : "Upload Product"}
          </button>
        </form>

        {/* display image full screen */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;
