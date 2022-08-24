import React, { useState, useEffect } from "react";
import { BasicModal } from "../../components";
import { TextField, Button } from "@mui/material";
import Select from "react-select";
import { MetaPages } from "../meta/meta";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { Formik } from "formik";

const addEditSchema = yup.object({
  pageName: yup.string("Enter page name").required("page name is required"),
  title: yup.string("Enter title value").required("title is required"),
  applicationName:  yup.object().required("application name is required"),
});

export const AddEditPages = ({
  modal,
  setModal,
  handleEdit,
  editObj,
  applications,
  rowsData,
  addNewPage,
  editModal,
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
      <BasicModal
        open={modal}
        onClose={setModal}
        styleParent={{ maxHeight: "90vh", overflowY: "auto",width:"80%" }}

      >
        <div className="w-100 d-flex justify-content-between">
          <h4>Add/Edit Page</h4>{" "}
          <CloseIcon className="cursor-pointer" onClick={setModal} />
        </div>
        <hr />
        <Formik
          initialValues={{
            pageName: editObj?.pageName || "",
            title: editObj?.title || "",
            applicationName: {
              value: editObj?.app?.name || "",
              label: editObj?.app?.name || "",
            },
            parentPage: {
              label: editObj?.parent?.pageKey || "",
              value: editObj?.parent?.pageKey || "",
            },
          }}
          validationSchema={addEditSchema}
          onSubmit={(values, { setSubmitting }) => {
            addNewPage(values,meta)
          }}
          render={({
            values,
            errors,
            handleSubmit,
            handleChange,
            isSubmitting,
            setFieldValue,
            touched,
          }) => (
            <>
              <div className="row">
                <div className="my-2 col-6">
                  <div> Page Name</div>
                  <TextField
                    id="standard-helperText"
                    variant="standard"
                    name="pageName"
                    className="w-100 "
                    onChange={handleChange}
                    value={values.pageName}
                    error={touched.pageName && Boolean(errors.pageName)}
                  />
                  {touched.pageName && Boolean(errors.pageName) && (
                      <small className="text-danger">
                        *{errors.pageName}
                      </small>
                    )}
                </div>
                <div className=" my-2 col-6">
                  <div className=""> Title</div>
                  <div>
                    <TextField
                      variant="standard"
                      name="title"
                      className="w-100 "
                      value={values.title}
                      onChange={handleChange}
                      error={touched.title && Boolean(errors.title)}
                    />
                    {touched.title && Boolean(errors.title) && (
                      <small className="text-danger">
                        *{errors.title}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row row">
                <div className="my-3 col-6">
                  <div className="my-2"> Application Name</div>
                  <Select
                    options={applications}
                    className=""
                    name="applicationName"
                    value={values.applicationName}
                    onChange={(e) => {
                      setFieldValue("applicationName", {
                        label: e.label,
                        value: e.label,
                        _id:e.app._id
                      });
                    }}
                  />
                  {touched.applicationName &&
                    Boolean(errors.applicationName) && (
                      <small className="text-danger">
                        *{errors.applicationName}
                      </small>
                    )}
                </div>
                <div className="my-3 col-6">
                  <div className="my-2"> Parent Page</div>
                  <Select
                    options={rowsData}
                    className=""
                    name="parentPage"
                    value={values.parentPage}
                    onChange={(e) => {
                      setFieldValue("parentPage", {
                        label: e.pageName,
                        value: e.pageName,
                        _id:e.page._id

                      });
                    }}
                  />
                </div>
              </div>
              <div className="my-3">
                <div className="">Description</div>
                <div>
                  <TextField
                    variant="standard"
                    name="description"
                    className="my-2 w-100"
                    value={values.description}
                    onChange={handleChange}
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
              <div className="text-end">
                <Button
                  variant="contained"
                  className="w-25  p-2 mt-3 rounded-0"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {editModal ? "Save page  " : "Add page"}
                </Button>
              </div>
            </>
          )}
        />
      </BasicModal>
    </div>
  );
};

