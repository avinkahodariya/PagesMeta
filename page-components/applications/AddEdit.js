import { Button, InputLabel, TextField } from "@mui/material";
import React from "react";
import { BasicModal, LoaderBar } from "../../components";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from "formik";
import * as yup from 'yup';

const tagsTableSchema = yup.object({
  name: yup
    .string('Enter Application name')
    .required('Application name is required'),
});



export const AddEdit = ({ modal, setModal, editObj, handleChange, addOrEdit ,loading}) => {

    const formik = useFormik({
        initialValues: {
        name:editObj.name||'' ,
        description:editObj.description||''
       },
        validationSchema: tagsTableSchema,
        onSubmit: (values) => {
            addOrEdit(values)
        },
      });


  return (
      <div>
          <BasicModal open={modal} onClose={setModal}>
           <div className="d-flex justify-content-between"> <h4>{editObj.name ? "Edit":"Add"} Application</h4><CloseIcon onClick={setModal}/></div>
            <hr/>
            <form onSubmit={formik.handleSubmit}>
              <div className="px-3 ">
                  <InputLabel className="py-2">Application Name</InputLabel>
                  <TextField
                      id="outlined-basic"
                      className="my-2 w-100"
                      variant="standard"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                  />
              {formik.touched.name && Boolean(formik.errors.name) &&<small className="text-danger">*{formik.errors.name}</small>}
              </div>
              <div className="px-3 ">
                  <InputLabel className="py-2">Description</InputLabel>
                  <TextField
                      className="my-2 w-100"
                      multiline
                      rows={4}
                      variant="standard"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                  />
              </div>
              <div className="w-100 text-right  py-2 px-0  d-flex justify-content-end">
                  <Button
                      variant="contained"
                      className="my-2 mx-3  px-5 rounded-0 position-relative"
                      type="submit"
                      disabled={loading}
                      >
                          {editObj.name ? "Save" : "Add"}
                          {loading && <LoaderBar />}
                  </Button>
              </div>
              </form>
          </BasicModal>
      </div>
  );
};

