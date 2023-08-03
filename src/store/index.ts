import api from "../api";
import { create } from "zustand";
import { Book, DetailBook } from "./types";
import storage from "./localStorage";

export interface Store {
  books: Book[];
  wishlist: Book[];
  keyword: string;
  curPage: number;
  totalItems: number;
  pagePerSize: number;
  loading: boolean;
  ratings: Rating;

  loadBooks: (keyword: string, page: number) => Promise<void>;
  loadBooksByKeyword: (keyword: string) => void;
  loadBooksByPage: (page: number) => void;
  addBookToWishlist: (book: Book | DetailBook | null) => void;
  removeBookFromWishlist: (id: string) => void;
  loadBookById: (id: string) => Promise<DetailBook>;
  loadRatingById: (id: string) => number;
  setRatingById: (id: string, rating: number) => void;
}

export interface Rating {
  [key: string]: number;
}

const getBook = (item: any) => {
  return {
    id: item?.id,
    title: item.volumeInfo?.title,
    pageCount: item.volumeInfo?.pageCount,
    authors: item.volumeInfo?.authors,
    categories: item.volumeInfo?.categories,
    publisher: item.volumeInfo?.publisher,
    publishedDate: item.volumeInfo?.publishedDate,
    smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail,
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    rating: item.volumeInfo?.averageRating,
    description: item.volumeInfo?.description,
  }
}

export const useStore = create<Store>((set, get) => ({
  books: [],
  wishlist: storage.loadWishlist(),
  curPage: 1,
  pagePerSize: 10,
  totalItems: 0,
  keyword: "",
  loading: false,
  ratings: storage.loadRating(),

  loadBooks: async (keyword, page) => {
    set(({loading: true}));
    const response = await api.loadBooksByPage(keyword, page, get().pagePerSize);
    const items = response?.items ? response.items : [];
    const totalItems = response?.totalItems ? response?.totalItems : 0;
    set({
      keyword: keyword,
      curPage: page,
      books: items.map((item: any) => {
        return getBook(item);
      }),
      totalItems: totalItems,
      loading: false
    });
  },
  loadBooksByKeyword: (keyword) => {
    get().loadBooks(keyword, 1);
  },
  loadBooksByPage: (page) => {
    const keyword = get().keyword;
    get().loadBooks(keyword, page);
  },
  addBookToWishlist: (book) => {
    if(!book) return;
    set({
      wishlist: storage.addBookToWishlist(book)
    });
  },
  removeBookFromWishlist: (id) => {
    set({
      wishlist: storage.removeBookFromWishlist(id)
    })
  },
  loadBookById: async (id) => {
    set(({loading: true}));
    const response = await api.loadBookDetailById(id);
    set(({loading: false}));
    if(response)
      return getBook(response);
    return response;
  },
  loadRatingById: (id: string) => {
    const ratings = get().ratings;
    if(!ratings[id])
      return 0;
    return ratings[id];
  },
  setRatingById: (id: string, rating: number) => {
    set({
      ratings: storage.setRatingById(id, rating) as Rating
    })
  }
}))