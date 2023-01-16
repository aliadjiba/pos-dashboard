import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';

const navs = [
    {
    name:'dashboard',
    path:'dashboard',
    icon:<GridViewRoundedIcon />,
    },
    {
    name:'charts',
    path:'charts',
    icon:<EqualizerRoundedIcon />
    },
    {
    name:'tasks',
    path:'tasks',
    icon:<TaskAltRoundedIcon />
    },
    {
    name:'products',
    path:'selling',
    icon:<InboxRoundedIcon />
    },
    {
    name:'persons',
    path:'people',
    icon:<PeopleOutlineRoundedIcon />
    },
    {
    name:'calendar',
    path:'calendar',
    icon:<CalendarTodayRoundedIcon />
    },
];
export default navs;