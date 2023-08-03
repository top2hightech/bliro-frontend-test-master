import BookList from "../../components/BookList";
import { useStore } from "../../store"

export default function Wishlist() {
  const { wishlist } = useStore();

  return (
    <BookList books={wishlist} />
  )
}