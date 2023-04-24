import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, Toolbar, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from "../models/user";
import * as DataEntriesApi from '../network/dataEntries_api';

interface NavBarProps {
    loggedInUser: User | null;
    onLogoutSuccessful: () => void,
  }

const LoggedInOptions = ['Dashboard', 'Logout'];
const LoggedOutOptions = ['Login', 'Register'];
  
const NavBar = ({
    loggedInUser,
    onLogoutSuccessful,
  }: NavBarProps) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const options = loggedInUser ? LoggedInOptions : LoggedOutOptions;
    const navigate = useNavigate();
    const { palette } = useTheme();

    async function logout() {
      try {
          await DataEntriesApi.logout();
          navigate("/dashboard");
          onLogoutSuccessful();
          
      } catch (error) {
          console.error(error);
          alert(error);
      }
  }
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    return (
      <AppBar position="static" sx={{ 
        backgroundColor: palette.grey[900],
        color: 'white'
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                textDecoration: 'none',
              }}
            >
              LOGO
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
                PaperProps={{
                  style: {
                    backgroundColor: palette.grey[900]
                  }
                }}
              >
                {options.map((option) => (
                  <Box  
                    key={option}
                    onClick={handleCloseNavMenu}
                  >
                    {option === 'Logout' ? 
                    <Button 
                      onClick={logout}
                      sx={{ 
                        my: .5,
                        mx: 2,
                        color: 'white', 
                        display: 'block',
                        ':hover': {
                          color: palette.primary[100]
                        }
                      }}
                      >Log out</Button>
                  :
                    <Button
                      component={Link}
                      to={option}
                      sx={{ 
                        my: .5,
                        mx: 2,
                        color: 'white', 
                        display: 'block',
                        ':hover': {
                          color: palette.primary[100]
                        }
                      }}
                      >
                        {option}
                    </Button>
                  }
                  </Box>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {options.map((option) => (
                  <Box  
                  key={option}
                  onClick={handleCloseNavMenu}
                >
                  {option === 'Logout' ? 
                  <Button 
                    onClick={logout}
                    sx={{ 
                      color: 'white', 
                      display: 'block',
                      ':hover': {
                        color: palette.primary[100]
                      }
                    }}
                    >Log out</Button>
                :
                  <Button
                    component={Link}
                    to={option}
                    sx={{ 
                      color: 'white', display: 'block',
                      ':hover': {
                        color: palette.primary[100]
                      }
                    }}
                    >
                      {option}
                  </Button>
                }
                </Box>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default NavBar;