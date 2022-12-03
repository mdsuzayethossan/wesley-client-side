import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/Navbar";
const Main = () => {
  return (
    <>
      <AppBar></AppBar>
      <Outlet></Outlet>
    </>
  );
};

export default Main;
