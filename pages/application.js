import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Notification,DeleteModal } from "../components";
import { ApplicationTable } from "../components/ApplicationTable";
import {
  GetApplicationListHook,
} from "../hooks";
import "bootstrap/dist/css/bootstrap.css";
import { ApplicationsService } from '../utility/services';
import { AddEdit } from "../page-components/applications";

function Application() {
  const [modal, setModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editObj, seteditObj] = useState({});
  const [deleteModal, setDeleteModal] = useState("");
  const [loading,setLoading] =useState(false)

  const { data, getApplication } = GetApplicationListHook();

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
    setModal(true);
    let indexRow = tableData.findIndex((data) => data._id == _id);
    indexRow >= 0 && seteditObj(tableData[indexRow]);
  };

  const deleteRow = (_id) => {
    setDeleteModal(_id);
  };

  const handleChange = (e) => {
    let obj = { ...editObj };
    obj[e.target.name] = e.target.value;
    seteditObj({ ...obj });
  };

  const addOrEdit = async (values) => {
    let updateObj = {};
    updateObj.name = values.name;
    updateObj.description = values.description||'';
    if (editObj._id) {
      setLoading(true)
      await ApplicationsService.update(editObj._id, updateObj).then((data)=>{
        if(data){ setLoading(false)
          Notification("Application Updated");
        }
      })
    } else {
      setLoading(true)
      await ApplicationsService.add({ ...updateObj }).then((data)=>{
        if(data) { 
          setLoading(false)
          Notification("Application Added");
        }
      })
    }
    await getApplication()


    setModal(false);
    seteditObj({});
  };

  const remove =async () => {
    await ApplicationsService.remove(deleteModal);
    setDeleteModal(false);
    setDeleteModal(false);
    Notification("Application Deleted Sucessfully");
    await getApplication();
  }

  return (
    <>
      <div className="w-100 text-right  py-2 px-0  d-flex justify-content-end">
        <Button
          variant="contained"
          className="my-2 mx-0  px-5 rounded-0"
          onClick={() => {
            setModal(true);
            seteditObj({});
          }}>
          Add
        </Button>
      </div>
      <div className="border card">
      <ApplicationTable
        rowsData={tableData}
        editRow={editRow}
        deleteRow={deleteRow}
      />
      </div>
     {modal && <AddEdit
        modal={modal}
        setModal={()=>{
          setModal(false)
        }}
        editRow={editRow}
        deleteRow={deleteRow}
        editObj={editObj}
        handleChange={handleChange}
        addOrEdit={addOrEdit}
        loading={loading}
      />}
      <DeleteModal
        open={deleteModal}
        onClose={setDeleteModal}
        remove={remove}
      />
    </>
  );
}

export default Application;
