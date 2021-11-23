import { attributesToProps } from 'html-react-parser';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ErrorBoundary = (props) => {
  const [hasError, setHasError] = useState(false);

  const getDerivedStateFromError = () => {
    return setHasError(true);
  };

  return (
    <div>
      {hasError ? (
        <h1>
          {' '}
          This listing has an error.{' '}
          <Link to='/'>Click here to go back to the home page.</Link>
        </h1>
      ) : (
        props.children
      )}
    </div>
  );
};

export default ErrorBoundary;
