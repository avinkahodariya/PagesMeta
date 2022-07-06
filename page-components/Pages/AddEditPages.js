import React from "react";
import { BasicModal } from "../../components";
import { TextField, Button } from "@mui/material";
import Select from "react-select";

const AddEditPages = ({
  model,
  setModel,
  handleEdit,
  editObj,
  applications,
  rowsData,
  addNewPage,
  editModel,
}) => {
  return (
    <div>
      {" "}
      <BasicModal open={model} onClose={setModel}>
        <div className="my-2">
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
        <div className="my-3">
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
        <div className="my-3">
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
