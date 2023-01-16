import { IconButton, Stack, Toolbar } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearshBox from './SearshBox';

// const rowOptions={
//   showDetailsPerEach:false,
//   checkBox:false,
//   colorContrast:true,
//   ContrastBg:'#ddd',
//   hoverBg:'#efe',
//   create:false,
//   update:false,
//   delete:false,
//   search:false
// }
// console.log(render)
export default ({selectedLength,deleteItems,setEditStage,input, setInput,toggle,rowOptions})=>{
  const render = rowOptions.create || rowOptions.delete || rowOptions.update || rowOptions.search;

  const handleClickOpen = (mode) => {
    if (mode) {
      setEditStage(mode)
      toggle('editDrawer',true);
    }else{
      toggle('columnsList',true);
    }
  };
  const handleCheck = ()=>{
    toggle('showRows');
  }
  return(
  render&&<Stack flexDirection={'row'} alignItems="center"  sx={{borderBottom:'1px solid #eee',padding:'1rem',backgroundColor:'#fff'}} component={Toolbar}>
    {rowOptions.create&&<IconButton aria-label="add" onClick={()=>handleClickOpen('create')} >
      <AddCircleOutlineIcon />
    </IconButton>}
    {rowOptions.update&&<IconButton aria-label="edit" disabled={selectedLength!==1} onClick={()=>handleClickOpen('edit')} >
      <ModeEditIcon />
    </IconButton>}
    {rowOptions.delete&&<IconButton aria-label="delete" disabled={selectedLength<1} onClick={deleteItems}>
      <DeleteIcon />
    </IconButton>}
    <IconButton aria-label="setting" onClick={()=>handleClickOpen()} >
      <SettingsIcon />
    </IconButton>
    <Checkbox inputProps={{'aria-label': 'Checkbox demo',onClick:handleCheck}} checkedIcon={<VisibilityOffIcon />} icon={<RemoveRedEyeIcon />}/>
    {rowOptions.search&&<SearshBox input={input} setInput={setInput} />}
  </Stack>
)}