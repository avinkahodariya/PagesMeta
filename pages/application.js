import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { DeleteModel } from "../components/DeleteModel";
import { Notification } from "../components/Notification";
import { ApplicationTable } from "../components/ApplicationTable";
import {
  AddApplication,
  GetApplicationListHook,
  UpdateApplicationHook,
  RemoveApplicationHook,
} from "../hooks";
import MainCardWrapper from "../components/MainCardWrapper";
import AddEdit from "../page-components/applications/AddEdit";
import "bootstrap/dist/css/bootstrap.css";
import Router from "next/router";

function Application() {
  const [model, setModel] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editObj, seteditObj] = useState({});
  const [deleteModel, setdeleteModel] = useState("");

  const { data, getApplication } = GetApplicationListHook();
  const { InsertApp } = AddApplication();
  const { update } = UpdateApplicationHook();
  const { removeApplication } = RemoveApplicationHook();

  useEffect(() => {
    let formatedData = data?.map((d) => {
      return createData(d._id, d.name, d.isActive, d.createdAt, d.description);
    });
    setTableData(formatedData);
  }, [data]);

  function createData(_id, name, isActive, createdAt, description) {
    return { _id, name, isActive, createdAt, description };
  }

  const editRow = (_id) => {
    setModel(true);
    let indexRow = tableData.findIndex((data) => data._id == _id);
    indexRow >= 0 && seteditObj(tableData[indexRow]);
  };

  const deleteRow = (_id) => {
    setdeleteModel(_id);
  };

  const handleChange = (e) => {
    let obj = { ...editObj };
    obj[e.target.name] = e.target.value;
    seteditObj({ ...obj });
  };

  const addOrEdit = async () => {
    let updateObj = {};
    updateObj.name = editObj.name;
    updateObj.description = editObj.description;
    if (editObj._id) {
      await update(editObj._id, updateObj);
      Notification("Application Updated");
    } else {
      await InsertApp({ ...updateObj });
      Notification("Application Added");
    }
    await getApplication();
    setModel(false);
    seteditObj({});
  };

  return (
    <MainCardWrapper
      title="Applications"
      onClick={() => {
        Router.push("/pages");
      }}>
      <div className="w-100 text-right  py-2 px-0  d-flex justify-content-end">
        <Button
          variant="contained"
          className="my-2 mx-0  px-5 rounded-0"
          onClick={() => {
            setModel(true);
            seteditObj({});
          }}>
          Add
        </Button>
      </div>
      <ApplicationTable
        rowsData={tableData}
        editRow={editRow}
        deleteRow={deleteRow}
      />
      <AddEdit
        model={model}
        setModel={setModel}
        editRow={editRow}
        deleteRow={deleteRow}
        editObj={editObj}
        handleChange={handleChange}
        addOrEdit={addOrEdit}
      />
      <DeleteModel
        open={deleteModel}
        onClose={setdeleteModel}
        remove={async () => {
          await removeApplication(deleteModel);
          setdeleteModel(false);
          setdeleteModel(false);
          Notification("Application Deleted Sucessfully");
          await getApplication();
        }}
      />
    </MainCardWrapper>
  );
}

export default Application;
