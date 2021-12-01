import { useEffect } from 'react';

import Loader from '../Loader/Loader';
import ErrorContainer from '../ErrorContainer/ErrorContainer';
import { useBooksStore } from '../../contexts/BooksContext';

import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Observer } from 'mobx-react-lite';

import noImage from '../../noImageFallback.jpeg';
import './bookDetails.css';

// A detailed component, revealing the details of a certain book requested by the user
const BookDetail = () => {
  const booksStore = useBooksStore();

  // Get id from navigated route
  const { id } = useParams();

  useEffect(() => {
    return booksStore.receiveDetails(id);
  }, []);

  const { title, authors, categories, imageLinks, description } =
    booksStore.getBook();

  return (
    <Observer>
      {() => (
        <div
          style={{
            height: 100 + '%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          {booksStore.waitingOnRequest ? (
            <div className='loader-container'>
              <Loader />
            </div>
          ) : booksStore.entryDNE ? (
            <ErrorContainer
              click={() => {
                booksStore.entryDNEOnOff(false);
              }}
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
      )}
    </Observer>
  );
};

export default BookDetail;
