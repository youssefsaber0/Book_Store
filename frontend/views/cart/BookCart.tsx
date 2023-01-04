import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import type { SxProps } from '@mui/material';

interface BookCartProps {
  title: string;
  price: number;
  quantity: number;
  sx?: SxProps;
}

export default function BookCart(props: BookCartProps) {
  return (
    <Card sx={{ width: '100%', ...props.sx }}>
      <CardContent sx={{ '&:last-child': { pb: 2 }}}>
        <Stack
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Stack direction="column" spacing={1}>
            <Typography fontWeight="600" fontSize={18}>
              {props.title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontSize={18} color={'grey.600'}>
                ${props.price} x {props.quantity}
              </Typography>
              <Typography fontSize={18} color={'primary'}>
                ${props.price * props.quantity}
              </Typography>
            </Stack>
          </Stack>
          <IconButton aria-label="delete" size="small" sx={{ left: 8, top: -4 }}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
