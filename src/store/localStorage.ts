import { Book } from "./types";

const WISHLIST_KEY = "wishlist";
const RATING_KEY = "rating";

const addBookToWishlist = (book: Book) => {
  const books = loadWishlist();
  books.push(book);
  return saveWishlist(books);
}

const removeBookFromWishlist = (id: string) => {
  const books = loadWishlist();
  return saveWishlist(books.filter((book: Book) => book.id != id));
}

const loadWishlist = () => {
  const booksItem = localStorage.getItem(WISHLIST_KEY);
  if(!booksItem)  return [];
  return JSON.parse(booksItem);
}

const saveWishlist = (books: Book[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(books));
  return books;
}

const loadRating = () => {
  const ratings = localStorage.getItem(RATING_KEY);
  if(!ratings) return {};
  return JSON.parse(ratings);
}

const saveRating = (ratings: object) => {
  localStorage.setItem(RATING_KEY, JSON.stringify(ratings));
  return ratings;
}

const setRatingById = (bookId: string, rating: number) => {
  const ratings = loadRating();
  ratings[bookId] = rating;
  return saveRating(ratings);
}

export default {
  addBookToWishlist,
  removeBookFromWishlist,
  loadWishlist,
  loadRating,
  saveRating,
  setRatingById
}