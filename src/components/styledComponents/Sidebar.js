
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const SidebarHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const Sidebar = styled(Drawer)(
    () => ({
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      '& .MuiDrawer-paper': {
        border:"none",
        boxShadow:'0px 8px 10px -5px rgb(0 0 0 / 18%), 0px 16px 24px 2px rgb(0 0 0 / 2%), 0px 6px 30px 5px rgb(0 0 0 / 6%)',
      }
    }),
  );

  export {Sidebar,SidebarHeader}