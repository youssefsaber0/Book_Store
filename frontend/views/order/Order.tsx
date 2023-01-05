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
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';
// OrderPropss
const theme = createTheme();
type orderProps = {
  bookISBN: string;
  count: number;
  setOrders: any;
  setFilterdOrders: any;
  orders: any;
  filterdOrders: any;
  id: number;
};
function Order({ bookISBN, count, setOrders, orders, setFilterdOrders, filterdOrders, id }: orderProps) {
  function accept() {
    console.log(id);
    HelloReactEndpoint.confirmOrder(id);
    setOrders(orders.filter((order: any) => order.id !== id));
    setFilterdOrders(orders.filter((order: any) => order.id !== id));
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
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: 'green', height: '60px' }}
          onClick={() => accept()}
        >
          Confirm
        </Button>
      </CardActions>
    </Card>
  );
}
type popUpProps = {
  open: boolean;
  setOpen: any;
  setOrders: any;
  setFilterdOrders: any;
  fetch: any;
};
function PopUp({ open, setOpen, fetch }: popUpProps) {
  const [ISBN, setISBN] = useState('');
  const [nOC, setNOC] = useState(0);
  function newOrder() {
    console.log({
      noc: nOC,
      ISBN: ISBN,
    });
    HelloReactEndpoint.newOrder({
      count: nOC,
      isbn: ISBN,
    }).then((value) => fetch());
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

  function fetch() {
    setFilterdOrders([]);
    setOrders([]);

    HelloReactEndpoint.getOrders().then((resp) => {
      console.log(resp);
      // QTY: 50;
      // isbn: 'nameaaaaa';
      // order_id: 1;
      resp.map((value: any) => {
        console.log(value);
        setOrders((old: any) => [...old, { bookISBN: value?.isbn, count: value?.QTY, id: value?.order_id }]);
        setFilterdOrders((old: any) => [...old, { bookISBN: value?.isbn, count: value?.QTY, id: value?.order_id }]);
      });
    });
  }
  const [orders, setOrders] = useState<any>([]);
  function filterOrders(value: string) {
    console.log(orders?.filter((order: any) => order['bookISBN'].includes(value)));
    setFilterdOrders(orders?.filter((order: any) => order['bookISBN'].includes(value)));
  }
  useEffect(() => {
    // change background color with a random color
    fetch();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* <Helmet>
        <style>{'body { background-color: red; }'}</style>
      </Helmet> */}
      <Grid container component="main" sx={{ width: '100vw', height: '100%' }}>
        <Grid xs={20} sm={12} sx={{ mt: 10, mx: 50 }} item>
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
            <PopUp
              open={openPopUp}
              setOrders={setOrders}
              setFilterdOrders={setFilterdOrders}
              setOpen={setOpenPopUp}
              fetch={fetch}
            />
          </div>
        </Grid>
        <Grid xs={20} sm={12} sx={{ mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }} item>
          {filteredOrders?.map((value: any) => (
            <Order
              setOrders={setOrders}
              setFilterdOrders={setFilterdOrders}
              orders={orders}
              filterdOrders={filterOrders}
              bookISBN={value['bookISBN']}
              count={value['count']}
              id={value['id']}
              key={value['id']}
            />
          ))}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
