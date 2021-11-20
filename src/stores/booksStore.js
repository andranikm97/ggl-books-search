import { nanoid } from 'nanoid';
export function createBooksStore() {
  return {
    books: [],
    totalFound: 0,
    page: 1,
    currentQuery: '',
    setCurrentQuery: function (string) {
      this.currentQuery = string;
    },
    addBooks: function (newBooks) {
      newBooks.forEach((element) => {
        element._id = nanoid();
      });

      this.books = newBooks;
    },
    setTotalFound: function (n) {
      this.totalFound = n;
    },
    getBooks: function () {
      return this.books;
    },
  };
}
