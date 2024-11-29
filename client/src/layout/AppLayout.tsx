import { Outlet } from "react-router-dom";
import Header from "./Header";
import React from "react";
import { chakra } from "@chakra-ui/react";

const AppLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <chakra.body>
        <Outlet />
      </chakra.body>
    </React.Fragment>
  );
};

export default AppLayout;
