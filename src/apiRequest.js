import dotenv from 'dotenv';
dotenv.config();

// Set API key and URI
const API_URI = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.REACT_APP_API_KEY;

// Build a query string based on options and the current page (pagination)
export function buildRequestString(options, page) {
  const { query, category, order } = options;
  let url = API_URI;
  let queryParams = {
    key: API_KEY,
    q: query.split(' ').join('+'),
    orderBy: order,
    maxResults: 30,
    startWith: (page - 1) * 30,
  };

  if (category !== 'all') {
    queryParams.q += `+subject:${category}`;
  }

  queryParams = new URLSearchParams(queryParams);

  return url + '?' + queryParams.toString();
}
