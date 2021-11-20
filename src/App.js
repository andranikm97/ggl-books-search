import React, { useState } from 'react';
import './styles/App.css';
import Search from './components/Search';
import Books from './components/Books';
import Loader from './components/Loader';
import { getBooks } from './apiWorker';

function App() {
  // const [loading, setFalse] = useState(false);
  const [request, setRequest] = useState(false);
  const [books, setBooks] = useState({
    results: [],
    totalFound: 0,
    page: 1,
  });
  // const [total, setTotal] = useState(0);

  const submitSearch = (options) => {
    setRequest(true);
    return getBooks(options)
      .then((data) => {
        console.log(data);
        setBooks({
          results: data.items,
          totalFound: data.totalItems,
          page: books.page++,
        });
      })
      .then(() => setRequest(false));
  };

  return (
    <div className='main-container'>
      <Search submitSearch={submitSearch} page={books.page} />
      <div className='data-container'>
        {books.results.length !== 0 ? (
          <Books books={books.results} totalFound={books.totalFound} />
        ) : request ? (
          <Loader />
        ) : (
          'Search for some books!'
        )}
      </div>
      {/* {request ? <h1> Searching for some books! </h1> : 'not searching'} */}
    </div>
  );
}

export default App;
