import React from 'react';
import Book from './Book';
import './styles/books.css';
const Books = ({ books, totalFound }) => {
  return (
    <div className='books-container'>
      <span> {`Found ${totalFound} results`}</span>
      {!!books.length &&
        books.map((book) => {
          return (
            <div>
              <Book key={book.id} book={book} />
            </div>
          );
        })}
    </div>
  );
};

export default Books;
