import React, {useState, useContext} from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AlbumIcon from '@mui/icons-material/Album';
import UserContext from '../UserContext';

const pages = ['Profile', 'Favorites'];

function Layout({logout}) {
  const {currentUser} = useContext(UserContext);
  console.log(currentUser)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuAndLogout = () => {
    handleCloseUserMenu();
    logout();
  }

  const handleNavMenuAndLogout = () => {
    handleCloseNavMenu();
    logout();   
  }

 
  function loggedInNav(){
    return (
      
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* xs view */}
            <AlbumIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h6" noWrap component="a" href="/" 
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1,
              }}>
              PodZoo
            </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...takeFirstLetter(currentUser.username)} />
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseUserMenu}>
                    <Typography 
                      textAlign="center" component="a" href={`/user/${page}`}
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none'
                        }}>
                      {page} 
                    </Typography>
                
                  </MenuItem>
                ))}
                {/* <MenuItem key="logout" onClick={handleCloseUserMenu}> */}
                <MenuItem key="logout" onClick={handleUserMenuAndLogout} component ="a"
                  href="/">
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
              </Menu>
            </Box>       
          
            {/* md view */}
            <AlbumIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6" noWrap component="a" href="/" 
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                flexGrow:1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              PodZoo
            </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component='a' 
                href={`/user/${page}`}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <Button
                key="logout"
                // onClick={handleCloseNavMenu}
                onClick={handleNavMenuAndLogout}
                sx={{ my: 2, color: 'black', display: 'block' }}
                component ="a"
                href="/"
              >
                Logout
              </Button>
            </Box>

          </Toolbar>
        </Container>
    );
  }

  function loggedOutNav(){
    return(
      <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AlbumIcon sx={{ display: 'flex', mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  flexGrow:1
                }}
              >
                PodZoo
              </Typography>           
    
              <Box sx={{ flexGrow: 0, display: 'flex'}}>
                <Button
                  key="login"
                  onClick={handleCloseNavMenu}
                  component ="a"
                  href="/login"
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Login
                </Button>
                <Button
                  key="signup"
                  onClick={handleCloseNavMenu}
                  component ="a"
                  href="/signup"
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Signup
                </Button>

                  {/* <Button>
                    <NavLink to="login">Login</NavLink>
                  </Button>
                  <Button >
                    <NavLink to="signup">Signup</NavLink>
                  </Button> */}
              </Box>
            </Toolbar>
      </Container>
      );
  }

  return(
    <>
    <AppBar position="static" color='default'>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </AppBar>
     <Outlet />
     </>
  );
  
 

};

function takeFirstLetter(string){
  return {
    children: string.charAt(0).toUpperCase()
  };
}

export default Layout;
