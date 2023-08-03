import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FillStarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { Book } from "../../store/types";

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  const navigate = useNavigate();

  const { wishlist, addBookToWishlist, removeBookFromWishlist } = useStore();

  const isBookInWishlist = (id: string) => {
    const idx = wishlist.findIndex((book) => book.id === id);
    return idx !== -1;
  }

  const handleViewDetail = (id: string) => {
    navigate(`/detail/${id}`);
  }

  return (
    <div className="px-8 py-4 border rounded-md bg-white">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
                    Categories
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">
                    Published Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">
                    Page
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleViewDetail(book.id)}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="w-11 pl-0 sm:pl-2 flex-shrink-0">
                          <img className="w-11" src={book.smallThumbnail} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 w-[120px] max-w-[360px] sm:w-auto overflow-hidden text-ellipsis">{book.title}</div>
                          <div className="mt-1 text-gray-500">{book.authors}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden sm:table-cell">
                      <div className="text-gray-900">{book.categories}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden lg:table-cell">{book.publishedDate}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden lg:table-cell">{book.pageCount}</td>

                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                      {
                        isBookInWishlist(book.id) ? 
                        <FillStarIcon 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBookFromWishlist(book.id);
                        }}
                        aria-hidden="true" 
                        className="block h-6 w-6 transition-all hover:scale-110 text-yellow-300 hover:text-yellow-400" 
                        /> :
                        <StarIcon 
                          onClick={(e) => {
                            e.stopPropagation();
                            addBookToWishlist(book);
                          }}
                          aria-hidden="true" 
                          className="block h-6 w-6 transition-all hover:scale-110 hover:text-yellow-400" 
                        />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
