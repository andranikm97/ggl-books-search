import React from 'react';
import Book from './Book';
import '../styles/books.css';
import { useObserver } from 'mobx-react-lite';

const Books = ({ books, totalFound }) => {
  return useObserver(() => (
    <div className='books-container'>
      <span> {`Found ${totalFound} results`}</span>
      {!!books.length &&
        books.map((book) => {
          return <Book key={book._id} book={book} />;
        })}
      <button className='load-more-btn'> Load more </button>
    </div>
  ));
};

export default Books;
