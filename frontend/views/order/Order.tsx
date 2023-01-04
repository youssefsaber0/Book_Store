import { ThemeProvider } from '@emotion/react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { isButtonElement } from 'react-router-dom/dist/dom';
// OrderPropss
const theme = createTheme();
type orderProps = {
  bookISBN: string;
  count: number;
};
function Order({ bookISBN, count }: orderProps) {
  function accept() {
    // TODO:
  }
  function refuse() {
    // TODO:
  }
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {'book id ' + bookISBN}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {'number of copies ' + count}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" sx={{ backgroundColor: 'green' }} onClick={() => accept}>
          Accept
        </Button>
        <Button sx={{ backgroundColor: 'red' }} variant="contained" size="small" onClick={() => refuse}>
          Refuse
        </Button>
      </CardActions>
    </Card>
  );
}
type popUpProps = {
  open: boolean;
  setOpen: any;
};
function PopUp({ open, setOpen }: popUpProps) {
  const [ISBN, setISBN] = useState('');
  const [nOC, setNOC] = useState(0);
  function newOrder() {
    console.log({
      noc: nOC,
      ISBN: ISBN,
    });
  }
  return (
    <Dialog open={open}>
      <DialogTitle>New Order</DialogTitle>
      <DialogContent dividers>
        <Grid>
          <TextField label={'Book ISBN'} sx={{ width: '50%' }} onChange={(e) => setISBN(e.currentTarget.value)} />
          <TextField
            type="number"
            InputProps={{
              inputProps: {
                max: 100,
                min: 0,
              },
            }}
            onChange={(e) => setNOC(Number(e.currentTarget.value))}
            label={'Number of copies'}
            sx={{ width: '50%' }}
          />
          <Button
            onClick={() => {
              newOrder();
              setOpen(false);
            }}
          >
            Add
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
export default function OrderView() {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [filteredOrders, setFilterdOrders] = useState<any>([]);

  var orders = [
    { bookISBN: '0021200', count: 50 },
    { bookISBN: '0221201', count: 50 },
    { bookISBN: '1221200', count: 50 },
    { bookISBN: '5221200', count: 20 },
    { bookISBN: '3221200', count: 10 },
  ];
  function filterOrders(value: string) {
    console.log(orders.filter((order) => order['bookISBN'].includes(value)));
    setFilterdOrders(orders.filter((order) => order['bookISBN'].includes(value)));
  }
  useEffect(() => {
    // change background color with a random color
    setFilterdOrders(orders);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* <Helmet>
        <style>{'body { background-color: red; }'}</style>
      </Helmet> */}
      <Grid container component="main" sx={{ width: '100vw', height: '100%' }}>
        <Grid xs={20} sm={12} sx={{ mt: 10, mx: 50 }}>
          <Typography component="h1" variant="h5">
            Orders
          </Typography>

          <div style={{ margin: '20px' }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ height: 60, float: 'left', width: '50%' }}
              margin="normal"
              required
              fullWidth
              id="book ISBN"
              label="Book ISBN"
              onChange={(e) => {
                filterOrders(e.currentTarget.value);
              }}
              name="book"
              autoFocus
            />
            <Button
              variant="contained"
              sx={{ height: 60, float: 'right', width: '40%', mt: '10px' }}
              onClick={() => setOpenPopUp(true)}
              endIcon={<AddIcon />}
            >
              New order
            </Button>
            <PopUp open={openPopUp} setOpen={setOpenPopUp} />
          </div>
        </Grid>
        <Grid xs={20} sm={12} sx={{ mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }}>
          {filteredOrders?.map((order: any) => (
            <Order bookISBN={order['bookISBN']} count={order['count']} key={order['bookISBN']} />
          ))}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
