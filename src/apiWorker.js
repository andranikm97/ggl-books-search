import { buildRequestString } from './apiRequest';

export const getBooks = (options) => {
  return fetch(buildRequestString(options))
    .then((res) => res.json())
    .catch((err) => console.log(err)); //eslint-disable-line no-console
};
