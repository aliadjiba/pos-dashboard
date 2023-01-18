import { useState } from 'react';
const toObjectKeys=(array)=>{
    let obj = {};
    array.forEach(element => {
        obj={...obj,[element]:false}
    });
    return obj
}
export default function useToggle(items) {
    const [states, setStates] = useState(toObjectKeys(items));
    // console.log(states)
    function toggle(item,state) {
        if (state===undefined) {
            setStates(prev=>({...prev,[item]:!prev[item]}));
        }else{
            setStates(prev=>({...prev,[item]:state}));
        }
    }
    return [states,toggle]
}