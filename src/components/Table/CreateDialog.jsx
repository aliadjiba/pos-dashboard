import { Stack, TextField } from '@mui/material';
import React from 'react';
import Dialog from './Dialog';


export default function InputsDialog ({state,toggle,showencols,columns,stage,reference,saveChanges}){ return(
    state&&<Dialog doAction={saveChanges} open={state} setOpen={(state)=>toggle('editDrawer',state)}>
    <Stack ref={reference} sx={{gap:'25px'}}>
    {(stage.mode==='edit'?showencols:columns).map((item)=>
    <TextField key={item.id} id={`outlined-basic-${item.id}`} label={item.headerName} variant="outlined" name={item.field} defaultValue={stage.mode==='edit'?stage.values[item.field]:''} type={item.type}/>
    )}
    </Stack>
</Dialog>
)}
