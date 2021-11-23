import React from "react";
import { toJS } from "mobx";
import "./styles/App.css";
import Search from "./components/Search/Search";
import Books from "./components/Books/Books";
import Loader from "./components/Loader/Loader";
import BookDetail from "./components/BookDetail/BookDetail";
import ErrorContainer from "./components/ErrorContainer/ErrorContainer";
import { useBooksStore } from "./contexts/BooksContext";
import { Observer } from "mobx-react-lite";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const booksStore = useBooksStore();

  return (
    <Observer>
      {() => (
        <div className="main-container">
          <Router>
            <Search
            // submitSearch={booksStore.submitSearch}
            // page={toJS(booksStore.page)}
            />
            <Switch>
              <Route path="/details/:id">
                <div className="data-container">
                  <BookDetail />
                </div>
              </Route>
              <Route path="/">
                <div className="data-container">
                  {booksStore.waitingOnRequest ? (
                    <Loader />
                  ) : toJS(booksStore.books).length !== 0 ? (
                    <Books
                      books={toJS(booksStore.books)}
                      totalFound={toJS(booksStore.totalFound)}
                      searchForMore={booksStore.searchForMore}
                    />
                  ) : booksStore.invalidSearch ? (
                    <ErrorContainer
                      withRedirect={false}
                      message={`Invalid search, please enter a valid query...`}
                    />
                  ) : (
                    <p className="no-books-message ">
                      Enter a query and hit <i className="fa fa-search" /> or
                      'Enter'
                    </p>
                  )}
                </div>
              </Route>
            </Switch>
          </Router>
          <footer className="footer"></footer>
        </div>
      )}
    </Observer>
  );
};

export default App;
