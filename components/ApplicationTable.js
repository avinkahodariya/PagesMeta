import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function ApplicationTable(props) {
  return (
    <TableContainer style={{ maxHeight: "370px", overflow: "scroll" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-secondary   text-light position-sticky top-0">
          <TableRow className="text-light">
            <TableCell className="text-light">Application Name</TableCell>
            <TableCell className="text-light">Active</TableCell>
            <TableCell className="text-light">Created Date</TableCell>
            <TableCell className="text-light" align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rowsData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.isActive ? "Active" : "Not Active"}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell align="right">
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
