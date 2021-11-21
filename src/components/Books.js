import React from 'react';
import Book from './Book';
import '../styles/books.css';

const Books = ({ books, totalFound, searchForMore }) => {
  return (
    <div className='books-container'>
      <span> {`Found ${totalFound} results`}</span>
      {!!books.length &&
        books.map((book) => {
          return <Book key={book._id} book={book} />;
        })}
      <div className='load-more-btn'>
        <button onClick={searchForMore}> Load more </button>
      </div>
    </div>
  );
};

export default Books;
