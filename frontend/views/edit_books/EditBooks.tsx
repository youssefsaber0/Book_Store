import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

type userProps = {
  title: string;
  ISBN: string;
};
function Book({ title, ISBN }: userProps) {
  function Change() {
    // TODO
    console.log({ value: value });
  }
  const [value, setValue] = useState(0);
  return (
    <Accordion sx={{ backgroundColor: 'rgb(240, 240, 240)' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="id">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography sx={{ float: 'left' }}>{title}</Typography>
          </Grid>
          <Typography sx={{ float: 'right' }}>{'id:' + ISBN}</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <TextField type={'number'} onChange={(e) => setValue(Number(e.currentTarget.value))} />
          <Button variant="contained" onClick={Change} sx={{ ml: 50 }}>
            Change
          </Button>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default function EditBooks() {
  const books = [
    { ISBN: '55561221224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '55651221224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '5551921224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '551521224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '5515221224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '551228224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '551227224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '551225224', title: 'aadas', numOfCopies: 5 },
    { ISBN: '551221221', title: 'aadas', numOfCopies: 5 },
  ];
  const [showBooks, setShowBooks] = useState<any>();

  useEffect(() => {
    // change background color with a random color
    setShowBooks(books);
  }, []);
  function filterBooks(value: string) {
    console.log(books.filter((book) => book['ISBN'].includes(value)));
    setShowBooks(books.filter((book) => book['ISBN'].includes(value)));
  }
  return (
    <Grid>
      <Grid>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 10, mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }}
          margin="normal"
          required
          fullWidth
          id="ISBN"
          label="Book ISBN"
          onChange={(e) => {
            filterBooks(e.currentTarget.value);
          }}
          name="BOOKISBN"
          autoFocus
        />
      </Grid>
      <Grid xs={20} sm={12} sx={{ mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }}>
        {showBooks?.map((book: any) => (
          <Book title={book['title']} ISBN={book['ISBN']} key={book['ISBN']} />
        ))}
      </Grid>
    </Grid>
  );
}
