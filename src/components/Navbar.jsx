import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import logo from '../assets/react.svg';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Sidebar, SidebarHeader } from './styledComponents';
import { Link } from "react-router-dom";

import navs from '../constants/navs';

const imageURL=`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD0fHo_Uloe5fH84TX4gwKOgnexF3cZu6jODBZANIasQ&s`;

function Navbar() {
    return (
    <Box sx={{width:'65px',minHeight:'100vh'}}>
    <Sidebar variant="permanent" PaperProps={{sx:{zIndex:'1201'}}}>
        <SidebarHeader sx={{px:0}}>
        <img style={{margin:'auto'}} src={logo} />
        </SidebarHeader>
    <Box sx={{display:'flex',flexDirection:'column', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-between',height:'100%'}}>
    <List sx={{marginX:'7px'}}>
        {navs.map((nav) => (
            <ListItem key={nav.path} disablePadding sx={{ display: 'block',marginY:'5px'}}>
            <ListItemButton
                component={Link}
                to={nav.path}
                sx={{
                justifyContent:'center',
                padding: '7px 10px',
                borderRadius:'4px',
                color:'#777',
                transition:'all .3s',
                ":hover":{color:'#f00',background:'#42a5f5',color:'#fff'},
                }}
            >
                <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                    color:'inherit'
                }}
                >
                {nav.icon}
                </ListItemIcon>
            </ListItemButton>
            </ListItem>
        ))}
        </List>
      <List>
              <ListItem disablePadding sx={{ display: 'block'}}>
              <ListItemButton
                  sx={{
                  justifyContent:'center',
                  padding: '7px 10px',
                  borderRadius:'4px',
                  color:'#777',
                  transition:'all .3s',
                  ":hover":{color:'#f00',background:'#42a5f5',color:'#fff'},
              }}
              >
                  <ListItemIcon
                  sx={{
                      minWidth: 0,
                      mr: 'auto',
                      justifyContent: 'center',
                      color:'inherit'
                  }}
                  >
                  <SettingsIcon />
                  </ListItemIcon>
              </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                  sx={{
                  justifyContent:'center',
                  padding: '7px 10px',
                  borderRadius:'4px',
                  color:'#777',
                  transition:'all .3s',
                  ":hover":{color:'#f00',background:'#42a5f5',color:'#fff'},
                  }}
              >
                  <ListItemIcon
                  sx={{
                      minWidth: 0,
                      mr: 'auto',
                      justifyContent: 'center',
                      color:'inherit'
                  }}
                  >
                  <SearchIcon />
                  </ListItemIcon>
              </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
              <Avatar component={'button'} color="primary" sx={{p:"0",margin:'auto',outline:'none',border:'2px solid #fff'}} alt="Remy Sharp" src={imageURL} />
              </ListItem>
      </List>
    </Box>
    </Sidebar>
    </Box>
    )
}

export default Navbar