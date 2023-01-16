import { Button } from '@mui/material'
import React, { useState } from 'react'
import { ActionsBar as PortalActionBar } from '../components';

const checkList = [
  {name:'all Charts',value:'1'},
  {name:'Employees Charts',value:'2'},
  {name:'clients Charts',value:'3'},
];
const ActionBar = ({state,setSlector})=>(<PortalActionBar>
  {checkList.map((e,index)=>(
    <Button key={index} variant={e.value===state?'outlined':'text'} sx={{p:'5px 7px',border:'1px solid #fff0',transition:'all .3s',borderColor:e.value===state?'#999':'#fff0'}} onClick={()=>setSlector(e.value)}>{e.name}</Button>
  ))} 
</PortalActionBar>)
function Charts() {
  const [state, setstate] = useState('1');
  const setSlector = (state)=>{
    setstate(state);
  }
  return (
    <ActionBar setSlector={setSlector} state={state} />
  )
}

export default Charts