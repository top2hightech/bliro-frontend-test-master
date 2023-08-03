import BookList from "../../components/BookList";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import { useStore } from "../../store";

export default function Library() {
  const { books } = useStore();
  
  return (
    <div className="space-y-4">
      <SearchBox />
      {books.length > 0 && 
        <>
          <Pagination />
          <BookList books={books} />
          <Pagination />
        </>
      }
    </div>
  )
}