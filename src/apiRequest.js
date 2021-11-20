import dotenv from 'dotenv';
dotenv.config();
const API_URI = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.REACT_APP_API_KEY;

export function buildRequestString(options) {
  const { query, category, order } = options;
  let url = API_URI;
  let queryParams = {
    key: API_KEY,
    q: query.split(' ').join('+'),
    orderBy: order,
    maxResults: 30,
  };

  if (category !== 'all') {
    queryParams.q += `+subject:${category}`;
  }

  queryParams = new URLSearchParams(queryParams);

  return url + '?' + queryParams.toString();
}
