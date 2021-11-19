import React, { useState } from 'react';
import './styles/search.css';

const Search = () => {
  const initialState = {
    query: '',
    category: '',
    sort: '',
  };

  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const { query, category, sort } = state;

  return (
    <div className='search-container'>
      <div className='search-field'>
        <input
          name='query'
          className='search-input'
          value={query}
          onChange={handleChange}
          type='text'
          placeholder='Enter book name, author, category or etc.'
        />
        <button className='search-button'> Search </button>
      </div>
      <div className='search-options'>
        <div>
          <h3> Category </h3>
          <select name='category' value={category} onChange={handleChange}>
            <option value='all'>All categories</option>
            <option value='art'>Art</option>
            <option value='biography'>Biography</option>
            <option value='computers'>Computers</option>
            <option value='history'>History</option>
            <option value='medical'>Medical</option>
            <option value='poetry'>Poetry</option>
          </select>
        </div>

        <div>
          <h3> Sort by </h3>
          <select name='sort' value={sort} onChange={handleChange}>
            <option value='newest'>Newest</option>
            <option value='relevance'>Relevance</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
