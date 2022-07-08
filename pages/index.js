import React, { useEffect } from "react";
import Router from "next/router";

const Index = () => {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/") {
      Router.push("/pages");
    }
  }, []);
  return <div></div>;
};
export default Index;
