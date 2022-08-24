import React, { useState, useEffect } from "react";
import { BasicTable, LoaderBar } from "../components";
import { Button } from "@mui/material";
import { GetApplicationListHook } from "../hooks/application";
import { DeleteModal,Notification } from "../components";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { GetPagesListHook } from "../hooks/pages";
import "bootstrap/dist/css/bootstrap.css";
import { AddEditPages } from "../page-components";
import { ProtectRoute } from "../context/user";
import { PagesService } from "../utility/services";
const Pages = () => {
  const [rowsData, SetRawData] = useState([]);
  const [modal, setModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editObj, seteditObj] = useState({});
  const [deleteModal, setDeleteModal] = useState("false");
  const [deleteId, setDeleteID] = useState("");
  const [ loading, setLoading ] = useState(false);
  const { data: pages, getPages,loading:dataLoading } = GetPagesListHook();
  const { data: applicationData } = GetApplicationListHook();

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
    if (!editModal) {
      seteditObj({});
    }
  }, [editModal, modal]);
  
  useEffect(() => {
    setLoading(dataLoading)
  }, [dataLoading]);

  const editRow = (_id) => {
    setEditModal(true);
    setModal(true);
    let indexRow = rowsData.findIndex((data) => data._id == _id);
    indexRow >= 0 && seteditObj(rowsData[indexRow]);
  };

  const deleteRow = async(_id) => {
    setDeleteID(_id);
    setDeleteModal("true");
  };

const removePage = async (id) => {
  id && await PagesService.remove(id);
  await getPages();
}
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

  const addNewPage = async (values,meta) => {
    let obj = {
      pageKey: values?.pageName,
      app: values?.applicationName._id,
      parent: values?.parentPage?._id,
      description: values?.description || "",
      metadata: meta,
      title: values?.title || "",
    };
   obj.metadata = obj.metadata.map((d) => {
       return {
           name: d.name,
           value: d.value,
       };
   });
   setLoading(true)
    if (editModal) {
      await PagesService.update(editObj._id, obj).then((d) => {
        if (d) {
          Notification("Page Updated"); 
          setLoading(false)
        }
      })
    } else {
      await PagesService.add(obj).then((d) => {
        if (d) {
          Notification("Page Added");
          setLoading(false)
        }
      })
    }
    setEditModal(false);
    setModal(false);
    await getPages();
  };

  return (
    <ProtectRoute>
        <p className="text-end mt-3">
          <Button
            variant="contained"
            onClick={() => {
              setModal(true);
            }}
            className="rounded-0">
            <AddBoxIcon className="" />
            <span className="mx-2 ">Add Page</span>
          </Button>
        </p>
        <div className="border card">
          <BasicTable
            rowsData={rowsData}
            editRow={editRow}
            deleteRow={deleteRow}
          />
        </div>
        {modal && <AddEditPages
          modal={modal}
          setModal={() => {
            setModal(false);
            setEditModal(false);
          }}
          handleEdit={handleEdit}
          editObj={editObj}
          applications={applications}
          rowsData={rowsData}
          addNewPage={addNewPage}
          editModal={editModal}
          seteditObj={seteditObj}
        />}
        <DeleteModal
          open={deleteModal == "true" ? true : false}
          onClose={setDeleteModal}
          remove={removePage}
          loading={loading}
          id={deleteId}
         />
    </ProtectRoute>
  );
};

export default Pages;
