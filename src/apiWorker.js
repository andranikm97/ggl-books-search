import { buildRequestString } from './apiRequest';

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
