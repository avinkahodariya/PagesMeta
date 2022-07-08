import React, { useState, useEffect } from "react";
import { BasicModal } from "../../components";
import { TextField, Button } from "@mui/material";
import Select from "react-select";
import MetaPages from "../../pages/meta";

const AddEditPages = ({
  model,
  setModel,
  handleEdit,
  editObj,
  applications,
  rowsData,
  addNewPage,
  editModel,
  seteditObj,
}) => {
  const [meta, setMeta] = useState([]);
  useEffect(() => {
    let metadata = editObj.metadata?.map((d) => {
      return {
        ...d,
        label: d.name,
      };
    });
    setMeta(metadata || []);
  }, [editObj]);

  return (
    <div>
      {" "}
      <BasicModal
        open={model}
        onClose={setModel}
        styleParent={{ width: "50%", height: "500px", overflowY: "scroll" }}>
        <div className="row">
          <div className="my-2 col-6">
            <div> Page Name:</div>
            <TextField
              id="standard-helperText"
              variant="standard"
              name="pageName"
              className="w-100 "
              onChange={handleEdit}
              value={editObj?.pageName || ""}
            />
          </div>
          <div className=" my-2 col-6">
            <div className=" title-font"> Title :</div>
            <div>
              <TextField
                variant="standard"
                name="title"
                className="w-100 "
                value={editObj?.title || ""}
                onChange={handleEdit}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row row">
          <div className="my-3 col-6">
            <div className="my-2"> Application Name:</div>
            <Select
              options={applications}
              className=""
              value={{
                value: editObj?.app?.name || "",
                label: editObj?.app?.name || "",
              }}
              onChange={(e) => {
                handleEdit("app", e);
              }}
            />
          </div>
          <div className="my-3 col-6">
            <div className="my-2"> Parent Page:</div>
            <Select
              options={rowsData}
              className=""
              value={{
                label: editObj?.parent?.pageKey || "",
                value: editObj?.parent?.pageKey || "",
              }}
              onChange={(e) => {
                handleEdit("parent", e);
              }}
            />
          </div>
        </div>
        <div className="my-3">
          <div className="title-font">Description :</div>
          <div>
            <TextField
              variant="standard"
              name="description"
              className="my-2 w-100"
              value={editObj?.description || ""}
              onChange={handleEdit}
              multiline
              rows={4}
            />
          </div>
        </div>
        <MetaPages
          meta={meta}
          setMeta={setMeta}
          seteditObj={seteditObj}
          editObj={editObj}
        />
        <Button
          variant="contained"
          className="w-100 text-right p-2 mt-3"
          onClick={addNewPage}>
          {editModel ? "Save page  " : "Add page"}
        </Button>
      </BasicModal>
    </div>
  );
};

export default AddEditPages;
