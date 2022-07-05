import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card, TextField } from "@mui/material";
import Select from "react-select";
import {TagsTable} from "../page-components";
import MainCardWrapper from "../components/MainCardWrapper";

const MetaPages = () => {
    const [add, setAdd] = useState(false)
  const options = [
    { value: "content", label: "Content" },
    { value: "add", label: "Add" },
    { value: "edit", label: "Edit" },
  ];

  return (
    <MainCardWrapper title="ADD META">
          <div className="p-4 pt-2  mt-3  my-2  pb-0 m-auto border">
            <div className="d-flex justify-content-between">
              <div className="my-3 mt-0  dropbox">
                <div className="my-2 title-font">Application :</div>
                <div>
                  <Select
                    options={options}
                    className=""
                    onChange={(e) => {
                      // handleEdit("parentPage", e);
                    }}
                  />
                </div>
              </div>

              <div className="my-3  mt-0 z-index dropbox ">
                <div className="my-2 title-font">Page :</div>
                <div>
                  <Select
                    options={options}
                    className="asasasas"
                    id="react-select-5-listbox"
                    onChange={(e) => {
                      // handleEdit("parentPage", e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="title-font"> Title :</div>
              <div>
                <TextField
                  id="standard-helperText"
                  // label=" Page Name"
                  variant="standard"
                  name="title"
                  className="w-100 "
                  // onChange={handleEdit}
                  // value={editObj?.pageName||''}
                />
              </div>
            </div>
            <div className="my-3">
              <div className="title-font">Description :</div>
              <div>
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
            </div>

            <div className=" ">
                <div className="d-flex align-items-center">
              <div className="title-font"> Tags:</div>
              <div className="w-100 justify-content-end d-flex my-2 ">
                  <Button variant="contained" className='rounded-0' onClick={()=>{
                    setAdd(true)
                  }}>Add Tag</Button>
                </div>
                </div>
              <div className="py-3 w-100">
                
                <div>
                   <TagsTable add = {add} setAdd={setAdd}/>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 w-100 d-flex justify-content-end mt-3 mb-0">
            <Button variant="contained" className="rounded-0">Add MEta DATA</Button>
          </div>
  </MainCardWrapper>
  );
};

export default MetaPages;
