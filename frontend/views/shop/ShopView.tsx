import * as React from 'react';
import Stack from '@mui/material/Stack';
import BookCard from './BookCard';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';

interface BooksResponse {
  isbn: string;
  title: string;
  author: string;
  publication_year: string;
  price: number;
  stock: number;
}

export default function ShopView() {

  const [books, setBooks] = React.useState<BooksResponse[]>([]);

  const handleClick = () => {
    HelloReactEndpoint.searchBook(0).then((response) => {
      console.log(JSON.parse(response));
      setBooks(JSON.parse(response));
    });
  };

  return (
    <Stack maxWidth="xl" spacing={2} alignItems="center">
      <button type="button" onClick={handleClick}>Test DB</button>
      {books.map((book) => (
        <BookCard
          key={book.isbn}
          title={book.title}
          authors={book.author.split(',')}
          publisher={book.publication_year}
          isbn={book.isbn}
          price={book.price}
          stock={book.stock}
        />
      ))}
    </Stack>
  );
}
