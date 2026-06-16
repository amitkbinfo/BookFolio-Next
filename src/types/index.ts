// src/types/index.ts

export interface Book {
  id:          string;
  title:       string;
  author:      string;
  genre:       string;
  description: string;
  fullDescription: string;
  price:       number;
  rating:      number;
  coverImage:  string;
  pages:       number;
  language:    string;
  publisher:   string;
  publishYear: number;
  isbn:        string;
  inStock:     boolean;
  tags:        string[];
  addedBy?:    string;
  createdAt?:  string | { seconds: number; nanoseconds: number };
}

export interface User {
  uid:         string;
  email:       string | null;
  displayName: string | null;
  photoURL:    string | null;
}

export type Genre =
  | 'All'
  | 'Fiction'
  | 'Non-Fiction'
  | 'Science Fiction'
  | 'Fantasy'
  | 'Mystery'
  | 'Romance'
  | 'Biography'
  | 'History'
  | 'Self-Help'
  | 'Children'
  | 'Horror'
  | 'Thriller';

export interface FilterState {
  search:  string;
  genre:   Genre;
  rating:  number;
  maxPrice: number;
  sortBy:  'title' | 'price-asc' | 'price-desc' | 'rating' | 'year';
}
