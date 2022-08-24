import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const BasicTable=(props) => {

  return (
    <TableContainer  >
      <Table  aria-label="simple table">
        <TableHead className="bg-secondary   text-light position-sticky top-0">
          <TableRow className="text-light">
            <TableCell className="text-light">Page Name</TableCell>
            <TableCell className="text-light">Application Name</TableCell>
            <TableCell className="text-light">Parent Page</TableCell>
            <TableCell align="center" className="text-light">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rowsData?.map((row,i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.pageName}
              </TableCell>
              <TableCell>{row.app.name}</TableCell>
              <TableCell>{row.parent?.pageKey}</TableCell>
              <TableCell align="center">
                <EditIcon
                  onClick={() => {
                    props.editRow(row._id);
                  }}
                />

                <DeleteIcon
                  onClick={() => {
                    props.deleteRow(row._id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
