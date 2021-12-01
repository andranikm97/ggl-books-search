import { nanoid } from 'nanoid';
import { getBooks, getBookDetails, loadMoreBooks } from '../apiWorker';
import { toJS } from 'mobx';

// Books store MobX
export function createBooksStore() {
  return {
    books: [],
    bookDetail: {},
    totalFound: 0,
    page: 1,
    currentQuery: '',
    waitingOnRequest: false,
    invalidSearch: false,
    formDisabled: false,
    entryDNE: false,
    toggleFormDisabled: function () {
      this.formDisabled = !this.formDisabled;
    },
    clearFormDisabled: function () {
      this.formDisabled = false;
    },
    getFormDisabled: function () {
      return this.formDisabled;
    },
    getBooks: function () {
      return this.books;
    },
    getBook: function () {
      return this.bookDetail;
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
    receiveDetails: function (id) {
      console.log('I got called');
      this.requestOnOff(true);
      return getBookDetails(id)
        .then((data) => {
          console.log(data);
          const {
            title,
            authors,
            categories,
            imageLinks,
            description,
            subtitle,
          } = data.volumeInfo;

          this.bookDetail = {
            title,
            authors,
            categories,
            imageLinks,
            description,
            subtitle,
          };
        })
        .catch((err) => {
          if (err.message === 'entry does not exist') {
            this.entryDNEOnOff(true);
          }
        })
        .then(() => this.requestOnOff(false));
    },
    submitSearch: function (options) {
      this.requestOnOff(true);
      this.clearPage();
      return getBooks(options, 1)
        .then((data) => {
          const { items, totalItems } = data;

          if (totalItems === 0) {
            throw new Error('No matches found.');
          }

          this.addBooks(items);
          this.nextPage();
          this.setTotalFound(totalItems);
        })
        .catch((error) => {
          this.books = [];
          this.invalidSearch = true;
          setTimeout(() => {
            this.invalidSearch = false;
          }, 3000);
          console.log(error);
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
        },
      );
    },
    requestOnOff: function (input) {
      this.waitingOnRequest = input;
    },
    entryDNEOnOff: function (input) {
      this.entryDNE = input;
    },
  };
}
