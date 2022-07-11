import React from 'react'
import { Button, Card, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Router from "next/router";
import { useRouter } from 'next/router'

const MainCardWrapper = (props) => {
  const route= useRouter()
  console.log("🚀 ~ file: MainCardWrapper.js ~ line 9 ~ MainCardWrapper ~ route", route)
  return (
    <div className="page m-5">
      <div className=" m-auto">
        <div className="my-3 w-25 d-flex" >
          <Button variant={`${route.pathname=='/pages'?"contained":"outlined"}`} className='maincard-button w-50 text-black' onClick={()=>{
                          Router.push("/pages");

          }}>pages</Button>
          <Button variant={`${route.pathname=='/application'?"contained":"outlined"}`} className='maincard-button w-50 text-black'  onClick={()=>{
              Router.push("/application");

          }}>Application</Button>
        </div>
        <div  className="mb-3 pb-4 w-full m-auto">
          <div className=" text-black m-auto title-font">{props.title}</div>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainCardWrapper