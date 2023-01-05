import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';
import { SxProps, TextField } from '@mui/material';

interface BookCartProps {
  total: number;
  sx?: SxProps;
}

export default function CheckoutCard(props: BookCartProps) {
  const [cardNumber, setCardNumber] = React.useState<string>('');
  const [expiryDate, setExpiryDate] = React.useState<string>('');

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(event.target.value);
  };

  const handleCheckout = () => {
    HelloReactEndpoint.checkout({ cardNumber, expirationDate: expiryDate })
      .then(() => {
        console.log('Checkout successful');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card sx={{ width: '100%', ...props.sx }}>
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Stack direction="column" spacing={2}>
          <Typography fontWeight="600" fontSize={24}>
            Checkout
          </Typography>

          <Stack direction="column" spacing={1}>
            <TextField label="Card Number" variant="outlined" value={cardNumber} onChange={handleCardNumberChange} />
            <TextField label="Expiry Date" variant="outlined" value={expiryDate} onChange={handleExpiryDateChange} />
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="600" fontSize={18}>
              Total Cost
            </Typography>
            <Typography fontWeight="600" fontSize={18}>
              {props.total}
            </Typography>
          </Stack>

          <Button variant="contained" size="large" sx={{ width: '100%' }} onClick={handleCheckout}>
            Checkout
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
