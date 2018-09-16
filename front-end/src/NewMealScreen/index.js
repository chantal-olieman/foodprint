import React, { Component } from "react";
import NewMealScreen from "./NewMealScreen.js";
import FootPrintScreen from "../FootPrintScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { createDrawerNavigator } from "react-navigation";

const NewMealScreenRouter = createDrawerNavigator(
  {
    NewMeal: { screen: NewMealScreen },
    FootPrint: { screen: FootPrintScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default NewMealScreenRouter;
