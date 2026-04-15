
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Product } from "@/types";
type SearchUIProps = {
    isMobile?: boolean;
    searchItem: string;
    setSearchItem: (value: string) => void;
    products?: Product[];
    isLoading: boolean;
}
  

const SearchBar = ({ isMobile = false, searchItem, setSearchItem, products, isLoading }: SearchUIProps) => {
    const navigate = useNavigate();
    return (
    <div className="flex items-center gap-2 relative w-full">
      <Search className={`absolute right-3 ${isMobile ? "text-blackblue" : "text-black"}`} size={18} />
      
      <input
        type="text"
        placeholder="بحث"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        className={`border border-blackblue rounded-md pr-9 pl-3 outline-none bg-blackblue text-right py-2 ${
          isMobile ? "w-full" : "w-40 lg:w-52"
        }`}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute top-[-35px] left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap">
          جاري التحميل...
        </div>
      )}

      {/* Results Dropdown */}
      {searchItem && (
        <div className="absolute z-[60] top-full right-0 bg-white text-black w-64 max-h-64 overflow-y-auto flex flex-col rounded-xl shadow-xl mt-2 p-2 gap-2">
          {(products?.length ?? 0) > 0 ? (
            products?.map((product: Product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                onClick={() => {
                    navigate(`/product-details/${product.id}`);
                    setSearchItem(""); // Clear search after clicking
                }}
              >
                <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                <div className="flex flex-col text-right flex-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm font-bold text-green-600">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm py-2">لا يوجد نتائج</p>
          )}
        </div>
      )}
    </div>
  );


};

export default SearchBar;