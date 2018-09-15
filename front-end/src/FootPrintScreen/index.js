import React, { Component } from "react";
import FootPrintScreen from "./FootPrintScreen.js";
import SideBar from "../SideBar/SideBar.js";
import { createDrawerNavigator } from "react-navigation";

const FootPrintScreenRouter = createDrawerNavigator(
  {
    FootPrint: { screen: FootPrintScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default FootPrintScreenRouter;
