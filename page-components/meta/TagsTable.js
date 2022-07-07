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
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { BasicModal } from "../../components";
export  function TagsTable(props) {
  const [tagsData, setTagsData] = useState([]);
  const [tagRowObj, setTagRowObj] = useState({});
  const [model, setModel] = useState(false);

  useEffect(() => {
    props.add && setModel(true);
    props.add && setTagRowObj({});
  }, [props.add]);

  function createData(name, value, _id) {
    return { name, value, _id };
  }

  useEffect(() => {}, [props.meta]);

  useEffect(() => {
    setTagsData(props.meta);
  }, [props.meta]);

  const editRow = (_id) => {
    tagsData.map((d) => {
      if (d._id == _id) {
        setTagRowObj({ ...d });
      }
    });
    setModel(true);
  };

  const handleChange = (e) => {
    let obj = { ...tagRowObj };
    obj[e.target.name] = e.target.value;
    setTagRowObj(obj);
  };

  const save = (_id) => {
    let tagRow = [...tagsData];
    if (!_id) {
      tagRow.push({ ...tagRowObj, _id: tagsData.length });
    } else {
      let index = tagRow.findIndex((data) => data._id == _id);
      if (index > 0) {
        tagRow[index] = { ...tagRowObj };
      }
    }
    setTagsData(tagRow);
    gotoPageMeta(tagRow);
    setModel(false);
  };

  const deleteRow = (_id) => {
    let newRow = tagsData.filter((d) => d._id !== _id);
    setTagsData(newRow);
    gotoPageMeta(newRow);
  };

  const gotoPageMeta = (rowTag) => {
    let withoutIDTag = rowTag.map((d) => {
      return { name: d.name, value: d.value };
    });
    props.seteditObj({ ...props.editObj, metadata: withoutIDTag });
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
          {tagsData?.map((row) => (
            <TableRow key={row.name} className="border">
              <TableCell className="border" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className="border" component="th" scope="row">
                {row.value}
              </TableCell>
              <TableCell className="border" align="right">
                <EditIcon
                  onClick={() => {
                    editRow(row._id);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    deleteRow(row._id);
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
        }}>
        <div className="bg-dark text-white p-2 my-3">
          {" "}
          {props.add ? "Add Tags" : "Edit Tags"}
        </div>
        <div>Name</div>
        <TextField
          aria-label="empty textarea"
          className="my-2 w-100"
          variant="standard"
          value={tagRowObj.name}
          name="name"
          onChange={handleChange}
        />
        <div>Value</div>
        <TextField
          aria-label="empty textarea"
          className="my-2 w-100"
          variant="standard"
          value={tagRowObj.value}
          name="value"
          onChange={handleChange}
        />
        <div className="w-100 d-flex justify-content-end mt-2">
          <Button
            variant="contained"
            className="w-25 mx-2   rounded-0 "
            onClick={() => {
              save(tagRowObj._id);
            }}>
            Save
          </Button>
          <Button
            variant="contained"
            className="w-25 bg-danger rounded-0"
            onClick={() => {
              setModel(false);
              props.setAdd(false);
            }}>
            Cancel
          </Button>
        </div>
      </BasicModal>
    </TableContainer>
  );
}
