import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './book.css';

const Book = ({ book }) => {
  let { title, authors, categories, imageLinks: images } = book.volumeInfo;

  return (
    <Link to={`/details/${book.id}`} className='book'>
      <div className='book-container'>
        <div className='image-container'>
          <img src={images ? images.thumbnail : ''} alt='' />
        </div>
        <div className='info-container'>
          <h3 className='book-category'>
            {categories
              ? Array.isArray(categories)
                ? categories[0]
                : categories
              : ''}
          </h3>
          <h2 className='book-title'>{title ? title : ''}</h2>
          {authors ? <div className='book-author'> By {authors}</div> : ''}
        </div>
      </div>
    </Link>
  );
};

export default Book;
