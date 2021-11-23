import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../ErrorContainer/ErrorContainer.css';

const NotFound = () => {
  let history = useHistory();

  let [count, setCount] = useState(10);
  useEffect(() => {
    setInterval(() => {
      setCount(count - 1);
    }, 1000);
    setTimeout(() => {
      history.push('/');
    }, 10000);
  });

  return (
    <div
      className='error-container click'
      onClick={() => {
        clearInterval();
        clearTimeout();
      }}>
      <Link to='/'>
        <div>
          404...The page you requested does not exist. Click on this box or wait{' '}
          {count} seconds to go back home.
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
