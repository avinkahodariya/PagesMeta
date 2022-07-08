import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "@mui/material";
import { TagsTable } from "../page-components";

const MetaPages = ({ meta, seteditObj, editObj }) => {
  const [add, setAdd] = useState(false);
  const options = [
      { value: "content", label: "Content" },
      { value: "add", label: "Add" },
      { value: "edit", label: "Edit" },
  ];

  return (
      // < title="ADD META">
      <>
          <div className="">
              <div className=" ">
                  <div className="d-flex align-items-center">
                      <div className="title-font"> Tags:</div>
                      <div className="w-100 justify-content-end d-flex my-2 ">
                          <Button
                              variant="contained"
                              className="rounded-0"
                              onClick={() => {
                                  setAdd(true);
                              }}>
                              Add Tag
                          </Button>
                      </div>
                  </div>
                  <div className="py-3 w-100">
                      <div>
                          <TagsTable
                              add={add}
                              setAdd={setAdd}
                              editObj={editObj}
                              meta={meta}
                              seteditObj={seteditObj}
                          />
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
};

export default MetaPages;
