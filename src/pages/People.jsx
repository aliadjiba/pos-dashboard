import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import React, { useState } from 'react'
import { ActionsBar as PortalActionBar,Table } from '../components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Grid from '@mui/material/Grid';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useQuery } from '@tanstack/react-query';
import { get_persons } from '../api';

const columns = [
    { id:1, field: 'id', headerName: 'id', width: 150,type:'number' },
    { id:2, field: 'first_name', headerName: 'First Name', width: 150,type:'text' },
    { id:3, field: 'last_name', headerName: 'Last Name', width: 150,type:'text' },
    { id:4, field: 'gender', headerName: 'Gender', width: 150,type:'text' },
    { id:5, field: 'email', headerName: 'Email', width: 150,type:'text' },
    // { field: 'ip_address', headerName: 'IP Address', width: 150 },
];
// const checkList = [
//   {name:'all',value:'1'},
//   {name:'Employees',value:'2'},
//   {name:'clients',value:'3'},
// ];
// const ActionBar = ({state,setSlector})=>(<PortalActionBar>
//   {/* {checkList.map((e,index)=>(
//     <Button key={index} variant={e.value===state?'outlined':'text'} sx={{p:'5px 7px',border:'1px solid #fff0',transition:'all .3s',borderColor:e.value===state?'#999':'#fff0'}} onClick={()=>setSlector(e.value)}>{e.name}</Button>
//   ))}  */}
//   <h3>People</h3>
// <IconButton aria-label="add to shopping cart">
//   <AddCircleOutlineIcon />
// </IconButton>
// </PortalActionBar>)
function People() {
  const id=3;
  const {status,data:persons} = useQuery({queryKey:["persons"],queryFn:get_persons});
  // const {data:person} = useQuery({queryKey:["person",3],queryFn:()=>get_person(id)});
  // const [state, setstate] = useState('1');
  // const setSlector = (state)=>{
  //   setstate(state);
  // }
  return (
    <Grid sx={{height:'100%',border:'1px solid #ccc',borderRadius:'7px',overflow:'hidden'}} container>
    <Grid item xs={12} md={2} sx={{padding:'0'}}>
    <Paper elevation={0} sx={{  borderRadius: '7px', height: '100%', marginRight: 'auto', width: '100%', padding:'1rem',borderRight:'1px solid #ccc',borderRadius:0}}>
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
      <Paper elevation={0} sx={{borderRadius: '0',overflow:'hidden',marginRight:'.5rem'}}>
      <Table status={status} rows={persons} columns={columns} />
      </Paper>
  </Grid>
    </Grid>
  )
}

export default People