import React from 'react';
import Book from './Book';
import '../styles/books.css';
const Books = ({ books, totalFound }) => {
  return (
    <div
      className='books-container'
      onScroll={(e) => {
        console.log(e.target.scrollTop);
        console.log(e.target.offsetHeight);
        console.log(e.target.clientHeight);
      }}>
      <span> {`Found ${totalFound} results`}</span>
      {!!books.length &&
        books.map((book) => {
          return <Book key={book.id} book={book} />;
        })}
      <button className='load-more-btn'> Load more </button>
    </div>
  );
};

export default Books;
