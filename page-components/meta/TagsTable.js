import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { BasicModal } from "../../components";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';

const tagsTableSchema = yup.object({
  name: yup
    .string('Enter tags name')
    .required('Tags name is required'),
  value: yup
    .string('Enter tags value')
    .required('Tags Value is required'),
});

export  function TagsTable(props) {
  const [tagsData, setTagsData] = useState([]);
  const [tagRowObj, setTagRowObj] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.add && setModal(true);
    props.add && setTagRowObj({});
  }, [props.add]);

  useEffect(() => {
    setTagsData(props.meta);
  }, [props.meta]);

  const editRow = (_id) => {
      tagsData.map((d) => {
          if (d._id == _id) {
              setTagRowObj({ ...d });
          }
      });
      setModal(true);
  };


  const save = (_id,value) => {
      let tagRow = [...tagsData];
      if (!_id && _id !== 0) {
          tagRow.push({ ...value, _id: tagsData.length });
      } else {
          let index = tagRow.findIndex((data) => data._id == _id);
          if (index >= 0) {
              tagRow[index] = { ...value };
          }
      }
      setTagsData(tagRow);
      gotoPageMeta(tagRow);
      setModal(false);
  };

  const deleteRow = (_id) => {
      let newRow = tagsData.filter((d) => d._id !== _id);
      setTagsData(newRow);
      gotoPageMeta(newRow);
  };

  const gotoPageMeta = (rowTag) => {
      // let withoutIDTag = rowTag.map((d) => {
      //   return { name: d.name, value: d.value };
      // });
      props.seteditObj({ ...props.editObj, metadata: rowTag });
  };

  return (
    <TableContainer  >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-secondary border ">
          <TableRow>
            <TableCell className="text-white">Name</TableCell>
            <TableCell className="text-white">Value</TableCell>
            <TableCell className="text-white" align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="border">
          {tagsData?.map((row,i) => (
            <TableRow key={i} className="border">
              <TableCell className="border" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className="border" component="th" scope="row">
                {row.value}
              </TableCell>
              <TableCell className="border" align="right">
                <EditIcon
                  onClick={() => {
                    editRow(row._id);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    deleteRow(row._id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BasicModal
        open={modal}
        onClose={() => {
          setModal(false);
          props.setAdd(false);
        }}>
          <div className="d-flex justify-content-between">
        <h5 className="text-dark py-2 pt-0 my-0">
          {" "}
          {props.add ? "Add Tags" : "Edit Tags"}
        </h5>
        <CloseIcon className="cursor-pointer" onClick={()=>{setModal(false)}}/>
        </div>
        <hr className="my-2"/>
        <TagsForm 
        preData={tagRowObj}
        submit={(id,value)=>{save(id,value)}} 
        cancel={()=>{
          setModal(false);
          props.setAdd(false);
            }}
              />
      </BasicModal>
    </TableContainer>
  );
}



const TagsForm =  ({preData,submit,cancel}) => {
  const formik = useFormik({
    initialValues: {
    name:preData.name||'',value:preData.value||'', id:preData._id||''   },
    validationSchema: tagsTableSchema,
    onSubmit: (values) => {
      submit(preData._id,values);
    },
  });

  return (
   <form onSubmit={formik.handleSubmit}>
            <div>Name</div>
        <TextField
          aria-label="empty textarea"
          className="my-2 w-100"
          variant="standard"
          value={formik.values.name}
          name="name"
          onChange={formik.handleChange}          
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        {formik.touched.name && Boolean(formik.errors.name) &&<small className="text-danger">*{formik.errors.name}</small>}
        <div>Value</div>
        <TextField
          aria-label="empty textarea"
          className="my-2 w-100"
          variant="standard"
          value={formik.values.value}
          name="value"
          onChange={formik.handleChange}          
          error={formik.touched.value && Boolean(formik.errors.value)}

        />
                {formik.touched.value && Boolean(formik.errors.value) &&<small className="text-danger">*{formik.errors.value}</small>}

        <div className="w-100 d-flex justify-content-end mt-2">
          <Button
            variant="contained"
            className="w-25 mx-2   rounded-0 "
            type="submit"
            >
            Save
          </Button>
          <Button
            variant="contained"
            className="w-25 bg-danger rounded-0"
            onClick={cancel}>
            Cancel
          </Button>
        </div>
        </form>
)
}