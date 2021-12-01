import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useBooksStore } from '../../contexts/BooksContext';

import '../ErrorContainer/ErrorContainer.css';

// Component that renders on 404
const NotFound = () => {
  // Navigation
  let history = useHistory();

  // Access MobX store
  let booksStore = useBooksStore();

  // On mount, disable form and set a timer for 5 seconds
  useEffect(() => {
    booksStore.toggleFormDisabled();
    setTimeout(() => {
      booksStore.clearFormDisabled();
      history.push('/');
    }, 5000);
    return clearTimeout();
  }, []);

  return (
    <div
      className='error-container click'
      onClick={() => {
        booksStore.clearFormDisabled();
        clearInterval();
        clearTimeout();
      }}>
      <Link to='/'>
        <div>
          404...The page you requested does not exist. Click on this box or wait
          5 seconds to go back home.
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
