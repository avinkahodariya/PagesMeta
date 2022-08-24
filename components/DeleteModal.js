import React from "react";
import { BasicModal } from "./Modal";
import { Button } from "@mui/material";
import { LoaderBar } from "./loaderbar";
export const DeleteModal = ({ open, onClose, remove,loading ,id}) => {
  return (
    <div>
      <BasicModal open={open} onClose={onClose} className="p-2 py-4">
        <p className="text-center"> Are You Sure To Want The Remove ?</p>
        <p className="d-flex justify-content-center mb-0">
          <Button
            variant="contained"
            className="bg-success mx-2 my-2 w-25"
            onClick={() => {
              onClose("delete");
              remove(id);
            }}>
           {loading && <LoaderBar/>} Yes
          </Button>
          <Button
            variant="contained"
            className="bg-danger mx-2 my-2  w-25"
            onClick={() => {
              onClose("false");
            }}>
            NO
          </Button>
        </p>
      </BasicModal>
    </div>
  );
};
