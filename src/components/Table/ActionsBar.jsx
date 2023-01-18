import { IconButton, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from '@emotion/styled';

const Container = styled((props)=><Stack direction={'row'} alignItems="center" justifyContent={'space-between'} {...props}  />)(({theme})=>({
  borderBottom:theme.styles.border.main,
  padding: '.25rem 1rem',
  backgroundColor:'#fff'
}))

export default ({rowOptions,children,searsh})=>{
  const render = rowOptions.create || rowOptions.delete || rowOptions.update || rowOptions.search;

  // const handleClickOpen = (mode) => {
  //   if (mode) {
  //     setEditStage(mode)
  //     toggle('editDrawer',true);
  //   }else{
  //     toggle('columnsList',true);
  //   }
  // };
  return(
  render&&<Container>
    <Stack direction={'row'} spacing={1} alignItems="center">
    {children}
    </Stack>
    <Stack direction={'row'}  spacing={1} alignItems="center">
    {searsh}
    <IconButton aria-label="setting" onClick={()=>{}} >
      <SettingsIcon />
    </IconButton>
    </Stack>
  </Container>
)}