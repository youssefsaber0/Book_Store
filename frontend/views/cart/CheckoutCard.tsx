import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { SxProps, TextField } from '@mui/material';

interface BookCartProps {
  total: number;
  sx?: SxProps;
}

export default function CheckoutCard(props: BookCartProps) {
  return (
    <Card sx={{ width: '100%', ...props.sx }}>
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
      <Stack direction="column" spacing={2}>
        <Typography fontWeight="600" fontSize={24}>
          Checkout
        </Typography>

        <Stack direction="column" spacing={1}>
          <TextField label="Card Number" variant="outlined" />
          <TextField label="CVV" variant="outlined" />
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="600" fontSize={18}>
            Total Cost
          </Typography>
          <Typography fontWeight="600" fontSize={18}>
            {props.total}
          </Typography>
        </Stack>

        <Button variant="contained" size="large" sx={{ width: '100%' }}>
          Checkout
        </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
