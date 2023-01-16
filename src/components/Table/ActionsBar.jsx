import { IconButton, Stack, Toolbar } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearshBox from './SearshBox';

export default ({selectedLength,deleteItems,setOpen,setEditStage,setOpenCols,setShow,input, setInput})=>{
    const handleClickOpen = (mode) => {
      if (mode) {
        setEditStage(mode)
        setOpen(true);
      }else{
        setOpenCols(true)
      }
    };
    const handleCheck = ()=>{
      setShow(prev=>!prev)
    }
    return(
    <Stack flexDirection={'row'} alignItems="center"  sx={{borderBottom:'1px solid #eee',padding:'1rem',backgroundColor:'#fff'}} component={Toolbar}>
      <IconButton aria-label="add" onClick={()=>handleClickOpen('create')} >
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton aria-label="edit" disabled={selectedLength!==1} onClick={()=>handleClickOpen('edit')} >
        <ModeEditIcon />
      </IconButton>
      <IconButton aria-label="delete" disabled={selectedLength<1} onClick={deleteItems}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="setting" onClick={()=>handleClickOpen()} >
        <SettingsIcon />
      </IconButton>
      <Checkbox inputProps={{'aria-label': 'Checkbox demo',onClick:handleCheck}} checkedIcon={<VisibilityOffIcon />} icon={<RemoveRedEyeIcon />}/>
      <SearshBox input={input} setInput={setInput} />
    </Stack>
  )}