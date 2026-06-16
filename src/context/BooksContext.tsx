'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Book } from '@/types';
import { BOOKS as STATIC_BOOKS } from '@/data/books';

interface BooksContextType {
  books:        Book[];
  loading:      boolean;
  addBook:      (book: Omit<Book, 'id'>) => Promise<string>;
  deleteBook:   (id: string) => Promise<void>;
  refreshBooks: () => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const [books,   setBooks]   = useState<Book[]>(STATIC_BOOKS);
  const [loading, setLoading] = useState(false);

  const fetchFirestoreBooks = async (): Promise<Book[]> => {
    try {
      const q    = query(collection(db, 'books'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Book));
    } catch {
      return [];
    }
  };

  const refreshBooks = async () => {
    setLoading(true);
    try {
      const firestoreBooks = await fetchFirestoreBooks();
      // Merge: static books first, then user-added (from Firestore)
      const merged = [
        ...STATIC_BOOKS,
        ...firestoreBooks.filter((fb) => !STATIC_BOOKS.find((sb) => sb.id === fb.id)),
      ];
      setBooks(merged);
    } catch {
      setBooks(STATIC_BOOKS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBook = async (bookData: Omit<Book, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'books'), {
      ...bookData,
      createdAt: serverTimestamp(),
    });
    await refreshBooks();
    return docRef.id;
  };

  const deleteBook = async (id: string) => {
    // Only delete from Firestore if it's a Firestore-stored book
    const isStatic = STATIC_BOOKS.find((b) => b.id === id);
    if (!isStatic) {
      await deleteDoc(doc(db, 'books', id));
    }
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BooksContext.Provider value={{ books, loading, addBook, deleteBook, refreshBooks }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error('useBooks must be used inside BooksProvider');
  return ctx;
}
