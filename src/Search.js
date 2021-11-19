import React, { useState } from 'react';

const Search = () => {
  const [state, setState] = useState({
    query: '',
    category: '',
    sort: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  return (
    <div className='search-container'>
      <div>
        <input
          value={state.query}
          onChange={handleChange}
          type='text'
          placeholder='Enter book name, author, category or etc.'
        />
      </div>
    </div>
  );
};

export default Search;
