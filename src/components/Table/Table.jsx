import { AppBar as MuiAppBar, Box, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Dialog from './Dialog';
import ActionsBar from './ActionsBar';
import Header from './Header';
import Row from './Row';
import { useRef } from 'react';
import rows from '../../assets/MOCK_DATA.json';

// const toObjectKeys=(array)=>{
//     let obj = {};
//     array.forEach(element => {
//         obj={...obj,[element]:''}
//     });
//     return obj
// }
//const colKeys = columns.map(column=>column.field)
//

const columns = [
    { id:1, field: 'id', headerName: 'id', width: 150,type:'number' },
    { id:2, field: 'first_name', headerName: 'First Name', width: 150,type:'text' },
    { id:3, field: 'last_name', headerName: 'Last Name', width: 150,type:'text' },
    { id:4, field: 'gender', headerName: 'Gender', width: 150,type:'text' },
    { id:5, field: 'email', headerName: 'Email', width: 150,type:'text' },
    // { field: 'ip_address', headerName: 'IP Address', width: 150 },
];

const ColsDialog = ({openCols,setOpenCols,reference,showencols,columns,closToggle})=>(<Dialog doAction={()=>{}} open={openCols} setOpen={setOpenCols}>
<Stack ref={reference} sx={{gap:'25px'}} component={FormGroup}>
{columns.map((item)=>
    <FormControlLabel key={item.id} control={<Checkbox checked={showencols.includes(item)} inputProps={{'aria-label': 'Checkbox demo',onClick:()=>closToggle(item)}} />} label={item.headerName} />
)}
</Stack>
</Dialog>)

const InputsDialog = ({open,setOpen,showencols,columns,stage,reference,saveChanges})=>(<Dialog doAction={saveChanges} open={open} setOpen={setOpen}>
    <Stack ref={reference} sx={{gap:'25px'}}>
    {(stage.mode==='edit'?showencols:columns).map((item)=>
    <TextField key={item.id} id={`outlined-basic-${item.id}`} label={item.headerName} variant="outlined" name={item.field} defaultValue={stage.mode==='edit'?stage.values[item.field]:''} type={item.type}/>
    )}
    </Stack>
</Dialog>)


export default function Table() {
    const [input, setInput] = useState('');
    const [open, setOpen] = useState(false);
    const [openCols, setOpenCols] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(rows);
    const [filtredData, setFiltredData] = useState(rows);
    const [stage, setStage] = useState({mode:'create',values:{}});
    const [selected, setSelect] = useState([]);
    const [showencols, setShowencols] = useState(columns);
    const [colKeys, setColKeys] = useState(showencols.map(column=>column.field));
    const [srotingField, setSrotingField] = useState({prev:null,current:'id'});
    const forceUpdate = React.useCallback(() => {
        const tempData = filtredData;
        if (srotingField.current===srotingField.prev) {
            // console.log(srotingField.current,srotingField.prev)
            setFiltredData(tempData.reverse());
        }else{
            // console.log(srotingField.current,srotingField.prev)
            tempData.sort((a,b) => (a[srotingField.current] > b[srotingField.current]) ? 1 : ((b[srotingField.current] > a[srotingField.current]) ? -1 : 0));
            setFiltredData(tempData);
        }
    }, [srotingField,filtredData,data]);
    const ref = useRef(null);
    useEffect(()=>{
        forceUpdate()
    }, [srotingField,filtredData]);

    useEffect(() => {
        setColKeys(showencols.map(column=>column.field));
    }, [showencols]);
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
    }, [input]);

    // useEffect(() => {
    //     console.log(filtredData);
    // }, [srotingField,filtredData]);

    // useEffect(() => {
    //     if (srotingField.current===srotingField.prev) {
    //         setFiltredData(prev=>(prev.reverse()));
    //     }else{
    //         setFiltredData(prev=>(prev.sort((a,b) => (a[srotingField.current] > b[srotingField.current]) ? 1 : ((b[srotingField.current] > a[srotingField.current]) ? -1 : 0))));
    //     }
    // }, [srotingField]);

    const isSelected = (id)=>selected.includes(id);
    const select = (id)=>{
        if (!isSelected(id)) {
        setSelect(prev=>[...prev,id]);
        }
    }
    const unselect = (id)=>{
        setSelect(prev=>prev.filter(prevId=>id!=prevId));
    }
    const clickHandler = (id)=>{
        console.log(ref.current)
        if (isSelected(id)) {
        unselect(id)
        }else{
        select(id)
        }
    }
    const selectAll = ()=>data.length>0&&setSelect(data.map(row=>row.id));
    const unSelectAll = ()=>setSelect([]);
    const handleAllSelection = ()=>selected.length===data.length?unSelectAll():selectAll();
    const deleteItems = ()=>{
        setData(prev=>prev.filter((item=>!selected.includes(item.id))))
        setSelect([])
    }
    const setEditStage = (mode)=>{
        const id = selected[0];
        if (mode==='create') {
        setStage({mode:'create',values:{}});
        }
        else{
        setStage(selected.length==1?{mode:mode,values:data.find(item=>item.id==id)}:{mode:'create',values:{}})
        }
    }
    const saveChanges = ()=>{
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
        setData(tempData);
        }
        setStage({mode:'create',values:{}});
    }
    const closToggle = (currentItem)=>{
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
        <ActionsBar input={input} setInput={setInput} show={show} setShow={setShow} selectedLength={selected.length} deleteItems={deleteItems} setOpen={setOpen} setEditStage={setEditStage} setOpenCols={setOpenCols} />
        <Header setSrotingField={setSrotingField} selectedLength={selected.length} dataLength={data.length} columns={showencols} handleAllSelection={handleAllSelection} />
        </MuiAppBar>
        {/* ((!show)?data:data.filter(({id})=>selected.includes(id))) */}
        {/* ((!show)?filtredData:filtredData.filter(({id})=>selected.includes(id))) */}
        {filtredData.map((row)=>(<Row key={row.id} clickHandler={clickHandler} isSelected={isSelected} colKeys={colKeys} row={row} />))}

        {open&&<InputsDialog open={open} saveChanges={saveChanges} setOpen={setOpen} reference={ref} showencols={showencols} columns={columns} stage={stage} />}

        {openCols&&<ColsDialog openCols={openCols} setOpenCols={setOpenCols} reference={ref} showencols={showencols} columns={columns} closToggle={closToggle} />}

    </Box>
    )
}