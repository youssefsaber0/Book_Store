import * as React from 'react';
import Stack from '@mui/material/Stack';
import BookCart from './BookCart';
import CostCard from './CheckoutCard';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';

export default function ShopView() {

  const [books, setBooks] = React.useState<any[]>([]);

  const totalCost = books.reduce((acc, book) => acc + book.price * book.quantity, 0);

  const fetchBooks = () => {
    HelloReactEndpoint.getCartItems()
      .then((response) => {
        setBooks(JSON.parse(response as string));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Stack maxWidth="xl" spacing={2} alignItems="flex-start" direction={{ xs: 'column', md: 'row' }}>
      {books.map((book) => (
        <BookCart
          key={book.isbn}
          title={book.title}
          price={book.price}
          quantity={book.quantity}
          sx={{ flex: 2 }}
        />
      ))}
      <CostCard total={totalCost} sx={{ flex: 1 }} />
    </Stack>
  );
}
