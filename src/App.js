import { toJS } from 'mobx';
import React, { useState } from 'react';
import './styles/App.css';
import { getBooks, loadMoreBooks } from './apiWorker';
import Search from './components/Search';
import Books from './components/Books';
import Loader from './components/Loader';
import { useBooksStore } from './contexts/BooksContext';
import { Observer } from 'mobx-react-lite';
import BookDetail from './components/BookDetail';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  const [request, setRequest] = useState(false);
  const booksStore = useBooksStore();

  const submitSearch = (options) => {
    setRequest(true);
    return getBooks(options, 1)
      .then((data) => {
        console.log(data);
        const { items, totalItems } = data;
        booksStore.addBooks(items);
        booksStore.nextPage();
        booksStore.setTotalFound(totalItems);
        console.log(toJS(booksStore));
      })
      .then(() => setRequest(false));
  };

  const searchForMore = () => {
    return loadMoreBooks(
      toJS(booksStore.currentQuery),
      toJS(booksStore.page),
    ).then((data) => {
      console.log(data);
      const { items } = data;
      booksStore.addBooks(items);
      booksStore.nextPage();

      console.log(toJS(booksStore));
    });
  };

  return (
    <Observer>
      {() => (
        <div className='main-container'>
          <Router>
            <Search submitSearch={submitSearch} page={toJS(booksStore.page)} />
            <Switch>
              <Route path='/details/:id'>
                <BookDetail />
              </Route>
              <Route path='/'>
                <div className='data-container'>
                  {toJS(booksStore.books).length !== 0 ? (
                    <Books
                      books={toJS(booksStore.books)}
                      totalFound={toJS(booksStore.totalFound)}
                      searchForMore={searchForMore}
                    />
                  ) : request ? (
                    <Loader />
                  ) : (
                    'Search for some books!'
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
