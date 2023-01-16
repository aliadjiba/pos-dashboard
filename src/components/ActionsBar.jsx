import { AppBar, Toolbar } from '@mui/material'
import React from 'react'

const  ActionsBar = ({children}) => (
    <AppBar position='static' sx={{margin:'1rem',width:'calc(100% - 2rem)', borderRadius:'7px',bgcolor:'#fff',color:'#434343',boxShadow:'0px 0px 19px 0px rgb(0 0 0 / 10%)'}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
        {children}
        </Toolbar>
    </AppBar>
)


export default ActionsBar