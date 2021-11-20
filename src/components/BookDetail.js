import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = (props) => {
  const [bookDetails, setBookDetails] = useState({});
  const googleURI = 'https://www.googleapis.com/books/v1/volumes/';
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    return fetch(googleURI + id)
      .then((data) => data.json())
      .then((info) => {
        console.log(info);
        // setBookDetails((previousState) => {});
      });
  }, []);

  return <div>hello!</div>;
};

export default BookDetail;
