import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Search from './Search';

function App() {
  const [loading, setFalse] = useState(false);
  const [request, setRequest] = useState(false);
  const [books, setBooks] = useState([]);

  return (
    <div className='main-container'>
      <Search />
      {request ? <h1> Search for some books! </h1> : 'books...'}
    </div>
  );
}

export default App;
