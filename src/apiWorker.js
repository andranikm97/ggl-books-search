import dotenv from 'dotenv';
dotenv.config();

const API_URI = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.REACT_APP_API_KEY;

export const getBooks = (options) => {
  const { query, category, order } = options;
  let url = API_URI;
  let queryParams = {
    key: API_KEY,
    q: query.split(' ').join('+'),
    orderBy: order.trim() === '' ? 'newest' : order,
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
