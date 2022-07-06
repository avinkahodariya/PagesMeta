import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { TextField, Button } from "@mui/material";
import Select from "react-select";
import { TagsTable } from "../page-components";
import MainCardWrapper from "../components/MainCardWrapper";
import { GetApplicationListHook } from "../hooks";
import { GetPagesListHook } from "../hooks/pages";
import Pages from "./pages";
import { AddMetaHook, GetMetasListHook } from "../hooks/meta";

const MetaPages = () => {
  const [add, setAdd] = useState(false);
  const [applications, setApplications] = useState([]);
  const [pagesData, setPagesData] = useState([]);
  const [addObj, setObj] = useState({});
  const { getApplication, data: appications } = GetApplicationListHook();
  const { getPages, data: pages } = GetPagesListHook();
  const { AddMeta } = AddMetaHook();

  const { data: Meta } = GetMetasListHook();
  const options = [
    { value: "content", label: "Content" },
    { value: "add", label: "Add" },
    { value: "edit", label: "Edit" },
  ];
  useEffect(() => {
    console.log("🚀 ~ file: meta.js ~ line 27 ~ MetaPages ~ Meta", Meta);
  }, [Meta]);

  useEffect(() => {
    let applicationData = appications.map((d) => {
      return {
        _id: d._id,
        name: d.name,
        isActive: d.isActive,
        label: d.name,
        value: d.name,
      };
    });
    setApplications(applicationData);
    let PagesData = pages.map((d) => {
      return {
        ...d,
        name: d.pageKey,
        value: d.pageKey,
        label: d.pageKey,
      };
    });
    setPagesData(PagesData);
  }, [appications, pages]);

  const handleChange = (e, data) => {
    let obj = { ...addObj };
    obj[e?.target?.name || e] = e?.target?.value || data;
    setObj(obj);
  };

  const addMeta = () => {
    let metaObj = {
      ...addObj,
      app: addObj.app._id,
      page: addObj.page._id,
    };

    AddMeta();
  };

  return (
    <MainCardWrapper title="ADD META">
      <div className="p-4 pt-2  mt-3  my-2  pb-0 m-auto border">
        <div className="d-flex justify-content-between">
          <div className="my-3 mt-0  dropbox">
            <div className="my-2 title-font">Application :</div>
            <div>
              {console.log("addObj", applications, addObj)}
              <Select
                options={applications}
                onChange={(e) => {
                  handleChange("app", e);
                }}
                value={{
                  label: addObj?.app?.name || "",
                  value: addObj?.app?.name || "",
                }}
              />
            </div>
          </div>

          <div className="my-3  mt-0 z-index dropbox ">
            <div className="my-2 title-font">Page :</div>
            <div>
              <Select
                options={pagesData}
                onChange={(e) => {
                  handleChange("page", e);
                }}
                value={{
                  label: addObj?.page?.pageKey || "",
                  value: addObj?.page?.pageKey || "",
                }}
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="title-font"> Title :</div>
          <div>
            <TextField
              variant="standard"
              name="title"
              className="w-100 "
              value={addObj?.title || ""}
              onChange={handleChange}
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
              value={addObj?.description || ""}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </div>
        </div>

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
              <TagsTable add={add} setAdd={setAdd} />
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 w-100 d-flex justify-content-end mt-3 mb-0">
        <Button variant="contained" className="rounded-0" onClick={addMeta}>
          Add MEta DATA
        </Button>
      </div>
    </MainCardWrapper>
  );
};

export default MetaPages;
