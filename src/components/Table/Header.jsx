import { AppBar, Stack, alpha, styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { blue,grey } from '@mui/material/colors';

const Container= styled(Stack)(({theme})=>({
  borderBottom:`1px solid ${grey[300]}`,
  padding:'.75rem 1rem',
  backgroundColor:alpha(theme.palette.primary.main,0.08),
  color:'#212121',
  marginTop:'0rem',
  alignItems:'center'
}))
const Header= ({children})=>(
  <AppBar position="sticky">
    <Container direction={'row'}>
    {children}
    </Container>
  </AppBar>
)

export default ({rowOptions,columns,handleAllSelection,selectedLength,dataLength,setSrotingField})=>{
  const handleSort = (field)=>{
    setSrotingField(state=>({prev:state.current,current:field}))
  }
  return(
    <Header>
      {rowOptions.checkBox&&<Checkbox checked={dataLength>0&&dataLength===selectedLength} inputProps={{'aria-label': 'Checkbox demo',onClick:handleAllSelection}} />}
      {columns.map((col)=>(<span key={col.id} onClick={()=>handleSort(col.field)} style={{width:col.field==='id'?'50px':'150px'}}>{col['headerName']}</span>))}
    </Header>
  )}