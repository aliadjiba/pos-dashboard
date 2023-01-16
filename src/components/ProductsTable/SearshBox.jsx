import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonBase } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    color:'#323232',
    position: 'relative',
    transition:'.3s',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.10),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
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
    color: '#323232',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        cursor:'pointer',
        '&:disabled':{
            color: 'black'
        }
        },
    },
}));

export default ({setOpen})=>{

    return(
    <ButtonBase onClick={setOpen}> <Search>
    <SearchIconWrapper>
    <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
    placeholder="Search…"
    disabled
    />
</Search></ButtonBase>
        );
}

