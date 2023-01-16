import * as React from 'react';
import {IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchTable from './SearchTable';

const Search = styled('div')(({ theme }) => ({
    borderRadius:'10px',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: 'fit-content',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'fit-content',
},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        width: '100%',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));

export default function SearchDialog({open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            PaperProps={{sx:{borderRadius:'10px',maxWidth:'75%'}}}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Grid sx={{width:'100%'}} container>
                <Grid item md={3} sx={{borderRight:'1px solid #ddd'}} >
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
                </Grid>
                <Grid item md={9}>
                <DialogTitle id="alert-dialog-title" sx={{borderBottom:'1px solid #ddd'}} component={Stack} alignItems={'center'}>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{padding:'0'}}>
            <SearchTable />
            </DialogContent>
                </Grid>
            </Grid>
        </Dialog>
    );
}