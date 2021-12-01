import React from 'react';
import Book from '../Book/Book';

import './books.css';

// Renders a list of books
const Books = ({ books, totalFound, searchForMore }) => {
  return (
    <div className='results-container'>
      <div className='results-count'>
        {' '}
        <span>{`Found ${totalFound} results`}</span>
      </div>
      <div className='books-container'>
        {!!books.length &&
          books.map((book) => {
            return <Book key={book._id} book={book} />;
          })}
        <div className='load-more-btn'>
          <button onClick={searchForMore}> Load more </button>
        </div>
      </div>
    </div>
  );
};

export default Books;
