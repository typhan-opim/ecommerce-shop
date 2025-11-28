import { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    // console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    (async () => {
      await fetchAllProduct();
    })();
  }, []);

  return (
    <div className="container mx-auto py-4 px-2 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-linear-to-r from-orange-50 to-red-100 rounded-2xl shadow p-6 mb-6">
        <h2 className="font-bold text-2xl text-red-700 tracking-tight flex items-center gap-2">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></svg>
          All Products
        </h2>
        <button
          className="flex items-center gap-2 border-2 border-red-500 text-red-600 font-semibold hover:bg-red-500 hover:text-white transition-all py-2 px-6 rounded-full shadow-md mt-4 sm:mt-0"
          onClick={() => setOpenUploadProduct(true)}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-upload"><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload Product
        </button>
      </div>

      {/* all product */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 py-4">
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + "allProduct"}
            fetchdata={fetchAllProduct}
          />
        ))}
      </div>

      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
