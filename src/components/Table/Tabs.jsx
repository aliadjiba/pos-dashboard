import { Tab, Tabs as MuiTabs, alpha } from '@mui/material';
import React from 'react';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';

const TabNumber  = styled('span')(({active,theme})=>{
    return{
        padding:'.15rem .25rem',
        background:active?alpha(theme.palette.primary.main,.1):grey[200],
        margin:'.2rem',
        borderRadius:'5px'
    }
})


export default function Tabs({data,value,handleChange}){
    return(
        <MuiTabs value={value} onChange={handleChange} sx={{background:'#fff',borderBottom:'1px solid #ccc','.MuiButtonBase-root':{textTransform: 'capitalize',minHeight: 'fit-content'}}}>

        {data?.map((item)=><Tab key={item.label} label={item.label} value={item.value} icon={<TabNumber active={item.value===value}>{item.data}</TabNumber>} iconPosition="end" />)}
        </MuiTabs>)
}
