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
import { Card, InputAdornment } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import { login } from 'Frontend/auth';

export default function LoginView() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (password?.length >= 1 && email) {
      login(email, password).then((res) => {
        if (!res.error) {
          window.location.href = '/';
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
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                  // error={}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={isPassword ? 'password' : 'text'}
                  id="password"
                  onChange={(val) => {
                    setPassword(val.currentTarget.value);
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
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, height: '60px' }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
