import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

type userProps = {
  name: string;
  id: number;
};
function User({ name, id }: userProps) {
  function promote() {
    // TODO
  }
  return (
    <Accordion sx={{ backgroundColor: 'rgb(240, 240, 240)' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="id">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography sx={{ float: 'left' }}>{name}</Typography>
          </Grid>
          <Typography sx={{ float: 'right' }}>{'id:' + id}</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <Button variant="contained" onClick={promote}>
            Promote
          </Button>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default function Promote() {
  const users = [
    { name: 'ALi', id: 1 },
    { name: 'mhmd', id: 2 },
    { name: 'saber', id: 3 },
  ];
  const [showUsers, setShowUsers] = useState<any>(users);

  useEffect(() => {
    // change background color with a random color
    setShowUsers(users);
  }, []);
  function filterUser(value: string) {
    setShowUsers(users.filter((user) => user['name'].toLowerCase().includes(value.toLowerCase())));
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
          id="UserName"
          label="User Name"
          onChange={(e) => {
            filterUser(e.currentTarget.value);
          }}
          name="UserName"
          autoFocus
        />
      </Grid>
      <Grid xs={20} sm={12} sx={{ mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }}>
        {showUsers?.map((user: any) => (
          <User name={user['name']} id={user['id']} key={user['id']} />
        ))}
      </Grid>
    </Grid>
  );
}
