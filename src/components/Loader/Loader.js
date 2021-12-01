import React from 'react';

import loader from './loading.png';
import './loader.css';

// A spinning loader that appears between loads
const Loader = () => {
  return (
    <div className='loading-container'>
      <img src={loader} alt='loader' />
    </div>
  );
};

export default Loader;
