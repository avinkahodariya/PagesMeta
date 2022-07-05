import React, { useState, useEffect } from "react";
import BasicTable from "./Table";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  FormControl,
  MenuItem,
  Card,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BasicModal from "./Model";
import { Paper } from "@mui/material";
import Select from "react-select";

const Pages = () => {
  const [rowsData, SetRawData] = useState([]);
  const [Model, setModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editObj, seteditObj] = useState({});

  useEffect(() => {
    if (!editModel) seteditObj({});
  }, [editModel, Model]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const options = [
    { value: "content", label: "Content" },
    { value: "add", label: "Add" },
    { value: "edit", label: "Edit" },
  ];

  const applicationName = [
    { value: "amazon", label: "amazon" },
    { value: "flipkart", label: "flipkart" },
    { value: "snapdeal", label: "snapdeal" },
  ];

  const rows = [
    createData(0, "add page", "flipkart", "content"),
    createData(1, "Ice cream sandwich", "flipkart", "add"),
    createData(2, "shoes", "amazon", "add"),
    createData(3, "clothes", "myntra", "add"),
  ];

  function createData(id, pageName, applicationName, parentPage) {
    return { id, pageName, applicationName, parentPage };
  }

  const editRow = (id) => {
    setEditModel(true);
    let indexRow = rowsData.findIndex((data) => data.id == id);
    indexRow >= 0 && seteditObj(rowsData[indexRow]);
  };

  const deleteRow = (id) => {
    let deletdRow = rowsData.filter((d)=>d.id!==id);
    SetRawData(deletdRow)
  };

  const handleEdit = (e,data) => {

    let obj = { ...editObj };
    if (data) {
      obj[e] = data.value;
    } else {
      obj[e.target.name] = e.target.value;
    }

    seteditObj({
      ...obj,
    });
  };

  const saveData = (id) => {
    let indexRow = rowsData.findIndex((data) => data.id == id);
    if (!Model) {
      rowsData[indexRow] = { ...editObj };
    }
    if (Model) {
      let obj = { ...editObj };
      obj.id = rows.length;
      rowsData.push({ ...obj });
      SetRawData(rowsData);
      setModel(false);
      seteditObj({});
    } else {
      SetRawData(rowsData);
      setEditModel(false);
      seteditObj({});
    }
  };

  useEffect(() => {
    SetRawData(rows);
  }, []);

  return (
    <div className="page m-5 p-5">
      <div className="  m-auto">
        <Card elevation={5} className="m-3 p-3 border">
          <div className="bg-dark border p-3 w-100 text-white text-center" >Pages</div>
          <p className="text-end mt-3">
            <Button
              variant="contained"
              onClick={() => {
                setModel(true);
              }}
              className='rounded-0'
            >
              <AddBoxIcon className="" />
              <span className="mx-2">Add Page</span>
            </Button>
          </p>
          <div className="border card">
            <BasicTable
              rowsData={rowsData}
              editRow={editRow}
              deleteRow={deleteRow}
            />
          </div>
          <BasicModal open={Model} onClose={setModel}>
            <div className="my-2">
              <div> Page Name:</div>
              <TextField
                id="standard-helperText"
                // label=" Page Name"
                variant="standard"
                name="pageName"
                className="w-100 "
                onChange={handleEdit}
                value={editObj?.pageName||''}
              />
            </div>
            <div className="my-3">
              <div className="my-2"> Application Name:</div>
              <Select
                options={applicationName}
                className=""
                name="applicationName"
               
                onChange={(e) => {
                  handleEdit("applicationName", e);
                }}
              />
            </div>
            <div className="my-3">
              <div className="my-2"> Parent Page:</div>
              <Select
                options={options}
                className=""
                onChange={(e) => {
                  handleEdit("parentPage", e);
                }}
              />
            </div>
            <Button
              variant="contained"
              className="w-100 text-right p-2 mt-3"
              onClick={saveData}
            >
              {" "}
              ADD{" "}
            </Button>
          </BasicModal>
          <BasicModal open={editModel} onClose={setEditModel}>
            <div className="my-2">
              <div> Page Name:</div>
              <TextField
                id="standard-helperText"
                variant="standard"
                className="w-100 "
                name="pageName"
                value={editObj?.pageName||''}
                onChange={handleEdit}
              />
            </div>
            <div className="my-3">
              <div className="my-2"> Application Name:</div>
              <Select
                options={applicationName}
                className=""
                name="applicationName"
                defaultValue={{
                  label: editObj?.applicationName||'',
                  value: editObj?.applicationName||'',
                }}
                onChange={(e) => {
                  handleEdit("applicationName", e);
                }}
              />
            </div>
            <div className="my-3">
              <div className="my-2"> Paent Page:</div>
              <Select
                options={options}
                className=""
                defaultValue={{
                  label: editObj?.parentPage||'',
                  value: editObj?.parentPage||'',
                }}
                onChange={(e) => {
                  handleEdit("parentPage", e);
                }}
              />
            </div>
            <Button
              variant="contained"
              className="w-100 text-right p-2 mt-3"
              onClick={() => {
                saveData(editObj.id);
              }}
            >
              Save
            </Button>
          </BasicModal>
        </Card>
      </div>
    </div>
  );
};

export default Pages;
