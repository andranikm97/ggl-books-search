import React from 'react';
import Book from './Book';
import '../styles/books.css';
import { Observer } from 'mobx-react-lite';

const Books = ({ books, totalFound, searchForMore }) => {
  return (
    <Observer>
      {() => (
        <div className='books-container'>
          <span> {`Found ${totalFound} results`}</span>
          {!!books.length &&
            books.map((book) => {
              return <Book key={book._id} book={book} />;
            })}
          <button className='load-more-btn' onClick={searchForMore}>
            {' '}
            Load more{' '}
          </button>
        </div>
      )}
    </Observer>
  );
};

export default Books;
