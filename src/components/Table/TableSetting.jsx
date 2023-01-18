import { FormControlLabel, FormGroup, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Dialog from './Dialog';

export default function TableSettings ({state,toggle,reference,showencols,columns,closToggle}) {return(
    state&&<Dialog doAction={()=>{}} open={state} setOpen={(state)=>toggle('columnsList',state)}>
        <Stack ref={reference} sx={{gap:'25px'}} component={FormGroup}>
        {columns.map((item)=>
            <FormControlLabel key={item.id} control={<Checkbox checked={showencols.includes(item)} inputProps={{'aria-label': 'Checkbox demo',onClick:()=>closToggle(item)}} />} label={item.headerName} />
        )}
        </Stack>
    </Dialog>
)}