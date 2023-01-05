import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';
import { Card, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';

interface RoleProps {
  onChange: any;
}

function Role({ onChange }: RoleProps) {
  return (
    <FormControl>
      <FormLabel
        id="Role"
        sx={{
          fontSize: 18,
        }}
      >
        Role
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="Role"
        name="row-radio-Role"
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
      </RadioGroup>
    </FormControl>
  );
}

interface PasswordProps {
  lab: String;
  id: string;
  onChange: any;
}

export function Password({ lab, id, onChange }: PasswordProps) {
  const [password, setPassword] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(true);
  return (
    <TextField
      // error={}
      margin="normal"
      required
      fullWidth
      name={id}
      label={lab}
      type={isPassword ? 'password' : 'text'}
      id={id}
      onChange={(e) => {
        setPassword(e.currentTarget.value);
        onChange(e.currentTarget.value);
      }}
      error={password?.length < 8}
      helperText={password?.length < 8 ? 'Password must be more than eight characters' : ''}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" onClick={() => setIsPassword(!isPassword)}>
            {isPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </InputAdornment>
        ),
      }}
      autoComplete="current-password"
    />
  );
}
export default function SignupView() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSubmit = () => {
    if (isEmailValid() && password.length >= 8 && confirmPassword === password && role.length > 0 && email) {
      console.log({
        email: email,
        password: password,
        role: role,
      });
      HelloReactEndpoint.register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role,
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
      }).then((res) => {
        if (res) {
          window.location.href = '/login';
        }
      });
    }
  };
  const isEmailValid = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      console.log(false);
      return false;
    }
    return true;
  };
  const isValidNumber = () => {
    const regex = new RegExp('^01[0-9]{9}$');
    if (regex.test(phoneNumber) === false) {
      console.log(false);
      return false;
    }
    return true;
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sx={{
          width: '100%',
          backgroundColor: '#f9fafb',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={8} md={5} component={Card} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign UP
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  sx={{ display: 'inline-flex', width: '49%', marginRight: '1%' }}
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First name"
                  name="first name"
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last name"
                  name="Last name"
                  sx={{ display: 'inline-flex', width: '50%' }}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  autoFocus
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(val) => {
                    setEmail(val.currentTarget.value);
                  }}
                  name="email"
                  autoComplete="email"
                  error={!isEmailValid()}
                  helperText={!isEmailValid() ? 'Not valid email' : ''}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  onChange={(e) => {
                    setPhoneNumber(e.currentTarget.value);
                  }}
                  name="phoneNumber"
                  error={!isValidNumber()}
                  helperText={!isValidNumber() ? 'Not valid Number' : ''}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="shippingAddress"
                  label="Shipping Address"
                  onChange={(e) => {
                    setShippingAddress(e.currentTarget.value);
                  }}
                  name="shippingAddress"
                  autoFocus
                />
                <Password
                  lab={'password'}
                  id={'password'}
                  onChange={(value: React.SetStateAction<string>) => setPassword(value)}
                />
                <Password
                  lab={'confirm password'}
                  id={'confirmPassword'}
                  onChange={(value: React.SetStateAction<string>) => setConfirmPassword(value)}
                />
                <Role
                  onChange={(value: React.SetStateAction<string>) => {
                    console.log(value);
                    setRole(value);
                  }}
                />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: '60px' }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {'Do you have an account? Sign in'}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
