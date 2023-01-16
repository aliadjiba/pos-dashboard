import { Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


export default ({columns,handleAllSelection,selectedLength,dataLength,setSrotingField})=>{
  const handleSort = (field)=>{
    setSrotingField(state=>({prev:state.current,current:field}))
  }
  return(
    <Stack flexDirection={'row'} alignItems="center"  sx={{borderBottom:'1px solid #eee',padding:'.25rem .5rem .25rem .75rem',backgroundColor:'#eee',color:'#212121',marginTop:'0rem'}}>
      <Checkbox checked={dataLength>0&&dataLength===selectedLength} inputProps={{'aria-label': 'Checkbox demo',onClick:handleAllSelection}} />
      {columns.map((col)=>(<span key={col.id} onClick={()=>handleSort(col.field)} style={{width:col.field==='id'?'50px':'150px'}}>{col['headerName']}</span>))}
    </Stack>
  )}