import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/book.css';
const Book = ({ book }) => {
  let { title, authors, categories, imageLinks: images } = book.volumeInfo;
  // const [imageURL, setImageURL] = useState('');
  // useEffect(() => {
  //   return fetch(
  //     'https://www.googleapis.com/books/v1/volumes/' + book.id.trim(),
  //   )
  //     .then((data) => data.json())
  //     .then((data) => {
  //       try {
  //         const bookImages = data.volumeInfo.imageLinks;
  //         setImageURL(images.thumbnail);
  //       } catch (e) {
  //         console.log(e);
  //         setImageURL(images.thumbnail);
  //       }
  //     });
  // }, [book.id]);

  return (
    <Link to={`/details/${book.id}`} className='book'>
      <div className='book-container'>
        <div className='image-container'>
          <img
            className='book-cover'
            src={images ? images.thumbnail : ''}
            alt=''
          />
        </div>
        <div className='info-container'>
          <h3 className='book-category'>{categories}</h3>
          <h2 className='book-title'>{title}</h2>
          <h2 className='book-author'>{authors}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Book;
