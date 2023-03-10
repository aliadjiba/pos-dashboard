import { AppBar as MuiAppBar, Box, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Dialog from './Dialog';
import ActionsBar from './ActionsBar';
import SearchDialog from './SearchDialog';
import Header from './Header';
import Row from './Row';
import { useRef } from 'react';
import { useMemo } from 'react';
import useToggle from '../../hooks/useToggle';

const TabSettings = ({state,toggle,reference,showencols,columns,closToggle})=>(
    <Dialog doAction={()=>{}} open={state} setOpen={(state)=>toggle('columnsList',state)}>
        <Stack ref={reference} sx={{gap:'25px'}} component={FormGroup}>
        {columns.map((item)=>
            <FormControlLabel key={item.id} control={<Checkbox checked={showencols.includes(item)} inputProps={{'aria-label': 'Checkbox demo',onClick:()=>closToggle(item)}} />} label={item.headerName} />
        )}
        </Stack>
    </Dialog>
)

const InputsDialog = ({open,toggle,showencols,columns,stage,reference,saveChanges})=>(
<Dialog doAction={saveChanges} open={open} setOpen={(state)=>toggle('editDrawer',state)}>
    <Stack ref={reference} sx={{gap:'25px'}}>
    {(stage.mode==='edit'?showencols:columns).map((item)=>
    <TextField key={item.id} id={`outlined-basic-${item.id}`} label={item.headerName} variant="outlined" name={item.field} defaultValue={stage.mode==='edit'?stage.values[item.field]:''} type={item.type}/>
    )}
    </Stack>
</Dialog>
)


export default function Table({rows,columns,status}) {
    //states for drawers
    const [state,toggle] = useToggle(['editDrawer','columnsList','showRows','searchDialog']);
    //state for input
    const [input, setInput] = useState('');
    //to save data
    const data= useMemo(()=>rows?rows:[],[rows]);
    //to filter data
    const [filtredData, setFiltredData] = useState([]);
    //to keep edit item
    const [stage, setStage] = useState({mode:'create',values:{}});
    //selecting list
    const [selected, setSelect] = useState([]);
    //columns must be showen 
    const [showencols, setShowencols] = useState(columns);
    const colKeys = useMemo(()=>showencols.map(column=>column.field),[showencols]);
    //how to sort
    const [srotingField, setSrotingField] = useState({prev:null,current:'id'});
    //ref to get inputs
    const ref = useRef(null);
    
    // useEffect(() => {
    //     if (srotingField.current===srotingField.prev) {
    //         setFiltredData(prev=>(prev.reverse()));
    //     }else{
    //         setFiltredData(prev=>(prev.sort((a,b) => (a[srotingField.current] > b[srotingField.current]) ? 1 : ((b[srotingField.current] > a[srotingField.current]) ? -1 : 0))));
    //     }
    // }, [srotingField,data]);

    useEffect(() => {
        const tempfiltredData = data.filter(item=>{
            let x = false;
            columns.forEach(({field})=>{
                if((`${item[field]}`.toLowerCase()).includes(`${input}`.toLowerCase())){
                    x = true;
                    return;
                }
            })
            return x
        })
        setFiltredData(tempfiltredData);
    }, [input,data]);

    function isSelected(id) {return selected.includes(id)}
    function select(id) {if(!isSelected(id)) setSelect(prev=>[...prev,id])}
    function unselect(id) {setSelect(prev=>prev.filter(prevId=>id!=prevId))}
    function clickHandler(id) {return isSelected(id)?unselect(id):select(id)}
    function selectAll(){return data.length>0&&setSelect(data.map(row=>row.id))}
    function unSelectAll(){setSelect([])}
    function handleAllSelection(){return selected.length===data.length?unSelectAll():selectAll()}
    function deleteItems(){
        //setData(prev=>prev.filter((item=>!selected.includes(item.id))))
        setSelect([])
    }
    function setEditStage(mode){
        const id = selected[0];
        if (mode==='create') {
        setStage({mode:'create',values:{}});
        }
        else{
        setStage(selected.length==1?{mode:mode,values:data.find(item=>item.id==id)}:{mode:'create',values:{}})
        }
    }
    function saveChanges(){
        //this const is to keep new values in the inputs
        const currentValues = {};
        //get all inputs inside the reference
        const elements = ref.current.querySelectorAll('input')
        //looping with inputs
        elements.forEach(element => {
        let val = element.value
        //id must be number not string
        if (element.type==='number') {
            val = parseInt(val);
            //check if id is exist
            if (data.find(({id})=>id===val)) {
            //if id is exist put the previes id
            val = stage.values.id;
            }
        }
        currentValues[element.name] = val;
        });
        //change the states only when values change
        if (currentValues!==stage.values) {
        //temp state is for save ressorce for react 17-
        const tempData = data;
        if (stage.mode==='edit') {
            //get the index of the current item & update it
            const index = tempData.indexOf(stage.values)
            tempData[index] = currentValues;
            //update selected list if the current stage id changed
            //save new selected list
            setSelect(prev=>([...prev.filter(id=>id!==stage.values.id),currentValues.id]))
        }else{
            const index = tempData.indexOf(currentValues)
            if(index<0){
            tempData.push(currentValues);
            }
        }
        //sorting the new data
        tempData.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        //save states

        //setData(tempData);
        }
        setStage({mode:'create',values:{}});
    }
    function closToggle(currentItem){
        const index = showencols.indexOf(currentItem);
        if (showencols.length<=1&&index>=0) {
        return;
        }
        setShowencols(prev=>
        (index > -1?
            prev.filter(item=>item!==currentItem)
            :[...prev,currentItem])
            .sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)
        ));
    }
    return (
    <Box sx={{position:'relative', height: '555px', width: '100%',overflow:'auto','::-webkit-scrollbar':{width:'7px',height:'7px'},'&::-webkit-scrollbar-thumb':{background:'#ccc',borderRadius:'5px'},'::-webkit-scrollbar-track':{background:'#eee',borderRadius:'5px'}}}>
        <MuiAppBar position="sticky">

        <ActionsBar input={input} setInput={setInput} show={state} selectedLength={selected.length} deleteItems={deleteItems} toggle={toggle} setEditStage={setEditStage} />

        <Header setSrotingField={setSrotingField} selectedLength={selected.length} dataLength={data.length} columns={showencols} handleAllSelection={handleAllSelection} />
        </MuiAppBar>
        {/* ((!show)?data:data.filter(({id})=>selected.includes(id))) */}
        {/* ((!show)?filtredData:filtredData.filter(({id})=>selected.includes(id))) */}
        {status=='loading'?"Loading":filtredData.map((row)=>(<Row key={row.id} clickHandler={clickHandler} isSelected={isSelected} colKeys={colKeys} row={row} />))}

        {state['editDrawer']&&<InputsDialog open={state['editDrawer']} saveChanges={saveChanges} toggle={toggle} reference={ref} showencols={showencols} columns={columns} stage={stage} />}

        {state['columnsList']&&<TabSettings state={state['columnsList']} toggle={toggle} reference={ref} showencols={showencols} columns={columns} closToggle={closToggle} />}
        <SearchDialog open={state['searchDialog']} setOpen={(state)=>toggle('editDrawer',state)} />
    </Box>
    )
}