import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';

interface BookCardProps {
  title: string;
  authors: string[];
  publisher: string;
  isbn: string;
  price: number;
  stock: number;
}

export default function BookCard(props: BookCardProps) {
  return (
    <Card>
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Stack direction="column" spacing={0}>
            <Typography fontWeight="600" fontSize={18}>
              {props.title}
            </Typography>
            <Typography fontSize={14} color={'grey.600'}>
              Authored by {props.authors.join(', ')}
            </Typography>
            <Typography fontSize={14} color={'grey.600'}>
              Published by {props.publisher}
            </Typography>
            <Typography fontSize={14} color={'grey.600'}>
              ISBN: {props.isbn}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography fontSize={24}>${props.price}</Typography>
              <Typography color={props.stock > 0 ? 'green' : 'red'}>•</Typography>
              <Typography color={props.stock > 0 ? 'green' : 'red'}>{props.stock > 0 ? 'in' : 'out'} stock</Typography>
            </Stack>
          </Stack>
          {props.stock > 0 && (
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography fontSize={14} color={'grey.600'}>
                  Quantity:
                </Typography>
                <Select native defaultValue={1} size="small">
                  {[...Array(Math.min(props.stock, 20)).keys()].map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Select>
              </Stack>
              <Button variant="contained" size="large">
                Add to Cart
              </Button>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
