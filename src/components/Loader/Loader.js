import React from 'react';
import './loader.css';
import loader from './loading.png';

const Loader = () => {
  return (
    <div className='loading-container'>
      <img src={loader} alt='loader' />
    </div>
  );
};

export default Loader;
