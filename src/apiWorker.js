import { buildRequestString } from './apiRequest';

export const getBooks = (options, page) => {
  return fetch(buildRequestString(options, page))
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const loadMoreBooks = (query, page) => {
  return fetch(query + `&startIndex=${(page - 1) * 30}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
