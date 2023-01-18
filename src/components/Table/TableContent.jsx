import React from 'react'
import Header from './Header'
import { AppBar, Box } from '@mui/material'
import Row from './Row'

function TableContent({
    rowOptions,setSrotingField,selectedLength,
    dataLength,showencols,handleAllSelection,status,
    clickHandler,isSelected,colKeys,data
    }) {
    return (
        <Box sx={{position:'relative', height: '100%',overflowY:'auto','::-webkit-scrollbar':{width:'7px',height:'7px'},'&::-webkit-scrollbar-thumb':{background:'#ccc',borderRadius:'5px'},'::-webkit-scrollbar-track':{background:'#eee',borderRadius:'5px'}}}>
            <Header rowOptions={rowOptions} setSrotingField={setSrotingField} selectedLength={selectedLength} dataLength={dataLength} columns={showencols} handleAllSelection={handleAllSelection} />
            {/* ((!show)?data:data.filter(({id})=>selected.includes(id))) */}
            {/* ((!show)?filtredData:filtredData.filter(({id})=>selected.includes(id))) */}
            {status=='loading'?"Loading":data.map((row,index)=>(<Row key={row.id} index={index} options={rowOptions} clickHandler={clickHandler} isSelected={isSelected} colKeys={colKeys} row={row} />))}
        </Box>
    )
}

export default TableContent