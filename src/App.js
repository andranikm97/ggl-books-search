import { toJS } from 'mobx';
import React, { useState } from 'react';
import './styles/App.css';
import { getBooks } from './apiWorker';
import Search from './components/Search';
import Books from './components/Books';
import Loader from './components/Loader';
import { useBooksStore } from './stores/BooksContext';
import { useObserver } from 'mobx-react-lite';

function App() {
  // const [loading, setFalse] = useState(false);
  const [request, setRequest] = useState(false);
  // const [books, setBooks] = useState({
  //   results: [],
  //   totalFound: 0,
  //   page: 1,
  // });

  const booksStore = useBooksStore();
  // const [total, setTotal] = useState(0);

  const submitSearch = (options) => {
    setRequest(true);
    return getBooks(options)
      .then((data) => {
        console.log(data);
        // setBooks({
        //   results: data.items,
        //   totalFound: data.totalItems,
        //   page: books.page++,
        // });
        const { items, totalItems } = data;
        console.log(data);
        booksStore.addBooks(items);
        booksStore.setTotalFound(totalItems);
        console.log(toJS(booksStore));
      })
      .then(() => setRequest(false));
  };

  return useObserver(() => (
    <div className='main-container'>
      <Search submitSearch={submitSearch} page={toJS(booksStore.page)} />
      <div className='data-container'>
        {toJS(booksStore.books).length !== 0 ? (
          <Books
            books={toJS(booksStore.books)}
            totalFound={toJS(booksStore.totalFound)}
          />
        ) : request ? (
          <Loader />
        ) : (
          'Search for some books!'
        )}
      </div>
    </div>
  ));
}

export default App;
