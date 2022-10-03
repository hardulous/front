import { MusicNote } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("token");

  const handleClick = (type)=>{
    if(type=="out"){
      localStorage.removeItem("token");
      navigate("/")
    }
    else{
      navigate("/")
    }
  }

  return (

    <>
    
      <AppBar position='static' sx={{
        bgcolor:"#0e1214f0"
      }}>
        <Toolbar>
          <IconButton>
            <MusicNote color="primary" size="large"/>
          </IconButton>
          <Typography variant="h4" sx={{flexGrow:1}}>My Music</Typography>
          {
            isLoggedIn ? <Button variant='outlined' color="inherit" onClick={()=>{handleClick("out")}}>Log out</Button> : 
            <Button variant='outlined' color="inherit" onClick={()=>{handleClick("auth")}}>Log in / Sign up </Button>
          }
        </Toolbar>
      </AppBar>

    </>

  )

}

export default Navbar