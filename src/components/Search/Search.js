import React, { useEffect, useState } from 'react';
import { buildRequestString } from '../../apiRequest';
import { useBooksStore } from '../../contexts/BooksContext';
import { Link } from 'react-router-dom';
import './search.css';

const Search = ({ submitSearch, page }) => {
  const initialState = {
    query: '',
    category: 'all',
    order: 'newest',
  };

  const [state, setState] = useState(initialState);
  const booksStore = useBooksStore();

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' && checkFocus() === 'search') {
        handleSearch();
      }
    };

    document.addEventListener('keydown', listener);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkFocus = () => {
    return document.activeElement.id;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    if (query && category && order) {
      try {
        submitSearch(state, state.queryExists);
      } catch {
        setState(initialState);
      } finally {
        booksStore.setCurrentQuery(buildRequestString(state));
      }
    } else {
      alert('Please enter a query!');
    }
  };

  const { query, category, order } = state;

  return (
    <div className='search-container'>
      <div className='search-field'>
        <input
          id='search'
          name='query'
          className='search-input'
          value={query}
          onChange={handleChange}
          type='text'
          placeholder='Enter book name, author, category or etc.'
        />
        <Link to='/'>
          <button
            disabled={state.query.trim() === ''}
            className='search-button'
            onClick={handleSearch}>
            Search
          </button>
        </Link>
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
          <select name='order' value={order} onChange={handleChange}>
            <option value='newest'>Newest</option>
            <option value='relevance'>Relevance</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
