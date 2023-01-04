import * as React from 'react';
import Stack from '@mui/material/Stack';
import BookCard from './BookCard';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';

export default function ShopView() {

  const handleClick = () => {
    HelloReactEndpoint.testDBQuery().then((response) => {
      console.log(JSON.parse(response).map((row: string) => JSON.parse(row)));
    });
  };

  return (
    <Stack maxWidth="xl" spacing={2} alignItems="center">
      <button type="button" onClick={handleClick}>Test DB</button>
      <BookCard
        title="The Complete Guide To Blender Graphics: Computer Modeling And Animation"
        authors={['John M. Blain']}
        publisher="Packt Publishing"
        isbn="978-1-78439-534-2"
        price={29.99}
        stock={10}
      />
    </Stack>
  );
}
