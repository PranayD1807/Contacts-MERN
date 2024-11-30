import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import React from "react";
import { chakra } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <ToastContainer
        position="bottom-left"
        theme="dark"
        toastClassName="text-sm"
      />
      <chakra.body>
        <Outlet />
      </chakra.body>
    </React.Fragment>
  );
};

export default AppLayout;
