import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Search from './Search';
import { getBooks } from './apiWorker';

function App() {
  const [loading, setFalse] = useState(false);
  const [request, setRequest] = useState(false);
  const [books, setBooks] = useState([]);

  const submitSearch = (options) => {
    return getBooks(options).then((data) => console.log(data));
  };

  return (
    <div className='main-container'>
      <Search submitSearch={submitSearch} />
      {request ? <h1> Search for some books! </h1> : 'books...'}
    </div>
  );
}

export default App;
