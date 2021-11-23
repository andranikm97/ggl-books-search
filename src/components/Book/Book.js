import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./book.css";
import noImage from "../../noImageFallback.jpeg";

const Book = ({ book }) => {
  const [contentReceived, setContentReceived] = useState(true);
  const [details, setDetails] = useState({
    title: "",
    id: "",
    authors: [],
    categories: [],
    images: {},
  });

  useEffect(() => {
    try {
      if (!book || !book.volumeInfo) {
        // throw new Error("book contents not received");
        setDetails({
          id: "",
          title: "",
          authors: [],
          categories: [],
          images: {
            thumbnail: "noImageFallback.jpeg",
          },
        });
      } else {
        let {
          id,
          title,
          authors,
          categories,
          imageLinks: images,
        } = book.volumeInfo;
        setDetails({ id, title, authors, categories, images });
      }
    } catch (e) {
      if (e.message === "book contents not received") {
        setContentReceived(false);
      }
    }
  }, []);

  const { id, title, authors, categories, images } = details;

  return (
    <Link to={`/details/${id}`} className="book">
      <div className="book-container">
        <div className="image-container">
          <img
            data-testid="thumbnail"
            src={images ? images.thumbnail : noImage}
            alt={title}
          />
        </div>
        <div className="info-container">
          <h3 className="book-category">
            {categories
              ? Array.isArray(categories)
                ? categories[0]
                : categories
              : ""}
          </h3>
          <h2 className="book-title">{title ? title : ""}</h2>
          {authors ? <div className="book-author"> By {authors}</div> : ""}
        </div>
      </div>
    </Link>
  );
};

export default Book;
