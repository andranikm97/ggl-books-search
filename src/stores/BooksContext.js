import React, { createContext, useContext } from 'react';
import { useLocalObservable, useLocalStore } from 'mobx-react-lite';
import { createBooksStore } from './booksStore';

const BooksContext = createContext(null);

export const BooksProvider = ({ children }) => {
  const booksStore = useLocalObservable(createBooksStore);
  return (
    <BooksContext.Provider value={booksStore}>{children}</BooksContext.Provider>
  );
};

export const useBooksStore = () => useContext(BooksContext);
