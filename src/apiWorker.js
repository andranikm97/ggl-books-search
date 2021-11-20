import dotenv from 'dotenv';
dotenv.config();

const API_URI = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.REACT_APP_API_KEY;

export const getBooks = (options) => {
  const { query, category, sort } = options;
  let url = API_URI;
  let queryParams = {
    key: API_KEY,
    q: query.split(' ').join('+'),
    sortBy: sort.trim() === '' ? 'newest' : sort,
    maxResults: 30,
  };

  if (category !== 'all') {
    queryParams.q += `+subject:${category}`;
  }

  queryParams = new URLSearchParams(queryParams);
  return fetch(url + '?' + queryParams.toString())
    .then((res) => res.json())
    .catch((err) => console.log(err)); //eslint-disable-line no-console
};
