import { useStore } from "../store";

const useBookInWishlist = (id: string) => {
  const { wishlist, addBookToWishlist, removeBookFromWishlist } = useStore();

  const isBookInWishlist = (id: string) => {
    const idx = wishlist.findIndex((book) => book.id === id);
    return idx !== -1;
  }

  return {
    isInWishlist: isBookInWishlist(id),
    addBookToWishlist,
    removeBookFromWishlist
  };
}

export default useBookInWishlist;