import { AppBar, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ActionsBar from './ActionsBar';
import { useRef } from 'react';
import { useMemo } from 'react';
import useToggle from '../../hooks/useToggle';
import TableContent from './TableContent';
import { grey } from '@mui/material/colors';
import Tabs from './Tabs';
import SearshBox from './SearshBox';
import TableSettings from './TableSetting';
// import CreateDialog from './CreateDialog';

const rowOptions={
    showDetailsPerEach:false,
    checkBox:false,
    colorContrast:true,
    ContrastBg:grey[100],
    hoverBg:grey[200],
    create:false,
    update:false,
    delete:false,
    search:true
}

export default function Table({rows,columns,status,tabs,children}) {
    //states for drawers
    const [state,toggle] = useToggle(['editDrawer','columnsList','showRows']);
    //state for input
    const [input, setInput] = useState('');
    const [value, setValue] = useState('1');
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
    function handleChange(event, newValue){
        setValue(newValue)
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
    <Box sx={{position:'relative', height: '555px', width: '100%'}}>
        
        <AppBar position="static" sx={{boxShadow:'none'}}>
        
            <Tabs value={value} data={tabs} handleChange={handleChange} />
            {children}
        </AppBar>

        <TableContent {...{rowOptions,setSrotingField,selectedLength:selected.length,dataLength:data.length,showencols,handleAllSelection,status,clickHandler,isSelected,colKeys,data:filtredData }} />

        {/* <InputsDialog open={state['editDrawer']} saveChanges={saveChanges} toggle={toggle} reference={ref} showencols={showencols} columns={columns} stage={stage} /> */}

        <TableSettings state={state['columnsList']} toggle={toggle} reference={ref} showencols={showencols} columns={columns} closToggle={closToggle} />

    </Box>
    )
}