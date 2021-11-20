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
    nextPage: function () {
      this.page++;
    },
    clearPage: function () {
      this.page = 1;
    },
    clearBooks: function () {
      this.books = [];
    },
    addBooks: function (newBooks) {
      newBooks.forEach((element) => {
        element._id = nanoid();
      });

      if (this.page > 1) {
        this.books.push(...newBooks);
      } else {
        this.books = newBooks;
      }
    },
    setTotalFound: function (n) {
      this.totalFound = n;
    },
    getBooks: function () {
      return this.books;
    },
  };
}
