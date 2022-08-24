// import { AppDangerButton } from 'elements'
import React, {  useState } from 'react'
// import { AuthService } from '../utility/services';
// import { Link,useNavigate } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import Router from "next/router";
import { useAuth } from '../context/user';
export function HeaderBar() {

  // const navigate = useNavigate()
  // const logout = async () => {
  //     await AuthService.logout()
  //     navigate('/')
  // }
  const [value, setValue] = useState("pages");
  const authContext = useAuth()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    Router.push(`/${newValue}`)
  };
  return (
    <div className='d-flex flex-row align-items-center w-100 border border-bottom-1 d-flex justify-content-between'>
      <div className='d-flex flex-row align-items-center font'>
        <h5 className='mx-3'>PagesMeta</h5>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example"
        >
          <Divider orientation="vertical" flexItem style={{ height: '49px' }} />
            <Tab value="pages" label="Pages" />
          <Divider orientation="vertical" flexItem style={{ height: '49px' }} />
            <Tab value="application" label="Application" />
        </Tabs>
      </div>
      <Button variant='contained' className='mx-3 bg-danger rounded-0' onClick={()=>{
       authContext.logout()
      }}>Logout</Button>
    </div>
  )
}
