import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import '../styles/bookDetails.css';

const BookDetail = (props) => {
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const googleURI = 'https://www.googleapis.com/books/v1/volumes/';
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    return fetch(googleURI + id)
      .then((data) => data.json())
      .then((info) => {
        console.log(info);
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
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const { title, authors, categories, imageLinks, description, subtitle } =
    bookDetails;
  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className='book-detail-container'>
          <div className='image-container'>
            <img
              className='book-cover'
              src={imageLinks ? imageLinks.thumbnail : 'no image'}
              alt={id}
            />

            <p>
              Category:{' '}
              {categories
                ? Array.isArray(categories)
                  ? categories[0]
                  : categories
                : ''}
            </p>
          </div>
          <div className='info-container'>
            <h1 className='book-title'>{title ? title : ''}</h1>
            <h2 className='book-authors'>By {authors ? authors : ''}</h2>
            <div
              className='book-description'
              dangerouslySetInnerHTML={{
                __html: description ? description : '',
              }}></div>
          </div>
          <Link to='/' className='escape-link'>
            x
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
