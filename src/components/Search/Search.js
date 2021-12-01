import React, { useEffect, useState } from 'react';
import { buildRequestString } from '../../apiRequest';
import { useBooksStore } from '../../contexts/BooksContext';
import { Link, useHistory } from 'react-router-dom';

import { Observer } from 'mobx-react-lite';
import './search.css';

const Search = () => {
  // Set initial form state
  const initialState = {
    query: '',
    category: 'all',
    order: 'newest',
  };

  const [state, setState] = useState(initialState);

  // Reach out to MobX store
  const booksStore = useBooksStore();
  let history = useHistory();

  // Allow submission on 'Enter' key
  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' && checkFocus() === 'search') {
        history.push('/');
        handleSearch();
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [state]);

  // Check if focus is on the input
  const checkFocus = () => {
    return document.activeElement.id;
  };

  // Set state of the form on change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  // Handle submit event
  const handleSearch = () => {
    if (query && category && order) {
      // Attempt to submit
      try {
        booksStore.submitSearch(state);
      } catch {
        // Return to initial state at failure
        setState(initialState);
      } finally {
        // Set current query in MobX store
        booksStore.setCurrentQuery(buildRequestString(state));
      }
    } else {
      alert('Please enter a query!');
    }
  };

  const { query, category, order } = state;
  return (
    <Observer>
      {() => (
        <div className='search-container'>
          <div className='search-field'>
            <input
              id='search'
              name='query'
              className='search-input'
              value={query}
              onChange={handleChange}
              disabled={booksStore.getFormDisabled()}
              type='text'
              placeholder='Enter book name, author, category or etc.'
            />
            <Link to='/'>
              <button
                disabled={state.query.trim() === ''}
                className='search-button'
                onClick={handleSearch}>
                <i className='fa fa-search' />
              </button>
            </Link>
          </div>
          <div className='search-options'>
            <div className='option'>
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

            <div className='option'>
              <h3> Sort by </h3>
              <select name='order' value={order} onChange={handleChange}>
                <option value='newest'>Newest</option>
                <option value='relevance'>Relevance</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default Search;
