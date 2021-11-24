import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../ErrorContainer/ErrorContainer.css';

const NotFound = () => {
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 5000);
    return clearTimeout();
  }, []);

  return (
    <div
      className='error-container click'
      onClick={() => {
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
