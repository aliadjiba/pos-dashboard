import { AppBar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { ActionsBar as PortalActionBar,Table } from '../components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Grid from '@mui/material/Grid';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const checkList = [
  {name:'all',value:'1'},
  {name:'Employees',value:'2'},
  {name:'clients',value:'3'},
];
const ActionBar = ({state,setSlector})=>(<PortalActionBar>
  {/* {checkList.map((e,index)=>(
    <Button key={index} variant={e.value===state?'outlined':'text'} sx={{p:'5px 7px',border:'1px solid #fff0',transition:'all .3s',borderColor:e.value===state?'#999':'#fff0'}} onClick={()=>setSlector(e.value)}>{e.name}</Button>
  ))}  */}
  <h3>People</h3>
<IconButton aria-label="add to shopping cart">
  <AddCircleOutlineIcon />
</IconButton>
</PortalActionBar>)
function People() {
  const [state, setstate] = useState('1');
  const setSlector = (state)=>{
    setstate(state);
  }
  return (
    <Grid sx={{height:'100%'}} container spacing={0.1}>
    <Grid item xs={12} md={2} sx={{paddingY:'1rem'}}>
    <Paper elevation={12} sx={{background: '#fff', borderRadius: '7px', height: '100%', marginRight: 'auto', width: '95%', padding:'1rem'}}>
    <List>
        {['All', 'Clients', 'Distributor'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{borderRadius:'5px'}}>
              <ListItemIcon>
                {index % 2 === 0 ? <RecentActorsIcon /> : <AssignmentIndIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  </Grid>
      <Grid item xs={12} md={10}>
      {/* <ActionBar /> */}
      <Paper sx={{borderRadius: '7px',overflow:'hidden',marginRight:'.5rem'}} elevation={12}>
        <Table />
      </Paper>
  </Grid>

    </Grid>
  )
}

export default People