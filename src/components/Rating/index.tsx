import { StarIcon } from "@heroicons/react/24/outline";
import clxs from "classnames";
import { useStore } from "../../store";
import useBookRating from "../../hooks/useBookRating";

export interface RatingProps {
  bookId: string;
}

export default function Rating({ bookId }: RatingProps) {
  const { setRatingById } = useStore();
  const bookRating = useBookRating(bookId);

  const handleRating = (rating: number) => {
    setRatingById(bookId, rating);
  }

  return (
    <div className="mt-3">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              onClick={() => handleRating(rating)}
              key={rating}
              className={clxs(
                bookRating as number >= rating ? 'text-indigo-500' : 'text-gray-300',
                'h-5 w-5 flex-shrink-0 cursor-pointer hover:scale-105'
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{"product.rating"} out of 5 stars</p>
      </div>
    </div>
  )
}