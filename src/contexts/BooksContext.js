import React, { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { createBooksStore } from '../stores/booksStore';

const BooksContext = createContext(null);

export const BooksProvider = ({ children }) => {
  const booksStore = useLocalObservable(createBooksStore);
  return (
    <BooksContext.Provider value={booksStore}>{children}</BooksContext.Provider>
  );
};

export const useBooksStore = () => useContext(BooksContext);
