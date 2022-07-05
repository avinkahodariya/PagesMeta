import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "bootstrap/dist/css/bootstrap.css";
import InputLabel from "@mui/material/InputLabel";
import { Button, Card } from "@mui/material";
import BasicModal from "../pages/Model";
import React, { useState } from "react";

function Application() {
  const [Model, setModel] = useState(false);
  return (
    <div className="m-auto p-5 m-5">
      <div className="d-flex flex-column p-5 m-5 w-75 m-auto">
        <Card elevation={5} className="py-4">
          <div className="text-light bg-dark mx-4 my-3 p-3"> Add Application    </div>
          <div className="px-4">
            <InputLabel className="fw-bold  p-2  ">
              Application Name
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="my-2 w-100"
              variant="standard"
            // className='bg-dark'
            />
          </div>
          <div className="px-4 ">
            <InputLabel className="fw-bold   p-2  ">Discription</InputLabel>
            <TextField
              aria-label="empty textarea"
              // placeholder="Enter Description here"
              className="my-2 w-100"
              // style={{height:'50vh'}}
              multiline
              rows={4}
              variant="standard"
            />
          </div>
          <div className="w-100 text-right  px-4  d-flex justify-content-end">
            {" "}
            <Button
              variant="contained"
              className="my-2  mb-0 px-5 rounded-0"
              onClick={() => {
                // setModel(true);
              }}
            >
              Add
            </Button>
          </div>
          <BasicModal open={Model} onClose={setModel}></BasicModal>
        </Card>
      </div>
    </div>
  );
}

export default Application;
