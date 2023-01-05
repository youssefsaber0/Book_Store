import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import BookIcon from '@mui/icons-material/Book';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { isUserInRole } from 'Frontend/auth';
import { logout } from 'Frontend/auth';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import views from './views.js';

const adminPages = ['Add Book', 'Edit Books', 'Orders', 'Reports', 'User Promotion'];
const adminRoutes = ['/addBook', '/editBook', '/order', '/DownloadReport', '/promote'];

export default function MenuOnLeftLayout() {
  const { pathname } = useLocation();
  const currentTitle = views[pathname]?.title ?? 'Unknown';

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    document.title = currentTitle || '';
  }, [currentTitle]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout().then(() => {
      window.location.href = '/login';
    });
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'Public Sans, sans-serif',
    },
    shape: { borderRadius: 6 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
            borderRadius: 6 * 2,
            position: 'relative',
            zIndex: 0,
          },
        },
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <div className="block h-full" style={{ backgroundColor: '#f9fafb' }}>
          <Box sx={{ display: 'flex' }}>
            <AppBar>
              <Container maxWidth="xl">
                <Toolbar>
                  <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    BOOKSHOP
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      {isUserInRole("admin") && adminPages.map((page) => (
                        <Link to={adminRoutes[adminPages.indexOf(page)]} style={{ textDecoration: 'none' }}>
                          <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </Box>
                  <BookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    BOOKSHOP
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {isUserInRole("admin") && adminPages.map((page) => (
                      <Link to={adminRoutes[adminPages.indexOf(page)]} style={{ textDecoration: 'none' }}>
                        <Button
                          key={page}
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {page}
                        </Button>
                      </Link>
                    ))}
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Link to="/cart">
                      <IconButton sx={{ mr: 1 }} aria-label="show 4 new mails">
                        <CartIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Link>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Outlet />
            </Box>
          </Box>
        </div>
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
