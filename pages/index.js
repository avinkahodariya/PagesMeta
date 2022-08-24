import React, { useEffect } from "react";
import Router from "next/router";
import { AuthProvider, useAuth } from "../context/user";
const Index = () => {
const auth = useAuth();
useEffect(()=>{
  if(auth.isAuthenticated){
    Router.push('/pages')
  }else{
    Router.push('/login')
  }
},[auth.isAuthenticated])
  return <AuthProvider></AuthProvider>
};
export default Index;
