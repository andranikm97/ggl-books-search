import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './Search';

function App() {
  const [loading, setFalse] = useState(false);
  const [books, setBooks] = useState([]);

  return <Search />;
}

export default App;
