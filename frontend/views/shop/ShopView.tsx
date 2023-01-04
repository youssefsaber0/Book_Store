import * as React from 'react';
import Stack from '@mui/material/Stack';
import BookCard from './BookCard';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';

interface BooksResponse {
  isbn: string;
  title: string;
  authors: string;
  publication_year: string;
  price: number;
  stock: number;
}

export default function ShopView() {

  const [books, setBooks] = React.useState<BooksResponse[]>([]);

  React.useEffect(() => {
    HelloReactEndpoint.getUserInfo().then((response) => {
      console.log(response);
    });
    HelloReactEndpoint.getAllBooks(1).then((response) => {
      console.log(JSON.parse(response));
      setBooks(JSON.parse(response));
    });
  }, []);

  return (
    <Stack maxWidth="xl" spacing={2} alignItems="center">
      {books.map((book) => (
        <BookCard
          key={book.isbn}
          title={book.title}
          authors={book.authors.split(',')}
          publisher={book.publication_year}
          isbn={book.isbn}
          price={book.price}
          stock={book.stock}
        />
      ))}
    </Stack>
  );
}
