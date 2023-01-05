import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';

type userProps = {
  name: string;
  id: number;
  setUsers: any;
  setShowUsers: any;
  users: any;
  showUsers: any;
};
function User({ name, id, users, showUsers, setUsers, setShowUsers }: userProps) {
  function promote() {
    // TODO
    HelloReactEndpoint.promote(id);
    setUsers([]);
    setShowUsers([]);
    setUsers(users.filter((user: any) => user.user_id !== id));
    setShowUsers(showUsers.filter((user: any) => user.user_id !== id));
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
  const [users, setUsers] = useState<any>([]);
  const [showUsers, setShowUsers] = useState<any>([]);
  const fetchUsers = () => {
    HelloReactEndpoint.getAllUsers()
      .then((response) => {
        var useer = JSON.parse(response as string);

        console.log(useer);
        // useer.map((val: any) => setUsers((before: any) => [...before, val]));
        setUsers(JSON.parse(response as string));
        setShowUsers(JSON.parse(response as string));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
    // change background color with a random color

    // HelloReactEndpoint.getAllUsers().then((res) => {
    // console.log(res);
    // // (old) => [...old, ...newArrayData];
    // setShowUsers([]);
    // setUsers([]);
    // res.map((val: any) => {
    //   if (val?.role === 'customer') {
    //     var user = { name: val?.first_name + ' ' + val?.last_name, id: val?.user_id };
    //     setUsers([...users, user]);
    //     setShowUsers([...users, user]);
    //   }
    // });
    // });
  }, []);
  function filterUser(value: string) {
    setShowUsers(users.filter((user: any) => user.name.toLowerCase().includes(value.toLowerCase())));
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
        {showUsers
          ?.filter((user: any) => user['role'] !== 'admin')
          .map((user: any) => (
            <User
              name={user['first_name'] + ' ' + user['last_name']}
              users={users}
              showUsers={showUsers}
              setUsers={setUsers}
              setShowUsers={setShowUsers}
              id={user['user_id']}
              key={user['user_id']}
            />
          ))}
      </Grid>
    </Grid>
  );
}
