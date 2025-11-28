import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "@/common";
import VerticalCard from "@/components/VerticalCard";
import productCategory from "@/helpers/productCategory";

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
  // react-select multi value for Category
  const categoryOptions = productCategory.map((cat) => ({ value: cat.value, label: cat.label }));
  const [sortBy, setSortBy] = useState("asc");
  const selectedCategoryOptions = categoryOptions.filter(opt => selectCategory[opt.value]);

  // Price range filter
  const priceRangeOptions = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-500", label: "$200 - $500" },
    { value: "500-1000", label: "$500 - $1000" },
    { value: "1000+", label: "$1000+" },
  ];
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRangeOptions[0]);

  // react-select single value for Sort by
  const sortOptions = [
    { value: "asc", label: "Price - Low to High" },
    { value: "dsc", label: "Price - High to Low" },
  ];
  const selectedSortOption = sortOptions.find(opt => opt.value === sortBy) || null;
  const filterCategoryList = useMemo(() => {
    return Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );
  }, [selectCategory]);
  const [loading] = useState(false); // loading is not used, but kept for prop compatibility

  const handleSelectCategory = (selected: any) => {
    const newCategory: CategoryMap = {};
    (selected || []).forEach((cat: { value: string }) => {
      newCategory[cat.value] = true;
    });
    setSelectCategory(newCategory);
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
      let products = dataResponse?.data || [];
      // Filter by price range if not 'all'
      if (selectedPriceRange.value !== "all") {
        products = products.filter((product: Product) => {
          const price = product.sellingPrice;
          if (selectedPriceRange.value === "1000+") return price >= 1000;
          const [min, max] = selectedPriceRange.value.split("-").map(Number);
          return price >= min && price <= max;
        });
      }
      setData(products);
    })();
  }, [filterCategoryList, selectedPriceRange]);
  const handlePriceRangeChange = (selected: any) => {
    setSelectedPriceRange(selected || priceRangeOptions[0]);
  };

  useEffect(() => {
    const urlFormat = filterCategoryList.map((el, index) => {
      if (filterCategoryList.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [filterCategoryList, navigate]);

  const handleOnChangeSortBy = (selected: any) => {
    const value = selected ? selected.value : "";
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
    <div className="container mx-auto px-4">
      {/***desktop version */}
      <div className="flex flex-col md:pt-8 pt-5">
        {/***left side */}
        <div className="bg-white grid lg:grid-cols-3 gap-4 p-4 rounded-xl shadow-md">
          {/* Sort by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Sort by</h3>
            <div className="text-sm flex flex-col gap-2 py-2">
              <Select
                options={sortOptions}
                value={selectedSortOption}
                onChange={handleOnChangeSortBy}
                isClearable
                placeholder="Select sort order"
              />
            </div>
          </div>
          {/* Price range */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Price Range</h3>
            <div className="text-sm flex flex-col gap-2 py-2">
              <Select
                options={priceRangeOptions}
                value={selectedPriceRange}
                onChange={handlePriceRangeChange}
                isSearchable={false}
                placeholder="Select price range"
              />
            </div>
          </div>
          {/* Category */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
            <div className="text-sm flex flex-col gap-2 py-2">
              <Select
                options={categoryOptions}
                value={selectedCategoryOptions}
                onChange={handleSelectCategory}
                isMulti
                placeholder="Select categories"
                closeMenuOnSelect={false}
              />
            </div>
          </div>
        </div>

        {/***right side ( product ) */}
        <div>
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="py-6">
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
