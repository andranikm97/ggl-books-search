import React from 'react';
import './loader.css';
import loader from './loading.png';

// A spinning loader that appears between loads
const Loader = () => {
  return (
    <div className='loading-container'>
      <img src={loader} alt='loader' />
    </div>
  );
};

export default Loader;
