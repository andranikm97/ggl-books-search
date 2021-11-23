import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './bookDetails.css';
import parse from 'html-react-parser';

const BookDetail = () => {
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [entryDNE, setEntryDNE] = useState(false);

  const googleURI = 'https://www.googleapis.com/books/v1/volumes/';
  const { id } = useParams();
  useEffect(() => {
    return fetch(googleURI + id)
      .then((data) => {
        if (data.status > 400) {
          let dataDNE = new Error('entry does not exist', 'DNE');
          throw dataDNE;
        } else {
          return data.json();
        }
      })
      .then((info) => {
        const {
          title,
          authors,
          categories,
          imageLinks,
          description,
          subtitle,
        } = info.volumeInfo;

        setBookDetails({
          title,
          authors,
          categories,
          imageLinks,
          description,
          subtitle,
        });
      })
      .catch((err) => {
        if (err.message === 'entry does not exist') {
          setEntryDNE(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { title, authors, categories, imageLinks, description } = bookDetails;
  return (
    <div
      style={{ height: 100 + '%', display: 'flex', justifyContent: 'center' }}>
      {isLoading ? (
        <div className='loader-container'>
          <Loader />
        </div>
      ) : entryDNE ? (
        <div className='error-container'>
          <Link to='/' className='escape-link'>
            <div
              onClick={() => {
                setEntryDNE(false);
              }}>
              Click on this box to return to main page
            </div>
          </Link>
        </div>
      ) : (
        <div className='book-detail-container'>
          <div className='image-container'>
            <img
              className='book-cover'
              src={imageLinks ? imageLinks.thumbnail : 'no image'}
              alt={id}
            />

            {categories ? <p>Categories: {categories.join(' , ')}</p> : ''}
          </div>
          <div className='info-container'>
            {title ? <h1 className='book-title'>{title}</h1> : ''}
            {authors ? <h2 className='book-authors'>By {authors} </h2> : ''}
            {description ? (
              <div className='book-description'>{parse(description)}</div>
            ) : (
              ''
            )}
          </div>
          <Link to='/' className='escape-link'>
            <i className='far fa-times-circle'></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
