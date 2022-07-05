import React from 'react'
import { Button, Card, TextField } from "@mui/material";

const MainCardWrapper = (props) => {
  return (
    <div className="page m-5 p-5">
    <div className=" m-auto">
      <Card elevation={5} className="m-5 p-5 mb-3 pb-4 border  m-auto">
        <div className="p-4 bg-dark text-white  m-auto">{props.title}</div>
        <div>{props.children}</div>
        </Card></div></div>
  )
}

export default MainCardWrapper