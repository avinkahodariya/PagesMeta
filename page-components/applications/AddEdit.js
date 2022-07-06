import { Button, InputLabel, TextField } from "@mui/material";
import React from "react";
import { BasicModal } from "../../components";

const AddEdit = ({ model, setModel, editObj, handleChange, addOrEdit }) => {
  return (
    <div>
      <BasicModal open={model} onClose={setModel}>
        <div className="px-3 ">
          <InputLabel className="py-2">Application Name</InputLabel>
          <TextField
            id="outlined-basic"
            className="my-2 w-100"
            variant="standard"
            name="name"
            value={editObj.applicationName}
            onChange={handleChange}
          />
        </div>
        <div className="px-3 ">
          <InputLabel className="   py-2  ">Discription</InputLabel>
          <TextField
            className="my-2 w-100"
            multiline
            rows={4}
            variant="standard"
            name="description"
            value={editObj.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-100 text-right  py-2 px-0  d-flex justify-content-end">
          <Button
            variant="contained"
            className="my-2 mx-3  px-5 rounded-0"
            onClick={() => {
              setModel(true);
              addOrEdit();
            }}>
            {editObj.id ? "Save" : "add"}
          </Button>
        </div>
      </BasicModal>
    </div>
  );
};

export default AddEdit;
