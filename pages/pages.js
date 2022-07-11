import React, { useState, useEffect } from "react";
import { BasicTable } from "../components";
import { Button } from "@mui/material";
import { GetApplicationListHook } from "../hooks/application";
import { DeleteModel } from "../components/DeleteModel";
import { Notification } from "../components/Notification";
import MainCardWrapper from "../components/MainCardWrapper";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  AddPageHook,
  GetPagesListHook,
  RemovePageHook,
  UpdatePagesHook,
} from "../hooks/pages";
import "bootstrap/dist/css/bootstrap.css";
import Router from "next/router";
import AddEditPages from "../page-components/Pages/AddEditPages";

const Pages = () => {
  const [rowsData, SetRawData] = useState([]);
  const [model, setModel] = useState(false);
  const [applications, setApplications] = useState([]);
  const [editModel, setEditModel] = useState(false);
  const [editObj, seteditObj] = useState({});
  const [deleteModel, setdeleteModel] = useState("false");
  const [deleteID, setDeleteID] = useState("");

  const { data: pages, getPages } = GetPagesListHook();
  const { data: applicationData } = GetApplicationListHook();
  const { addPage } = AddPageHook();
  const { updatePage } = UpdatePagesHook();
  const { removePage } = RemovePageHook();

  useEffect(() => {
    let newData = pages.map((d) => {
      return createData(
        d._id,
        d.pageKey,
        d.metadata,
        d.app,
        d.parent,
        d.title,
        d.description,
        d
      );
    });
    SetRawData(newData);
  }, [pages]);

  function createData(
    _id,
    pageName,
    metadata,
    app,
    parent = "",
    title,
    description,
    page
  ) {
    return {
      _id,
      pageName,
      metadata,
      app,
      parent,
      name: pageName,
      label: pageName,
      title,
      description,
      page,
    };
  }

  useEffect(() => {
    let appArray = applicationData.map((d) => {
      return { _id: d._id, label: d.name, value: d.value, app: d };
    });
    setApplications(appArray);
  }, [applicationData]);

  useEffect(() => {
    if (!editModel) {
      seteditObj({});
    }
  }, [editModel, model]);

  const editRow = (_id) => {
    setEditModel(true);
    setModel(true);
    let indexRow = rowsData.findIndex((data) => data._id == _id);
    indexRow >= 0 && seteditObj(rowsData[indexRow]);
  };

  const deleteRow = (_id) => {
    setDeleteID(_id);
    setdeleteModel("true");
    getPages();
  };

  const handleEdit = (e, data) => {
    let obj = { ...editObj };
    if (data) {
      obj[e] = data.label;
      if (e == "app") {
        obj.app = data.app;
      } else {
        obj.parent = data.page;
      }
    } else {
      obj[e.target.name] = e.target.value;
    }
    seteditObj({
      ...obj,
    });
  };

  const addNewPage = async () => {
    let obj = {
      pageKey: editObj.pageName,
      app: editObj.app._id,
      parent: editObj.parent._id,
      description: editObj.description || "",
      metadata: editObj.metadata,
      title: editObj.title || "",
    };
   obj.metadata = obj.metadata.map((d) => {
       return {
           name: d.name,
           value: d.value,
       };
   });
    if (editModel) {
      await updatePage(editObj._id, obj);
      Notification("Page Updated");
    } else {
      await addPage(obj);
      Notification("Page Added");
    }
    setEditModel(false);
    setModel(false);
    await getPages();
  };

  return (
    <>
      {" "}
      <MainCardWrapper
        title="Pages"
        onClick={() => {
          Router.push("/application");
        }}>
        <p className="text-end mt-3">
          <Button
            variant="contained"
            onClick={() => {
              setModel(true);
            }}
            className="rounded-0">
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
        <AddEditPages
          model={model}
          setModel={() => {
            setModel(false);
            setEditModel(false);
          }}
          handleEdit={handleEdit}
          editObj={editObj}
          applications={applications}
          rowsData={rowsData}
          addNewPage={addNewPage}
          editModel={editModel}
          seteditObj={seteditObj}
        />
        <DeleteModel
          open={deleteModel == "true" ? true : false}
          onClose={setdeleteModel}
          remove={() => {
            deleteID && removePage(deleteID);
          }}
        />
      </MainCardWrapper>
    </>
  );
};

export default Pages;
