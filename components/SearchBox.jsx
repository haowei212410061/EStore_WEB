import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="flex items-center border border-gray-300 ml-100 rounded-xl px-4 py-2 w-full h-[40px] max-w-md bg-white shadow-sm">
      <Search className="text-gray-500 mr-2" size={20} />
      <input
        type="text"
        placeholder="Search products..."
        className="w-full outline-none bg-transparent text-gray-800"
      />
    </div>
  );
}
