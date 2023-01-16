import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveAppBar from './components/AppBar';
import { Navbar } from './components';
import Router from './routes';

export default function App() {
  return (
    <Box sx={{p:'0',display:'flex',flexDirection:'row',minHeight:'100vh'}}>
      <CssBaseline />
      <Navbar />
      <Box sx={{width:'calc(100% - 65px)',minHeight:'100vh',background:'#fafafa',display:'flex',flexDirection:'column'}}>
      <ResponsiveAppBar />
      <Box component={'main'} sx={{height:'100%'}} >
        <Router />
      </Box>
      </Box>
    </Box>
  );
}
