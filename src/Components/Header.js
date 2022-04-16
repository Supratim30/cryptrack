import { makeStyles, AppBar, Container, MenuItem, Select, Toolbar, Typography, createTheme, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { useNavigate,  } from 'react-router-dom';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
import { CryptoState } from './CryptoContext';
const useStyles = makeStyles(() => ({
title: {
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
cursor: 'pointer',
}
}))

const Header = () => {
const classes = useStyles();

const history = useNavigate();

const { currency, setCurrency, user } = CryptoState();

const darkTheme = createTheme({
  palette : {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

  return (
<ThemeProvider theme={darkTheme}>
  <AppBar color='transparent' position='static'>
<Container>
  <Toolbar>
    <Typography onClick ={() => history('/')} className={classes.title}
    variant='h6'
    >
      CrypTrack
    </Typography>
    <Select variant='outlined' style={{width: 100, height: 40, marginRight:15}}
    value={currency} onChange={(e) => setCurrency(e.target.value)}
    >
      <MenuItem value={'USD'}>USD</MenuItem>
      <MenuItem value={'INR'}>INR</MenuItem>
    </Select>
    {user ? <UserSidebar/> : <AuthModal/>}
  </Toolbar>
</Container>
  </AppBar>
  </ThemeProvider>

)
}

export default Header