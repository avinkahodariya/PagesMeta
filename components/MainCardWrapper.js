import React from 'react'
import { Button, Card, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const MainCardWrapper = (props) => {
  return (
    <div className="page m-5 p-5">
      <div className=" m-auto">
        <div className="my-3 text-primary " onClick={props.onClick}>
          <span className="back-hover p-3">
            {" "}
            <ArrowBackIosIcon /> {props.backTitle}
          </span>
        </div>
        <Card elevation={5} className="m-5 p-5 mb-3 pb-4 border  m-auto">
          <div className="p-4 bg-dark text-white  m-auto">{props.title}</div>
          <div>{props.children}</div>
        </Card>
      </div>
    </div>
  );
};

export default MainCardWrapper