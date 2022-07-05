import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export function BasicTable(props) {
  return (
    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-secondary   text-light'>
          <TableRow className='text-light'>
            <TableCell  className='text-light'>Page Name</TableCell>
            <TableCell  className='text-light'>Application Name</TableCell>
            <TableCell   className='text-light'>Parent Page</TableCell>
            <TableCell  align='center' className='text-light'>Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.rowsData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.pageName}
              </TableCell>
              <TableCell >{row.applicationName}</TableCell>
              <TableCell >{row.parentPage}</TableCell>
              <TableCell align='center'><EditIcon onClick={()=>{
               props.editRow(row.id)
              }}/>  
              
              <DeleteIcon onClick={()=>{
              props.deleteRow(row.id)

              }}/></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
