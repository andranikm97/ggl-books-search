import { toJS } from 'mobx';
import React, { useState } from 'react';
import './styles/App.css';
import { getBooks, loadMoreBooks } from './apiWorker';
import Search from './components/Search/Search';
import Books from './components/Books/Books';
import Loader from './components/Loader/Loader';
import BookDetail from './components/BookDetail/BookDetail';
import { useBooksStore } from './contexts/BooksContext';
import { Observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  const booksStore = useBooksStore();

  return (
    <Observer>
      {() => (
        <div className='main-container'>
          <Router>
            <Search
              submitSearch={booksStore.submitSearch}
              page={toJS(booksStore.page)}
            />
            <Switch>
              <Route path='/details/:id'>
                <BookDetail />
              </Route>
              <Route path='/'>
                <div className='data-container'>
                  {booksStore.waitingOnRequest ? (
                    <Loader />
                  ) : toJS(booksStore.books).length !== 0 ? (
                    <Books
                      books={toJS(booksStore.books)}
                      totalFound={toJS(booksStore.totalFound)}
                      searchForMore={booksStore.searchForMore}
                    />
                  ) : (
                    <p>Search for books...</p>
                  )}
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </Observer>
  );
}

export default App;
