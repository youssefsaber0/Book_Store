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

  const handleItemRemove = (isbn: string) => {
    books.splice(books.findIndex((book) => book.isbn === isbn), 1);
    setBooks([...books]);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Stack maxWidth="xl" spacing={2} alignItems="flex-start" direction={{ xs: 'column', md: 'row' }}>
      <Stack direction="column" spacing={2} sx={{ flex: 2 }}>
        {books.map((book) => (
          <BookCart
            key={book.isbn}
            isbn={book.isbn}
            title={book.title}
            price={book.price}
            quantity={book.quantity}
            onRemove={handleItemRemove}
          />
        ))}
      </Stack>
      <CostCard total={totalCost} sx={{ flex: 1 }} />
    </Stack>
  );
}
