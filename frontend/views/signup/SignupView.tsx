import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
const theme = createTheme();
type ruleProps = {
  onChange: any;
};
function Rule({ onChange }: ruleProps) {
  return (
    <FormControl>
      <FormLabel
        id="Rule"
        sx={{
          fontSize: 18,
        }}
      >
        Rule
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="Rule"
        name="row-radio-Rule"
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        <FormControlLabel value="user" control={<Radio />} label="user" />
        <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
      </RadioGroup>
    </FormControl>
  );
}
type passwordProps = {
  lab: String;
  id: string;
  onChange: any;
};
export function Password({ lab, id, onChange }: passwordProps) {
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
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rule, setRule] = useState<string>('');

  const handleSubmit = () => {
    if (isEmailValid() && password.length >= 8 && confirmPassword === password && rule.length > 0) {
      console.log({
        email: email,
        password: password,
        rule: rule,
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
                <Rule
                  onChange={(value: React.SetStateAction<string>) => {
                    console.log(value);
                    setRule(value);
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
