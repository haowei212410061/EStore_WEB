import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBox({ setSearchFunc, products }) {
  const [searchData, setSearchData] = useState("");

  function HandleSearchData(event) {
    const value = event.target.value;
    setSearchData(value);
  }
  return (
    <div className="flex items-center border border-gray-300 ml-100 rounded-xl px-4 py-2 w-full h-[40px] max-w-md bg-white shadow-sm">
      <Search
        className="text-gray-500 mr-2"
        size={20}
        onClick={() => setSearchFunc(products, searchData)}
      />
      <input
        onChange={(e) => HandleSearchData(e)}
        type="text"
        placeholder="Search products..."
        className="w-full outline-none bg-transparent text-gray-800"
      />
    </div>
  );
}
