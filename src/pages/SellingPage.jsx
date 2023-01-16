import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import { ProductsTable as Table } from '../components';
import Grid from '@mui/material/Grid';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { get_person, get_persons } from '../api';
import { useQuery } from '@tanstack/react-query';
const columns = [
  { id:1, field: 'id', headerName: 'id', width: 150,type:'number' },
  { id:2, field: 'first_name', headerName: 'First Name', width: 150,type:'text' },
  { id:3, field: 'last_name', headerName: 'Last Name', width: 150,type:'text' },
  { id:4, field: 'gender', headerName: 'Gender', width: 150,type:'text' },
  { id:5, field: 'email', headerName: 'Email', width: 150,type:'text' },
  // { field: 'ip_address', headerName: 'IP Address', width: 150 },
];

function SellingPage() {
  const {status,data:persons} = useQuery({queryKey:["persons"],queryFn:get_persons});
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
      <Paper sx={{borderRadius: '7px',overflow:'hidden',marginRight:'.5rem'}} elevation={12}>
        <Table status={status} rows={persons} columns={columns} />
      </Paper>
  </Grid>
    </Grid>
  )
}

export default SellingPage