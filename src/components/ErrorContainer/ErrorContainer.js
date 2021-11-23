import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorContainer.css';

const ErrorContainer = ({ message, withRedirect, click }) => {
  return (
    <div
      className={
        withRedirect ? 'error-container click' : 'error-container no-click'
      }>
      {withRedirect ? (
        <Link to='/'>
          <div onClick={click}>{message}</div>
        </Link>
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
};

export default ErrorContainer;
