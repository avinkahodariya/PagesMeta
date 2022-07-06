import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.css";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import { BasicModal } from "../components";
import React, { useState, useEffect } from "react";
import { AddApplication, GetApplicationListHook, UpdateApplicationHook,RemoveApplicationHook } from "../hooks";
import MainCardWrapper from "../components/MainCardWrapper";
import { ApplicationTable } from "../components/ApplicationTable";
import AddEdit from "../page-components/applications/AddEdit";

function Application() {
  const [model, setModel] = useState(false);
  const [tableData,setTableData]=useState([]);
  const [editObj,seteditObj]=useState({})

  const { data, loading } = GetApplicationListHook();
  const { InsertApp } = AddApplication();
  const { update }=UpdateApplicationHook();
  const {removeApplication}=RemoveApplicationHook();


  useEffect(()=>{
   let formatedData =  data.map((d)=>{
       return createData(d._id, d.name, d.isActive, d.createdAt)
    })
    setTableData(formatedData)
  },[data])

  function createData(id, applicationName, active, created) {
    return { id, applicationName, active, created };
  }

  const editRow = (id) => {
    setModel(true);
    let indexRow = tableData.findIndex((data) => data.id == id);
    indexRow >= 0 && seteditObj(tableData[indexRow]);
  };

  const deleteRow = (id) => {
    // let deletdRow = tableData.filter((d) => d.id !== id);
    // SetRawData(deletdRow);
    removeApplication(id)

  };

  const handleChange = (e) => {
    let obj = {...editObj};
    obj[e.target.name]= e.target.value;
    seteditObj({...obj})
  }
  

  const addOrEdit = () => {
    if (editObj.id) {
      let updateObj = {};
      updateObj.name = editObj.applicationName
      update(editObj.id,updateObj)
    } else {
      InsertApp({name:editObj.applicationName})
    }
  };



  return (
    <MainCardWrapper title="Add Applications">
      <div className="w-100 text-right  py-2 px-0  d-flex justify-content-end">
        <Button
          variant="contained"
          className="my-2 mx-0  px-5 rounded-0"
          onClick={() => {
            setModel(true);
            seteditObj({})
          }}>
          Add
        </Button>
      </div>
      <ApplicationTable
        rowsData={tableData}
        editRow={editRow}
        deleteRow={deleteRow}
      />
      <AddEdit model={model} setModel={setModel} editRow={editRow} deleteRow={deleteRow} editObj={editObj} handleChange={handleChange} addOrEdit={addOrEdit}/>
    </MainCardWrapper>
  );
}

export default Application;
