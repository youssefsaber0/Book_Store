import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';

const theme = createTheme();
type dropProps = {
  onChange: any;
  list: any[];
  sx: any;
  label: string;
};
function DropDown({ onChange, list, sx, label }: dropProps) {
  const [value, setValue] = useState<string>('');
  const categories = list;
  const handleChange = (value: any) => {
    setValue(value);
    onChange(value);
  };

  return (
    <TextField
      label={label}
      sx={sx}
      select
      value={value}
      onChange={(event) => {
        handleChange(event.target.value);
        onChange(event.target.value);
      }}
    >
      {categories.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default function AddBook() {
  const [ISBN, setISBN] = useState('');
  const [title, setTitle] = useState('');

  const [authors, setAuthors] = useState<String[]>();
  const [pulisher, setPulisher] = useState<string>('');
  const [numberOfCopies, setNumberOfCopies] = useState<any>();
  const [threshhold, setThreshhold] = useState<any>();
  const [category, setCategory] = useState('');

  const [pulishYear, setPulishYear] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [publishers, setPublishers] = useState<string[]>([]);

  //   const [category, setCategory] = useState('');
  React.useEffect(() => {
    setPublishers([]);
    HelloReactEndpoint.getAllPublishers().then((res) => {
      console.log(res);
      // (old) => [...old, ...newArrayData];

      res.map((val) => setPublishers((publishers) => [...publishers, val?.publisher_name]));
    });
  }, []);
  var categories = ['Science', 'Art', 'Religion', 'History', 'Geography'];
  function addBook() {
    if (Number(numberOfCopies) >= Number(threshhold) && Number(threshhold) > 0 && Number(price) > 0) {
      HelloReactEndpoint.AddBookRequest({
        isbn: ISBN,
        title: title,
        authors: authors as (string | undefined)[],
        publisher: pulisher,
        numberOfCopies: Number(numberOfCopies),
        threshhold: Number(threshhold),
        category: category,
        publishYear: Number(pulishYear),
        price: Number(price),
      }).then((val) => {
        if (val) {
          window.alert('book added successfuly');
        } else {
          window.alert('error in add book');
        }
      });
    } else {
      window.alert('not valid argument');
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sx={{
            width: '100%',
            backgroundColor: '#E1F5FE',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Grid container alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={20} sm={12} md={11} component={Paper} elevation={6} marginLeft={5} square>
              <Box
                sx={{
                  mx: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <MenuBookIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Book
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    sx={{ marginTop: '20px', width: '50%' }}
                    margin="normal"
                    required
                    fullWidth
                    id="ISBN"
                    label="Book ISBN"
                    name="bookISBN"
                    onChange={(event) => setISBN(event.currentTarget.value as string)}
                    autoFocus
                  />
                  <TextField
                    sx={{ marginTop: '20px', width: '49%', marginLeft: '1%' }}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Book Title"
                    name="bookTitle"
                    onChange={(event) => setTitle(event.currentTarget.value as string)}
                    autoFocus
                  />
                  <div>
                    <Autocomplete
                      sx={{ marginTop: '20px', width: '50%', float: 'left', marginRight: '1%' }}
                      onChange={(event, value) => {
                        setAuthors(value);
                      }}
                      multiple
                      id="tags-filled"
                      options={[]}
                      freeSolo
                      renderInput={(params: any) => {
                        return (
                          <TextField
                            {...params}
                            variant="filled"
                            label="Authors "
                            sx={{
                              fontSize: '18px',
                            }}
                          />
                        );
                      }}
                    />
                    <DropDown
                      onChange={(value: any) => {
                        setPulisher(value);
                      }}
                      list={publishers}
                      sx={{ width: '49%', marginTop: '20px' }}
                      label={'Publisher'}
                    />
                  </div>
                  <TextField
                    sx={{ marginTop: '20px', width: '50%' }}
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 100,
                        min: 10,
                      },
                    }}
                    label="Number of copies"
                    onChange={(event) => setNumberOfCopies(event.currentTarget.value as string)}
                    required
                    fullWidth
                  />

                  <TextField
                    sx={{ marginTop: '20px', width: '49%', marginLeft: '1%' }}
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 100,
                        min: 10,
                      },
                    }}
                    onChange={(event) => setThreshhold(event.currentTarget.value as string)}
                    label="Threshhold"
                    required
                    fullWidth
                  />

                  <div>
                    <DropDown
                      onChange={(value: any) => {
                        setCategory(value);
                      }}
                      list={categories}
                      sx={{ marginTop: '20px', width: '50%' }}
                      label={'Category'}
                    />
                    <DropDown
                      onChange={(value: any) => {
                        setPulishYear(value);
                      }}
                      list={years(1850)}
                      sx={{ marginTop: '20px', width: '49%', marginLeft: '1%' }}
                      label={'Published year'}
                    />
                  </div>
                  <TextField
                    type="number" //ad this line
                    fullWidth
                    sx={{ marginTop: '20px' }}
                    onChange={(event) => setPrice(event.currentTarget.value as string)}
                    label="Price"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      console.log(authors);
                      addBook();
                    }}
                    sx={{
                      display: 'inline-flex',
                      width: '20%',
                      marginLeft: '2%',
                      mt: 3,
                      mb: 2,
                      height: '60px',
                      '&:hover': {
                        backgroundColor: 'green',
                        boxShadow: 'none',
                      },
                    }}
                    endIcon={<AddIcon />}
                  >
                    Add Book
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

var years = function (startYear: number) {
  var currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};
