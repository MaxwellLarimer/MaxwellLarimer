import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import { Login } from './pages/login';
import { Logout } from './pages/logout';
import { Signup } from './pages/signup';
import { CheckEmail } from './pages/check-email';
import { ConfirmEmail } from './pages/confirm-email';
import { ResendConfirmation } from './pages/resend-confirmation';
import { Dashboard } from './pages/dashboard';
import { Home } from './pages/home';
import { api } from './components/api';

import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from './Modal';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const drawerWidth = 240

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: createColor('#fe4b20'),
    secondary: createColor('#ffa034'),
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
        }
      }
    }
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      // console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '80px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `0px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const App = () => {
  const [token, setToken] = useLocalStorage('token', undefined);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const background = location.state && location.state.background;
  const theme = useTheme();

  console.log(token);
  
  const onChange = (token) => {
    if (!token) {
      setOpen(false);
    }
    setToken(token);
    api.defaults.headers.common['Authorization'] = token;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
    return (
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
            <Toolbar>
              {token &&
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
              }
              <Link to='/'>
              <img src='/static/logo-dark.png' className='logo' />
              </Link>
              <div className='grow' />
              {token ?
              <Button href='/logout' color="inherit">Logout</Button>
              :
              <>
              <Button component={Link} to={{pathname: '/login', state: { background: location }}} sx={{marginRight: 2}} color="inherit">Login</Button>
              <Button variant='contained' component={Link} to={{pathname: '/signup', state: { background: location }}} sx={{marginRight: 2}} color="primary">Signup</Button>
              </>
              }
            </Toolbar>
          </AppBar>
          <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Internet', 'Email', 'Learning'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <PublicIcon />
                  : index === 1 ? <MailIcon />
                  : <SchoolIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>
            Notes
          </ListSubheader>
          {['Today', 'Nov 29', 'Nov 28'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
          <Main open={open}>
        <Switch location={background || location}>
          <Route path='/check-email' component={CheckEmail} />
          <Route path='/confirm-email/:email/:token' render={(props) => ( <ConfirmEmail {...props} onChange={onChange} /> )} />
          <Route path='/resend-confirmation' component={ResendConfirmation} />
          <Route exact path='/logout' render={(props) => ( <Logout {...props} onChange={onChange} /> )} />
          <Route path='/dashboard' component={Dashboard} />
          <Route exact path='/' component={Home} />
        </Switch>
        {background && <Route path="/signup" children={<Signup onChange={onChange} />} />}
        {background && <Route path="/login" children={<Login onChange={onChange} />} />}
      </Main>
      </ThemeProvider>
    )
  // }
}

export default App;
