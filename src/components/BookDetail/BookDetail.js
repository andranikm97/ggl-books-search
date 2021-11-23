import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorContainer from '../ErrorContainer/ErrorContainer';
import './bookDetails.css';
import parse from 'html-react-parser';
import noImage from '../../noImageFallback.jpeg';

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
          console.log(data.status);
          throw new Error('entry does not exist', 'DNE');
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
        console.log(err.message);
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
        <ErrorContainer
          click={() => setEntryDNE(false)}
          withRedirect={true}
          message={`Entry ID '${id}' does not exist. Click on this box to return to the main page...`}
        />
      ) : (
        <div className='book-detail-container'>
          <div className='image-container'>
            <img
              className='book-cover'
              src={imageLinks ? imageLinks.thumbnail : noImage}
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
