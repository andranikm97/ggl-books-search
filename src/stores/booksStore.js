import { nanoid } from 'nanoid';
import { getBooks, loadMoreBooks } from '../apiWorker';
import { toJS } from 'mobx';

export function createBooksStore() {
  return {
    books: [],
    totalFound: 0,
    page: 1,
    currentQuery: '',
    waitingOnRequest: false,
    getBooks: function () {
      return this.books;
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
    clearBooks: function () {
      this.books = [];
    },
    setTotalFound: function (n) {
      this.totalFound = n;
    },
    nextPage: function () {
      this.page++;
    },
    clearPage: function () {
      this.page = 1;
    },
    setCurrentQuery: function (string) {
      this.currentQuery = string;
    },
    submitSearch: function (options) {
      this.requestOnOff(true);
      this.clearPage();
      return getBooks(options, 1)
        .then((data) => {
          console.log(data);
          const { items, totalItems } = data;
          this.addBooks(items);
          this.nextPage();
          this.setTotalFound(totalItems);
          console.log(toJS(this));
        })
        .then(() => this.requestOnOff(false));
    },
    searchForMore: function () {
      return loadMoreBooks(toJS(this.currentQuery), toJS(this.page)).then(
        (data) => {
          console.log(data);
          const { items } = data;
          this.addBooks(items);
          this.nextPage();

          console.log(toJS(this));
        },
      );
    },
    requestOnOff: function (input) {
      this.waitingOnRequest = input;
    },
  };
}
