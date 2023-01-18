import { Chip, List, ListItem, ListItemButton, ListItemText, Paper, styled } from '@mui/material'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FilterIcon from '@mui/icons-material/FilterAlt';
import { Table } from '../components';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { get_persons } from '../api';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Stack, Toolbar } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { blue,grey } from '@mui/material/colors';
import PrinterIcon from '@mui/icons-material/LocalPrintshopRounded';
import ActionsBar from '../components/Table/ActionsBar';
import { useState } from 'react';
import SearshBox from '../components/Table/SearshBox';

const rowOptions={
  showDetailsPerEach:false,
  checkBox:false,
  colorContrast:true,
  ContrastBg:grey[100],
  hoverBg:grey[200],
  create:false,
  update:false,
  delete:false,
  search:true
}

const columns = [
    { id:1, field: 'id', headerName: 'id', width: 150,type:'number' },
    { id:2, field: 'first_name', headerName: 'First Name', width: 150,type:'text' },
    { id:3, field: 'last_name', headerName: 'Last Name', width: 150,type:'text' },
    { id:4, field: 'gender', headerName: 'Gender', width: 150,type:'text' },
    { id:5, field: 'email', headerName: 'Email', width: 150,type:'text' },
];
// const tabs = [
//   {
//       label:'all',
//       value:'1',
//   },
//   {
//       label:'paid',
//       value:'2',
//   },
//   {
//       label:'unpaid',
//       value:'3',
//   },
//   {
//       label:'archived',
//       value:'4',
//   },
// ]
const tabs = [
  {
      label:'all',
      value:'1',
      data:23,
  },
  {
      label:'clients',
      value:'2',
      data:18,

  },
  {
      label:'dispensers',
      value:'3',
      data:5,

  }
]
const actions =[
  {
    name:'create',
    lable :'New',
    function:()=>{},
    icon:<AddCircleOutlineIcon />,
  },
  // {
  //   name:'update',
  //   lable :'Edit',
  //   function:()=>{},
  //   icon:<ModeEditIcon />,
  // },
  {
    name:'delete',
    lable :'Delete',
    function:()=>{},
    icon:<DeleteIcon />,
  },
  {
    name:'print',
    lable :'Print',
    function:()=>{},
    icon:<PrinterIcon />,
  },

]
const Container = styled(({ children,...props }) => (
  <Grid container {...props}>{children}</Grid>
  ))(({ theme }) =>({
    width: '99%',
    height:'100%',
    border:theme.styles.border.main,
    borderRadius:theme.styles.border.radius,
    overflow:'hidden'
  })
);
const Item = styled(({ children,paperProps,...props }) => (
  <Grid item {...props}>
    <Paper elevation={0} sx={{height: '100%', marginRight: 'auto', width: '100%',borderRight:'1px solid #ccc',borderRadius:0,...paperProps}}>
      {children}
    </Paper>
  </Grid>
  ))(({ padding:'0' })
);
const ActionSection = ({actions})=>(
  actions.map(item=>
    <Chip variant="outlined" key={item.name} label={item.lable} onClick={item.function} icon={item.icon} />
  )
)

function People() {
  const [input, setInput] = useState('');
  const {status,data:persons} = useQuery({queryKey:["persons"],queryFn:get_persons});
  return (
    <Container>
      <Item xs={12} md={2}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItemButton sx={(theme) =>({borderBottom:theme.styles.border.main})}>
        <ListItemAvatar>
          <Avatar>
            <FilterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Touggert" secondary="Wilaya" />
      </ListItemButton>
      <ListItemButton sx={(theme) =>({borderBottom:theme.styles.border.main})}>
        <ListItemAvatar>
          <Avatar>
            <FilterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Ahemd" secondary="Name" />
      </ListItemButton>
      <ListItemButton sx={(theme) =>({borderBottom:theme.styles.border.main})}>
        <ListItemAvatar>
          <Avatar>
            <FilterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Capital" secondary="Company" />
      </ListItemButton>
    </List>
    <div style={{display:'flex'}}>
    <Chip sx={{margin:'auto'}} variant="outlined" label={'New Filter'} onClick={()=>{}} icon={<AddIcon />} />
    </div>
      </Item>
      <Item xs={12} md={10}>
        <Table status={status} tabs={tabs} rows={persons} columns={columns}>

        <ActionsBar rowOptions={rowOptions}  searshComponents={<SearshBox input={input} setInput={setInput} />}>
        <ActionSection actions={actions} />
            </ActionsBar>
        </Table>
      </Item>
    </Container>
  )
}

export default People