import { buildRequestString } from './apiRequest';

export const getBookDetails = (id) => {
  return fetch('https://www.googleapis.com/books/v1/volumes/' + id).then(
    (data) => {
      // Catch any unexisting entries
      if (data.status > 400) {
        throw new Error('entry does not exist', 'DNE');
      } else {
        return data.json();
      }
    },
  );
};

// Use fetch to get books if books are currently empty
export const getBooks = (options, page) => {
  return fetch(buildRequestString(options, page))
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// If books are not empty, load more books
export const loadMoreBooks = (query, page) => {
  return fetch(query + `&startIndex=${(page - 1) * 30}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
