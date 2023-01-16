import {  Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


export default ({row,clickHandler,isSelected,colKeys})=>(
    <Stack flexDirection={'row'} alignItems="center" sx={{borderBottom:'1px solid #eee',padding:'.5rem .5rem .5rem .75rem', ':hover':{background:'#eee'},transition:'.3s',backgroundColor:isSelected(row.id)?'#c8e6c9':'#fff'}}>
      <Checkbox checked={isSelected(row.id)} inputProps={{'aria-label': 'Checkbox demo',onClick:()=>clickHandler(row.id)}} />
      {colKeys.map((col,index)=><div key={index} style={{width:col==='id'?'50px':'150px'}}>{row[col]}</div>)}
    </Stack>
  )