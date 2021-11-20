import React, { useState } from 'react';
import './styles/App.css';
import Search from './Search';
import Books from './Books';
import Loader from './Loader';
import { getBooks } from './apiWorker';

function App() {
  // const [loading, setFalse] = useState(false);
  const [request, setRequest] = useState(false);
  const [books, setBooks] = useState({
    results: [],
    totalFound: 0,
  });
  // const [total, setTotal] = useState(0);

  const submitSearch = (options) => {
    setRequest(true);
    return getBooks(options)
      .then((data) => {
        console.log(data);
        // const { items } = data;
        // const { total } = data.totalItems;
        // setTotal();
        setBooks({ results: data.items, totalFound: data.totalItems });
      })
      .then(() => setRequest(false));
  };

  return (
    <div className='main-container'>
      <Search submitSearch={submitSearch} />
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
