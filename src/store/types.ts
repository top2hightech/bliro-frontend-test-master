export interface Book {
  id: string;
  title: string;
  pageCount: number;
  authors: string[];
  categories: string[];
  publisher: string;
  publishedDate: string;
  smallThumbnail: string;
  rating: number;
}

export interface DetailBook extends Book {
  description: string;
  thumbnail: string;
}