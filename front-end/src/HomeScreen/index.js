import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import NewMealScreen from "../NewMealScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { createDrawerNavigator } from "react-navigation";

const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    NewMeal: { screen: NewMealScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
