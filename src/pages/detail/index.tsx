import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import clxs from "classnames";
import useBookInWishlist from "../../hooks/useBookInWhislist";
import Rating from "../../components/Rating";

import { ChevronDoubleLeftIcon, StarIcon as FillStarIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { useStore } from "../../store";
import { DetailBook } from "../../store/types";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";


export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loadBookById } = useStore();
  const [book, setBook] = useState<DetailBook | null>(null);
  const { isInWishlist, addBookToWishlist, removeBookFromWishlist } = useBookInWishlist(id as string);

  const handlePreviousPage = () => {
    navigate(-1);
  }

  useEffect(() => {
    (async () => {
      const response = await loadBookById(id as string);
      setBook(response);
    })();
  }, [])

  if(!book)
    return <></>;

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-12 lg:max-w-7xl lg:px-8">
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-8">
          {/* Image gallery */}
          <div>
            <span
              onClick={handlePreviousPage}
              className="relative inline-flex items-center cursor-pointer rounded-full px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mb-4"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <img
              src={book?.thumbnail}
              alt={book?.title}
              className="w-full object-cover object-center sm:rounded-lg"
            />
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center space-x-4">
              <span>{book?.title}</span>
              {
                isInWishlist ?
                  <FillStarIcon
                    onClick={() => removeBookFromWishlist(id as string)}
                    aria-hidden="true"
                    className="inline-block h-8 w-8 cursor-pointer transition-all hover:scale-110 text-yellow-300 hover:text-yellow-400"
                  /> :
                  <StarIcon
                    onClick={() => addBookToWishlist(book)}
                    aria-hidden="true"
                    className="inline-block h-8 w-8 cursor-pointer transition-all hover:scale-110 hover:text-yellow-400"
                  />
              }
            </h1>
            <div className="mt-3">
              <h2 className="sr-only">Book information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{book?.authors}</p>
              <p className="text-lg tracking-tight text-gray-900">{book?.publisher} {book?.publishedDate}</p>
            </div>
            {/* Reviews */}
            <Rating bookId={book?.id} />

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: book?.description as string }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
