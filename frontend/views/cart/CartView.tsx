import * as React from 'react';
import Stack from '@mui/material/Stack';
import BookCart from './BookCart';
import CostCard from './CheckoutCard';

export default function ShopView() {
  return (
    <Stack maxWidth="xl" spacing={2} alignItems="flex-start" direction={{ xs: 'column', md: 'row' }}>
      <BookCart
        title="The Complete Guide To Blender Graphics: Computer Modeling And Animation"
        price={29.99}
        quantity={10}
        sx={{ flex: 2 }}
      />
      <CostCard total={299.9} sx={{ flex: 1 }} />
    </Stack>
  );
}
