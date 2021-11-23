import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import Book from "../components/Book/Book";
import { StaticRouter } from "react-router-dom";

test("Displays no image thumbnail with no book info", async () => {
  const book = render(
    <StaticRouter>
      <Book />
    </StaticRouter>
  );

  const bookThumbnail = await book.findByTestId("thumbnail");
  expect(bookThumbnail.src).toContain("noImageFallback.jpeg");
});

test("Displays a non-default, correct thumbnail", async () => {
  const book = render(
    <StaticRouter>
      <Book
        book={{
          images: {
            small: "small.jpg",
            medium: "medium.jpg",
            large: "large.jpg",
          },
        }}
      />
    </StaticRouter>
  );

  const bookThumbnail = await book.findByTestId("thumbnail");
  expect(bookThumbnail.src).toContain("noImageFallback.jpeg");
});
