import { Box, Button, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { CryptoState } from '../CryptoContext';

const Signup = ({handleClose}) => {
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const {setAlert} = CryptoState();

const handleSubmit = async () =>{
  if(password !== confirmPassword){
    setAlert({
      open: true,
      message: "Passwords don't match",
      type: 'error'
    }); return;
  }
try{
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
    );
    setAlert({
      open: true,
      message: `Signup successful. Welcome ${result.user.email}`,
type: 'success'
    });

handleClose()

} catch(error) {
  setAlert({
    open: true,
    message: error.message,
    type: 'error'});
}
};

  return (
    <Box
      p={3}
      style={{display:'flex', flexDirection:'column', gap: '20px'}}
    >
      <TextField
      variant='outlined'
      type='email'
      label='Enter email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      />
      <TextField
      variant='outlined'
      type='password'
      label='Enter password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      />
      <TextField
      variant='outlined'
      type='password'
      label='Confirm password'
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      fullWidth
      />
      <Button
      variant='contained'
      size='large'
      style={{backgroundColor: '#eeb1cd'}}
      onClick={handleSubmit}
      >Sign Up</Button>
</Box>
  )
}

export default Signup