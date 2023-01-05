import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, InputAdornment, Radio, RadioGroup } from '@mui/material';
import { HelloReactEndpoint } from 'Frontend/generated/endpoints';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';

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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  React.useEffect(() => {
    HelloReactEndpoint.getUserInfo().then((res) => {
      if (res) {
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setEmail(res.email);
        setPhoneNumber(res.phoneNumber);
        setShippingAddress(res.shippingAddress);
      }
    });
  }, []);

  const handleSubmit = () => {
    if (isEmailValid() && password.length >= 8 && confirmPassword === password && email) {
      console.log({
        email: email,
        password: password,
      });
      HelloReactEndpoint.updateUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
      }).then(() => {
        window.location.href = '/';
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

  return (
    <Box>
      <Typography fontWeight="bold" fontSize={48}>
        Edit Profile
      </Typography>
      <Card variant='elevation' sx={{ padding: '2rem', marginTop: '1rem' }}>
      <TextField
        sx={{ display: 'inline-flex', width: '49%', marginRight: '1%' }}
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First name"
        name="first name"
        value={firstName}
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
        value={lastName}
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
        value={email}
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
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.currentTarget.value);
        }}
        name="phoneNumber"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="shippingAddress"
        label="Shipping Address"
        value={shippingAddress}
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
      <Button onClick={handleSubmit} type="submit" variant="contained" sx={{ marginTop: 0.5, float: "right" }} fullWidth size="large">
        Save Changes
      </Button>
      </Card>
    </Box>
  );
}
