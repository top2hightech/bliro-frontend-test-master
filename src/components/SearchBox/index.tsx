import { KeyboardEvent } from "react";
import { useStore } from "../../store";

export default function SearchBox() {
  const { keyword, loadBooksByKeyword } = useStore();
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key !== "Enter") return;
    const keyword = e.currentTarget.value;
    loadBooksByKeyword(keyword);
  }

  return (
    <div>
      <div className="mt-2">
        <input
          type="text"
          name="keyword"
          defaultValue={keyword}
          className="block text-center w-full mx-auto md:w-4/5 lg:w-3/4 rounded-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Please enter keyword"
          onKeyUp={handleSearch}
        />
      </div>
    </div>
  )
}