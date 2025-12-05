import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";
import { getData } from '@/services/apiService';
import Loading from "@/common/Loading";

type Product = {
  _id: string;
  productImage: string[];
  productName: string;
  category: string;
  sellingPrice: number;
  price: number;
};

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // console.log("query", query.search);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const url = SummaryApi.searchProduct.url + query.search;
      const dataResponse = await getData<any>(url);
      setLoading(false);
      setData(dataResponse.data);
    };
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <Loading />}

      <p className="text-lg font-semibold my-3">
        Search Results : {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
