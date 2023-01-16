import {  Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
const rowOptions={
  showDetailsPerEach:false,
  checkBox:false,
  colorContrast:false,
}
const vax=`backgroundColor:isSelected(row.id)?'#c8e6c9':(options.colorContrast?(index%2===1?'#eee':'#fff'):'#fff')`;

export default ({row,options,clickHandler,isSelected,colKeys,index})=>{
  const style={
    borderBottom:'1px solid #eee',
    padding:'.5rem .5rem .5rem .75rem',
    ':hover':{background:options.hoverBg},
    transition:'.3s',
    backgroundColor:isSelected(row.id)?'#c8e6c9':(options.colorContrast?(index%2===1?options.ContrastBg:'#fff'):'#fff'),
    cursor:options.showDetailsPerEach?'pointer':'auto'
  }
  return(
    <Stack flexDirection={'row'} alignItems="center" sx={{...style}}>


      {options.checkBox&&<Checkbox checked={isSelected(row.id)} inputProps={{'aria-label': 'Checkbox demo',onClick:()=>clickHandler(row.id)}} />}

      {colKeys.map((col,index)=><div key={index} style={{width:col==='id'?'50px':'150px',paddingLeft:col==='id'?'10px':'0'}}>{row[col]}</div>)}
    </Stack>
  )
}