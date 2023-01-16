import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import { ProductsTable as Table } from '../components';
import Grid from '@mui/material/Grid';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function SellingPage() {
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
        <Table />
      </Paper>
  </Grid>
    </Grid>
  )
}

export default SellingPage