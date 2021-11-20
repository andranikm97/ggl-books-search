import React from 'react';
import '../styles/book.css';
const Book = ({ book }) => {
  let { title, authors, categories, imageLinks: images } = book.volumeInfo;
  return (
    <div className='book-container'>
      <img className='book-cover' src={images.thumbnail} alt='' />
      <h3 className='book-category'>{categories}</h3>
      <h2 className='book-title'>{title}</h2>
      <h2 className='book-author'>{authors}</h2>
    </div>
  );
};

export default Book;
