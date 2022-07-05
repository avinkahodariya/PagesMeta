import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "../pages/Model";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function TagsTable(props) {
  const [rows, setrows] = useState([]);
  const [editObj, seteditObj] = useState({});
  const [model, setModel] = useState(false);

  useEffect(() => {
    console.log("props.add", props.add);
    props.add && setModel(true);
    props.add && seteditObj({});
  }, [props.add]);

  function createData(name, value, id) {
    return { name, value, id };
  }

  const rowsData = [
    createData("Frozen yoghurt", 159, 0),
    createData("Ice cream sandwich", 159, 1),
    createData("Eclair", 262, 2),
    createData("Cupcake", 305, 3),
    createData("Gingerbread", 21, 4),
  ];
  useEffect(() => {
    setrows(rowsData);
  }, []);

  const editRow = (id) => {
    rows.map((d) => {
      if (d.id == id) {
        seteditObj({ ...d });
      }
    });
    setModel(true);
  };

  const handleChange = (e) => {
    let obj = { ...editObj };
    obj[e.target.name] = e.target.value;
    seteditObj(obj);
  };

  const save = (id) => {
    if (!id) {
      rows.push({ ...editObj, id: rows.length });
    } else {
      let index = rows.findIndex((data) => data.id == id);
      if (index > 0) {
        rows[index] = { ...editObj };
      }
      setrows(rows);
      setModel(false);
    }
  };

  const deleteRow = (id) => {
    let newRow = rows.filter((d) => d.id !== id);
    setrows(newRow);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-dark border ">
          <TableRow>
            <TableCell className="text-white">Name</TableCell>
            <TableCell className="text-white">Value</TableCell>
            <TableCell className="text-white" align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="border">
          {rows?.map((row) => (
            <TableRow
              key={row.name}
              className="border"
              //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className="border" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className="border" component="th" scope="row">
                {row.value}
              </TableCell>
              <TableCell className="border" align="right">
                <EditIcon
                  onClick={() => {
                    editRow(row.id);
                  }}
                />

                <DeleteIcon
                  onClick={() => {
                    deleteRow(row.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BasicModal
        open={model}
        onClose={() => {
          setModel();
          props.setAdd(false);
        }}
      >
        <div className="bg-dark text-white p-2 my-3">
          {" "}
          {props.add ? "Add Tags" : "Edit Tags"}
        </div>
        <div>Name</div>
        <TextField
          aria-label="empty textarea"
          className="my-2 w-100"
          variant="standard"
          value={editObj.name}
          name="name"
          onChange={handleChange}
        />
        <div>Value</div>
        <TextField
          aria-label="empty textarea"
          className="my-2 w-100"
          variant="standard"
          value={editObj.value}
          name="value"
          onChange={handleChange}
        />
        <div className="w-100 d-flex justify-content-end mt-2">
          <Button
            variant="contained"
            className="w-25 mx-2   rounded-0 "
            onClick={() => {
              save(editObj.id);
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            className="w-25 bg-danger rounded-0"
            onClick={() => {
              setModel(false);
              props.setAdd(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </BasicModal>
    </TableContainer>
  );
}
