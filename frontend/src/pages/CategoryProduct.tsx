import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";
import productCategory from "../helpers/productCategory";

type Product = {
  _id: string;
  productImage: string[];
  productName: string;
  category: string;
  sellingPrice: number;
  price: number;
};

type CategoryMap = Record<string, boolean>;

const CategoryProduct = () => {
  const [data, setData] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject: CategoryMap = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState<CategoryMap>(
    urlCategoryListObject
  );
  const filterCategoryList = useMemo(() => {
    return Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );
  }, [selectCategory]);
  const [sortBy, setSortBy] = useState("");
  const [loading] = useState(false); // loading is not used, but kept for prop compatibility

  const handleSelectCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectCategory((preve) => ({
      ...preve,
      [value]: checked,
    }));
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    })();
  }, [filterCategoryList]);

  useEffect(() => {
    const urlFormat = filterCategoryList.map((el, index) => {
      if (filterCategoryList.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [filterCategoryList, navigate]);

  const handleOnChangeSortBy = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((preve) =>
        [...preve].sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    }
    if (value === "dsc") {
      setData((preve) =>
        [...preve].sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  };

  // useEffect for sortBy is not needed as sorting is handled in handleOnChangeSortBy

  return (
    <div className="container mx-auto p-4">
      {/***desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/***left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/**sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName) => {
                return (
                  <div
                    className="flex items-center gap-3"
                    key={categoryName.value}
                  >
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={!!selectCategory[categoryName.value]}
                      value={categoryName.value}
                      id={categoryName.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName.value}>
                      {categoryName.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/***right side ( product ) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
